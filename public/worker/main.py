#!/usr/bin/env python3
"""
CapaCloud GPU Worker - Simplified Version
A clean, debuggable worker script for managing GPU containers.

Usage:
    # Run manually for testing:
    python3 main.py
    
    # Or run as service (via systemd)
    systemctl start capa-worker
"""

import os
import subprocess
import time
import json
import requests
import sys
from datetime import datetime
from uuid import uuid4

# ===== Configuration =====
LOG_FILE = os.path.expanduser("~/capa-worker.log")
CONTAINER_NAME = "capa-gpu-1"
BASE_IMAGE = "ubuntu:22.04"
DOCKER_RUNTIME = "nvidia"

# Environment variables
API_BASE_URL = os.environ.get("CAPA_API_URL", "https://capa.cloud/api")
ACCOUNT_ID = os.environ.get("ACCOUNT_ID", "")
WORKER_ID = os.environ.get("WORKER_ID", f"worker_{uuid4().hex[:12]}")
SSH_PORT = int(os.environ.get("SSH_PORT", 2222))
SSH_KEY = os.environ.get("SSH_KEY", "")

# Note: Machine SSH keys are no longer needed
# Only consumer SSH keys (from rentals) are added to authorized_keys

# ===== Logging =====
def log(*args, level="INFO"):
    """Log message to file and stdout"""
    ts = datetime.utcnow().isoformat() + "Z"
    message = " ".join(map(str, args))
    line = f"[{ts}] [{level}] {message}\n"
    
    try:
        with open(LOG_FILE, "a") as f:
            f.write(line)
    except:
        pass
    
    print(line, end='')

def log_error(*args):
    log(*args, level="ERROR")

def log_warning(*args):
    log(*args, level="WARNING")

def log_debug(*args):
    log(*args, level="DEBUG")

# ===== Command Execution =====
def run_cmd(cmd, check=False):
    """Run shell command and return (stdout, stderr, returncode)"""
    log_debug(f"Executing: {cmd}")
    try:
        res = subprocess.run(
            cmd, 
            shell=True, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE, 
            text=True,
            timeout=300  # 5 minute timeout
        )
        if check and res.returncode != 0:
            log_error(f"Command failed: {cmd}")
            log_error(f"stdout: {res.stdout}")
            log_error(f"stderr: {res.stderr}")
        return res.stdout.strip(), res.stderr.strip(), res.returncode
    except subprocess.TimeoutExpired:
        log_error(f"Command timed out: {cmd}")
        return "", "Command timed out", 1
    except Exception as e:
        log_error(f"Command error: {e}")
        return "", str(e), 1

# ===== System Information =====
def find_nvidia_smi():
    """Find nvidia-smi executable, handling WSL paths"""
    # Try multiple methods to find nvidia-smi (PATH issues are common, especially in WSL)
    paths_to_try = [
        "nvidia-smi",  # Standard PATH
        "/usr/lib/wsl/lib/nvidia-smi",  # WSL-specific path
        "/usr/bin/nvidia-smi",  # Standard path
        "/usr/local/bin/nvidia-smi",  # Another standard path
    ]
    
    for path in paths_to_try:
        # Check if file exists (for absolute paths) or if command exists (for PATH commands)
        if "/" in path:
            # Absolute path - check if file exists
            out, err, rc = run_cmd(f"test -f {path} && echo {path}")
            if rc == 0 and out.strip() == path:
                # Verify it actually works
                test_out, test_err, test_rc = run_cmd(f"{path} --version 2>/dev/null")
                if test_rc == 0:
                    return path
        else:
            # Command in PATH - check if it exists
            out, err, rc = run_cmd(f"command -v {path}")
            if rc == 0 and out.strip():
                # Verify it actually works
                test_out, test_err, test_rc = run_cmd(f"{path} --version 2>/dev/null")
                if test_rc == 0:
                    return out.strip()
    
    # Last resort: try to find it using which
    out, err, rc = run_cmd("which nvidia-smi 2>/dev/null")
    if rc == 0 and out.strip():
        return out.strip()
    
    return "nvidia-smi"  # Fallback to standard name

def get_gpu_info():
    """Get GPU information"""
    nvidia_smi = find_nvidia_smi()
    out, err, rc = run_cmd(f"{nvidia_smi} --query-gpu=name,memory.total --format=csv,noheader,nounits")
    if rc == 0 and out:
        try:
            parts = out.split(',')
            if len(parts) >= 2:
                return {
                    "type": parts[0].strip(),
                    "memory": int(parts[1].strip())
                }
        except Exception as e:
            log_debug(f"Failed to parse GPU info: {e}, output: {out}")
    else:
        log_warning(f"nvidia-smi failed: rc={rc}, err={err}, out={out}")
    return {"type": "Unknown", "memory": 0}

def get_system_info():
    """Get system information"""
    info = {"cpuCores": 4, "ramSize": 16, "diskSize": 100}
    
    # CPU cores
    out, _, rc = run_cmd("nproc")
    if rc == 0:
        try:
            info["cpuCores"] = int(out)
        except:
            pass
    
    # RAM
    out, _, rc = run_cmd("free -g | awk '/^Mem:/{print $2}'")
    if rc == 0:
        try:
            info["ramSize"] = int(out)
        except:
            pass
    
    # Disk
    out, _, rc = run_cmd("df -BG / | awk 'NR==2 {print $2}' | sed 's/G//'")
    if rc == 0:
        try:
            info["diskSize"] = int(out)
        except:
            pass
    
    return info

def get_hostname():
    """Get machine hostname/IP"""
    try:
        # Try to get public IP
        out, _, rc = run_cmd("curl -s --max-time 5 https://api.ipify.org || curl -s --max-time 5 https://ifconfig.me")
        if rc == 0 and out:
            return out.strip()
    except:
        pass
    
    # Fallback to hostname
    out, _, rc = run_cmd("hostname -I | awk '{print $1}'")
    if rc == 0 and out:
        return out.strip()
    
        return "unknown"

# ===== Docker Operations =====
def container_exists(name):
    """Check if container exists (running or stopped)"""
    out, _, rc = run_cmd(f"docker ps -a --filter 'name=^{name}$' --format '{{{{.Names}}}}'")
    return name in out.splitlines() if out else False

def container_is_running(name):
    """Check if container is running"""
    out, _, rc = run_cmd(f"docker ps --filter 'name=^{name}$' --format '{{{{.Names}}}}'")
    return name in out.splitlines() if out else False

def remove_container(name):
    """Remove container if it exists"""
    if container_exists(name):
        log(f"Removing container: {name}")
        run_cmd(f"docker stop {name} 2>/dev/null")
        run_cmd(f"docker rm -f {name} 2>/dev/null")
        time.sleep(1)
        return True
    return False

def pull_image(image):
    """Pull Docker image"""
    log(f"Pulling image: {image}")
    out, err, rc = run_cmd(f"docker pull {image}")
    if rc == 0:
        log(f"Image {image} pulled successfully")
        return True
    else:
        log_error(f"Failed to pull image: {err}")
        return False

# ===== Container Setup =====
def create_setup_image(base_image, container_name, ssh_key=""):
    """Create a Docker image with SSH server pre-installed"""
    setup_name = f"{container_name}-setup"
    setup_image = f"{container_name}-setup-image"
    
    log(f"Creating setup container: {setup_name}")
    
    # Remove any existing setup container
    remove_container(setup_name)
    
    # Create container with SSH installation command
    ssh_key_cmd = f"echo '{ssh_key}' >> /root/.ssh/authorized_keys && " if ssh_key else ""
    
    cmd = (
        f"docker run -d --name {setup_name} "
        f"--gpus all --runtime={DOCKER_RUNTIME} "
        f"{base_image} "
        f"sh -c '"
        f"apt-get update -qq && "
        f"apt-get install -y -qq openssh-server && "
        f"mkdir -p /var/run/sshd /root/.ssh && "
        f"chmod 700 /root/.ssh && "
        f"echo PermitRootLogin yes >> /etc/ssh/sshd_config && "
        f"echo PasswordAuthentication no >> /etc/ssh/sshd_config && "
        f"touch /root/.ssh/authorized_keys && "
        f"chmod 600 /root/.ssh/authorized_keys && "
        f"{ssh_key_cmd}"
        f"sleep infinity"
        f"'"
    )
    
    out, err, rc = run_cmd(cmd)
    if rc != 0:
        log_error(f"Failed to create setup container: {err}")
        return None
    
    # Wait for installation to complete
    log("Waiting for apt/dpkg to finish inside container...")
    
    # Wait for apt/dpkg to finish (check for lock file)
    max_wait = 120  # max 2 minutes
    waited = 0
    container_exited = False
    
    while waited < max_wait:
        # Check if container is still running
        if not container_is_running(setup_name):
            container_exited = True
            log("Container exited, checking if installation completed...")
            break
        
        # Check for apt or dpkg processes
        out, _, _ = run_cmd(
            f"docker exec -u root {setup_name} bash -c 'pgrep -fa \"(apt|dpkg)\" || true' 2>/dev/null"
        )
        if not out.strip():
            # Check lock file
            lock_out, _, _ = run_cmd(
                f"docker exec -u root {setup_name} bash -c 'test -e /var/lib/dpkg/lock-frontend && echo locked || echo unlocked' 2>/dev/null"
            )
            if "unlocked" in lock_out:
                log("dpkg lock released, installation should be complete")
                break
        time.sleep(2)
        waited += 2
        if waited % 10 == 0:
            log(f"Still waiting for dpkg lock... {waited}s")
    
    if waited >= max_wait and not container_exited:
        log_warning("Timeout waiting for dpkg lock, continuing anyway...")
    
    # Give it a moment for any final cleanup
    time.sleep(2)
    
    # Check if container is running or exited
    if not container_is_running(setup_name):
        # Container exited - check if we can still use it
        log("Setup container exited, checking if SSH installation completed...")
        logs_out, _, _ = run_cmd(f"docker logs {setup_name} 2>&1 | tail -50")
        if logs_out:
            log_debug(f"Container logs: {logs_out}")
        
        # Try to start it to check SSH
        start_out, start_err, start_rc = run_cmd(f"docker start {setup_name} 2>&1")
        if start_rc != 0:
            log_warning(f"Could not restart container: {start_err}")
            # Container might be in a bad state, but let's try to check SSH anyway
        else:
            time.sleep(2)
    
    # Verify SSH is installed
    log("Checking if SSH is installed...")
    out, err, rc = run_cmd(f"docker exec -u root {setup_name} which sshd 2>&1")
    if rc != 0:
        log_warning(f"SSHD not found (which sshd returned: {out or err}), installing SSH now...")
        
        # Check container logs first to see what happened
        logs_out, _, _ = run_cmd(f"docker logs {setup_name} 2>&1 | tail -50")
        if logs_out:
            log_debug(f"Container logs before SSH install: {logs_out}")
        
        # Try installing SSH
        log("Running apt-get update and install openssh-server...")
        # First check if we can even run commands in the container
        test_out, test_err, test_rc = run_cmd(f"docker exec -u root {setup_name} whoami 2>&1")
        if test_rc != 0:
            log_error(f"Cannot execute commands in container (whoami failed: {test_err})")
            remove_container(setup_name)
            return None
        
        # Try installing without -qq to see actual errors
        log("Attempting SSH installation (this may take a minute)...")
        out, err, rc = run_cmd(
            f"docker exec -u root {setup_name} bash -c 'apt-get update && apt-get install -y openssh-server' 2>&1"
        )
        if rc != 0:
            log_error(f"SSH installation failed (return code: {rc})")
            if out:
                log_error(f"stdout: {out[-500:]}")  # Last 500 chars
            if err:
                log_error(f"stderr: {err[-500:]}")
            if not out and not err:
                log_error("No output captured - command may have failed silently")
            
            # Get more detailed logs
            logs_out, _, _ = run_cmd(f"docker logs {setup_name} 2>&1 | tail -50")
            if logs_out:
                log_error(f"Container logs: {logs_out}")
            
            # Check if container is still running
            if not container_is_running(setup_name):
                log_error("Container exited during SSH installation")
            
            remove_container(setup_name)
            return None
        else:
            log("SSH installation completed successfully")
    else:
        log(f"SSH already installed at: {out.strip()}")
    
    # Verify SSH key was added (if provided)
    if ssh_key:
        log("Verifying SSH key was added to authorized_keys...")
        auth_keys_out, _, auth_keys_rc = run_cmd(f"docker exec -u root {setup_name} cat /root/.ssh/authorized_keys 2>&1")
        if auth_keys_rc == 0 and auth_keys_out.strip():
            # Check if our key is in there (check first part of key)
            key_prefix = ssh_key.split()[1][:20] if len(ssh_key.split()) > 1 else ""
            if key_prefix and key_prefix in auth_keys_out:
                log("SSH key verified in authorized_keys")
            else:
                log_warning("SSH key may not be in authorized_keys, adding it now...")
                # Add the key manually
                escaped_key = ssh_key.replace("'", "'\"'\"'")
                add_key_cmd = f"docker exec -u root {setup_name} bash -c \"echo '{escaped_key}' >> /root/.ssh/authorized_keys\""
                add_out, add_err, add_rc = run_cmd(add_key_cmd)
                if add_rc == 0:
                    log("SSH key added successfully")
                else:
                    log_warning(f"Could not add SSH key: {add_err}")
        else:
            log_warning("authorized_keys is empty or not readable, adding SSH key...")
            escaped_key = ssh_key.replace("'", "'\"'\"'")
            add_key_cmd = f"docker exec -u root {setup_name} bash -c \"echo '{escaped_key}' > /root/.ssh/authorized_keys && chmod 600 /root/.ssh/authorized_keys\""
            add_out, add_err, add_rc = run_cmd(add_key_cmd)
            if add_rc == 0:
                log("SSH key added successfully")
            else:
                log_warning(f"Could not add SSH key: {add_err}")
    
    # Commit to image (can commit from stopped container)
    log(f"Committing setup image: {setup_image}")
    
    # Ensure container exists (even if stopped)
    if not container_exists(setup_name):
        log_error("Setup container does not exist")
        return None
    
    out, err, rc = run_cmd(f"docker commit {setup_name} {setup_image}")
    if rc != 0:
        log_error(f"Failed to commit image: {err}")
        remove_container(setup_name)
        return None
    
    # Cleanup setup container
    remove_container(setup_name)
    log(f"Setup image created: {setup_image}")
    return setup_image

def start_container(name, image, ssh_port, ssh_key=""):
    """Start the main GPU container"""
    log(f"Starting container: {name}")
    
    # Note: No initial SSH key needed
    # Consumer SSH keys will be added via update_rental_ssh_keys()
    # If ssh_key is provided (e.g., from install.sh), use it, otherwise start empty
    if not ssh_key:
        ssh_key = SSH_KEY  # Only use if explicitly provided via environment
        if ssh_key:
            log("Using SSH key from environment")
        else:
            log("Starting container without initial SSH keys. Consumer keys will be added via rental system.")
    
    # Remove existing container
    remove_container(name)
    
    # Create setup image if needed
    setup_image = create_setup_image(image, name, ssh_key)
    if not setup_image:
        log_error("Failed to create setup image")
        return False
    
    # Start container from setup image
    # Run as root explicitly
    cmd = (
        f"docker run -d --name {name} "
        f"--gpus all --runtime={DOCKER_RUNTIME} "
        f"--user root "
        f"-p {ssh_port}:22 "
        f"{setup_image} "
        f"sh -c 'mkdir -p /var/run/sshd && /usr/sbin/sshd -D'"
    )
    
    out, err, rc = run_cmd(cmd)
    if rc != 0:
        log_error(f"Failed to start container: {err}")
        return False
    
    # Wait and verify
    time.sleep(2)
    if not container_is_running(name):
        log_error("Container exited after start")
        logs_out, _, _ = run_cmd(f"docker logs {name} 2>&1 | tail -20")
        if logs_out:
            log_error(f"Container logs: {logs_out}")
        remove_container(name)
        return False
    
    # Verify SSH is running
    out, err, rc = run_cmd(f"docker exec -u root {name} pgrep sshd")
    if rc != 0:
        log_warning("SSH not running, starting...")
        run_cmd(f"docker exec -u root -d {name} /usr/sbin/sshd -D")
        time.sleep(1)
    
    # Verify authorized_keys has content
    keys_check, _, _ = run_cmd(f"docker exec -u root {name} cat /root/.ssh/authorized_keys 2>/dev/null")
    if keys_check.strip():
        key_count = len([k for k in keys_check.strip().split('\n') if k.strip()])
        log(f"SSH authorized_keys configured with {key_count} key(s)")
    else:
        log_warning("SSH authorized_keys is empty - you'll need to add keys manually or via rental system")
    
    # Cleanup setup image
    run_cmd(f"docker rmi {setup_image} 2>/dev/null")
    
    log(f"Container {name} started successfully on port {ssh_port}")
    return True

# ===== API Functions =====
def register_worker():
    """Register worker with backend"""
    if not ACCOUNT_ID:
        log_error("ACCOUNT_ID not set!")
        return False
    
    gpu_info = get_gpu_info()
    system_info = get_system_info()
    hostname = get_hostname()
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/worker/register",
            json={
                "accountId": ACCOUNT_ID,
                "workerId": WORKER_ID,
                "gpuInfo": gpu_info,
                "systemInfo": system_info,
                "hostname": hostname,
                "sshPort": SSH_PORT,
                # Note: No SSH keys sent - only consumer SSH keys are used
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            log(f"Worker registered: {data.get('message', 'OK')}")
            return True
        else:
            log_error(f"Registration failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        log_error(f"Registration error: {e}")
        return False

def get_uptime():
    """Get system uptime in seconds"""
    out, _, rc = run_cmd("cat /proc/uptime 2>/dev/null | awk '{print int($1)}'")
    if rc == 0 and out:
        try:
            return int(out.strip())
        except:
            pass
    return None

def send_heartbeat():
    """Send heartbeat with metrics"""
    if not ACCOUNT_ID:
        return
    
    # Get GPU metrics
    gpuUtilization = None
    temperature = None
    powerUsage = None
    
    # Use the same nvidia-smi path detection for consistency
    nvidia_smi = find_nvidia_smi()
    out, _, rc = run_cmd(f"{nvidia_smi} --query-gpu=utilization.gpu,temperature.gpu,power.draw --format=csv,noheader,nounits")
    if rc == 0 and out:
        try:
            parts = out.split(',')
            if len(parts) >= 3:
                gpuUtilization = float(parts[0].strip())
                temperature = float(parts[1].strip())
                powerUsage = float(parts[2].strip())
        except Exception as e:
            log_debug(f"Failed to parse GPU metrics: {e}")
    
    # Get uptime
    uptime = get_uptime()
    
    try:
        response = requests.put(
            f"{API_BASE_URL}/worker/register",
            json={
                "workerId": WORKER_ID,
                "gpuUtilization": gpuUtilization,
                "temperature": temperature,
                "powerUsage": powerUsage,
                "uptime": uptime,
            },
            timeout=10
        )
        
        if response.status_code == 200:
            log_debug("Heartbeat sent successfully")
        else:
            log_warning(f"Heartbeat failed: {response.status_code} - {response.text}")
    except Exception as e:
        log_warning(f"Heartbeat error: {e}")

# Track last known SSH keys to detect changes
_last_known_keys = set()

def update_rental_ssh_keys(force_update=False):
    """Update SSH keys for active rentals
    
    Args:
        force_update: If True, update even if keys haven't changed
    """
    global _last_known_keys
    
    if not ACCOUNT_ID:
        return False
    
    try:
        response = requests.get(
            f"{API_BASE_URL}/worker/add-ssh-key",
            params={"workerId": WORKER_ID},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            # API returns "keys" array with objects containing "publicKey"
            key_objects = data.get("keys", [])
            
            if not container_is_running(CONTAINER_NAME):
                log_warning("Container not running, cannot update SSH keys")
                return False
            
            # Extract public keys from the objects
            public_keys = []
            for key_obj in key_objects:
                if isinstance(key_obj, dict) and "publicKey" in key_obj:
                    public_keys.append(key_obj["publicKey"])
                elif isinstance(key_obj, str):
                    # Fallback: if it's already a string, use it directly
                    public_keys.append(key_obj)
            
            # Create a set of current keys for comparison
            current_keys_set = set(public_keys)
            
            # Check if keys have changed
            if not force_update and current_keys_set == _last_known_keys:
                log_debug("SSH keys unchanged, skipping update")
                return False
            
            # Update authorized_keys
            authorized_keys_path = "/root/.ssh/authorized_keys"
            
            # Ensure .ssh directory exists
            run_cmd(f"docker exec -u root {CONTAINER_NAME} sh -c 'mkdir -p /root/.ssh && chmod 700 /root/.ssh'")
            
            if public_keys:
                # Write all keys to authorized_keys (one per line)
                # Use docker exec with stdin to avoid shell escaping issues
                # First, clear the file
                run_cmd(f"docker exec -u root {CONTAINER_NAME} sh -c '> {authorized_keys_path}'")
                
                # Add each key
                for key in public_keys:
                    # Escape the key for shell (escape single quotes)
                    escaped_key = key.replace("'", "'\"'\"'")
                    cmd = f"docker exec -u root {CONTAINER_NAME} sh -c \"echo '{escaped_key}' >> {authorized_keys_path}\""
                    out, err, rc = run_cmd(cmd)
                    if rc != 0:
                        log_error(f"Failed to add SSH key: {err}")
                
                # Set correct permissions
                run_cmd(f"docker exec -u root {CONTAINER_NAME} sh -c 'chmod 600 {authorized_keys_path}'")
                
                # Update last known keys
                _last_known_keys = current_keys_set
                
                log(f"Registered {len(public_keys)} SSH key(s) to machine")
                return True
            else:
                # No keys to add, but clear the file if there were keys before
                if _last_known_keys:
                    run_cmd(f"docker exec -u root {CONTAINER_NAME} sh -c '> {authorized_keys_path}'")
                    _last_known_keys = set()
                    log("Cleared SSH keys (no active rentals)")
                else:
                    log_debug("No SSH keys to register")
                return False
        else:
            log_warning(f"Failed to fetch SSH keys: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        log_warning(f"SSH key update error: {e}")
        return False

# ===== Main Functions =====
def main():
    """Main worker loop"""
    log("=" * 60)
    log("CapaCloud GPU Worker Starting")
    log("=" * 60)
    log(f"Worker ID: {WORKER_ID}")
    log(f"Account ID: {ACCOUNT_ID or 'NOT SET'}")
    log(f"SSH Port: {SSH_PORT}")
    log(f"API URL: {API_BASE_URL}")
    log("=" * 60)
    
    if not ACCOUNT_ID:
        log_error("ACCOUNT_ID is required!")
        log_error("Set it with: export ACCOUNT_ID=your_account_id")
        sys.exit(1)
    
    # Register with backend
    if not register_worker():
        log_warning("Registration failed, continuing anyway...")
    
    # Pull base image
    if not pull_image(BASE_IMAGE):
        log_error("Failed to pull base image")
        sys.exit(1)
    
    # Start container (will use machine's SSH public key)
    if not start_container(CONTAINER_NAME, BASE_IMAGE, SSH_PORT):
        log_error("Failed to start container")
        sys.exit(1)
    
    # Verify container
    if container_is_running(CONTAINER_NAME):
        log(f"Container {CONTAINER_NAME} is running")
        out, _, rc = run_cmd(f"docker port {CONTAINER_NAME}")
        if rc == 0:
            log(f"Port mapping: {out}")
    else:
        log_error("Container is not running!")
        sys.exit(1)

    # Register initial SSH keys immediately after container starts
    log("Registering initial SSH keys...")
    update_rental_ssh_keys(force_update=True)

    # Main loop
    log("Entering main monitoring loop...")
    heartbeat_counter = 0
    ssh_key_counter = 0
    
    try:
        while True:
            # Send heartbeat every 5 iterations (~2.5 minutes)
            heartbeat_counter += 1
            if heartbeat_counter >= 5:
                send_heartbeat()
                heartbeat_counter = 0
            
            # Monitor and update SSH keys every 2 iterations (~1 minute)
            # This will detect new rentals and key changes
            ssh_key_counter += 1
            if ssh_key_counter >= 2:
                update_rental_ssh_keys(force_update=False)
                ssh_key_counter = 0
            
            # Check container health
            if not container_is_running(CONTAINER_NAME):
                log_error("Container stopped! Attempting to restart...")
                if start_container(CONTAINER_NAME, BASE_IMAGE, SSH_PORT):
                    log("Container restarted successfully")
                    # Re-register SSH keys after container restart
                    log("Re-registering SSH keys after container restart...")
                    update_rental_ssh_keys(force_update=True)
                else:
                    log_error("Failed to restart container")
            
            time.sleep(30)
    except KeyboardInterrupt:
        log("Shutting down...")
    except Exception as e:
        log_error(f"Main loop error: {e}")
        raise

if __name__ == "__main__":
    main()
