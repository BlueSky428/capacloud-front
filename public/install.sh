#!/bin/bash
# CapaCloud GPU Worker Installation Script
# Usage: curl -s https://capa.cloud/install.sh | sudo bash

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
WORKER_DIR="/opt/capa-worker"
SERVICE_NAME="capa-worker"
API_URL="${CAPA_API_URL:-https://capa.cloud/api}"

# Detect API URL from download source
SCRIPT_URL="${SCRIPT_URL:-}"
if [[ "$SCRIPT_URL" == *"capacloud-test"* ]] || [[ "$SCRIPT_URL" == *"test"* ]]; then
    API_URL="https://capacloud-test.vercel.app/api"
fi

echo -e "${GREEN}=== CapaCloud GPU Worker Installation ===${NC}\n"

# Check root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# ===== Step 1: Account ID =====
echo -e "${YELLOW}=== Step 1: Account Configuration ===${NC}"
echo "Find your Account ID at: https://capa.cloud/user/settings"
read -p "Enter your Account ID: " ACCOUNT_ID < /dev/tty
ACCOUNT_ID=$(echo "$ACCOUNT_ID" | xargs)

if [ -z "$ACCOUNT_ID" ]; then
    echo -e "${RED}ERROR: Account ID is required!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Account ID: $ACCOUNT_ID${NC}\n"

# ===== Step 2: System Checks =====
echo -e "${YELLOW}=== Step 2: System Checks ===${NC}"

# #region agent log
LOG_DIR="/tmp/capacloud"
if [ -n "$SUDO_USER" ]; then
    USER_HOME=$(eval echo ~"$SUDO_USER" 2>/dev/null || echo "")
    if [ -n "$USER_HOME" ] && [ "${USER_HOME#/}" != "$USER_HOME" ]; then
        LOG_DIR="$USER_HOME/.capacloud/logs"
    fi
fi
mkdir -p "$LOG_DIR" 2>/dev/null || LOG_DIR="/tmp"
LOG_FILE="$LOG_DIR/debug.log"
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:45\",\"message\":\"Step 2 start\",\"data\":{\"path\":\"$PATH\",\"sudo_user\":\"${SUDO_USER:-none}\"}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log

# Check NVIDIA GPU
# Try multiple methods to find nvidia-smi (PATH issues with sudo are common, especially in WSL)
NVIDIA_SMI=""

# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:49\",\"message\":\"nvidia-smi detection start\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log

# Method 1: Try command -v (works for normal user, may fail with sudo)
if command -v nvidia-smi &> /dev/null; then
    NVIDIA_SMI=$(command -v nvidia-smi 2>/dev/null || echo "")
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:52\",\"message\":\"method1_success\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
# Method 2: WSL-specific path (common location in WSL2)
elif [ -f /usr/lib/wsl/lib/nvidia-smi ]; then
    NVIDIA_SMI="/usr/lib/wsl/lib/nvidia-smi"
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:55\",\"message\":\"method2_success\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
# Method 3: Standard Linux paths
elif [ -f /usr/bin/nvidia-smi ]; then
    NVIDIA_SMI="/usr/bin/nvidia-smi"
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:58\",\"message\":\"method3_success\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
elif [ -f /usr/local/bin/nvidia-smi ]; then
    NVIDIA_SMI="/usr/local/bin/nvidia-smi"
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:60\",\"message\":\"method3b_success\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
# Method 4: Try which (may work without sudo)
elif which nvidia-smi &> /dev/null 2>&1 || true; then
    NVIDIA_SMI=$(which nvidia-smi 2>/dev/null || echo "")
    if [ -n "$NVIDIA_SMI" ]; then
        # #region agent log
        TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
        echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:63\",\"message\":\"method4_success\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
        # #endregion agent log
    fi
fi

# Method 5: If still not found, try running it with preserved PATH (for WSL)
if [ -z "$NVIDIA_SMI" ]; then
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:68\",\"message\":\"trying_method5\",\"data\":{\"orig_path\":\"$PATH\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
    # Preserve PATH and try to find nvidia-smi
    ORIG_PATH="${PATH:-/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin}"
    export PATH="/usr/lib/wsl/lib:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$ORIG_PATH"
    if command -v nvidia-smi &> /dev/null; then
        NVIDIA_SMI=$(command -v nvidia-smi 2>/dev/null || echo "")
        # #region agent log
        TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
        echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:72\",\"message\":\"method5_success\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
        # #endregion agent log
    fi
    export PATH="$ORIG_PATH"
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:75\",\"message\":\"path_restored\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
fi

# Final check - try to run nvidia-smi
# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:79\",\"message\":\"final_check\",\"data\":{\"nvidia_smi\":\"${NVIDIA_SMI:-empty}\"}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log

if [ -z "$NVIDIA_SMI" ]; then
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:80\",\"message\":\"nvidia_not_found_exiting\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
    echo -e "${RED}ERROR: NVIDIA GPU not detected!${NC}"
    echo -e "${YELLOW}Please ensure:${NC}"
    echo "  1. NVIDIA drivers are installed on Windows"
    echo "  2. WSL2 is properly configured"
    echo "  3. Run 'nvidia-smi' manually (without sudo) to verify it works"
    echo ""
    echo -e "${YELLOW}Debug info:${NC}"
    echo "  - Try: nvidia-smi --version"
    echo "  - Try: which nvidia-smi"
    exit 1
fi

# Verify nvidia-smi actually works
# #region agent log
ORIG_USER_PATH_VAL=""
if [ -n "$SUDO_USER" ]; then
    ORIG_USER_PATH_VAL=$(sudo -u "$SUDO_USER" -E printenv PATH 2>/dev/null || echo "")
fi
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:156\",\"message\":\"nvidia-smi verification start\",\"data\":{\"nvidia_smi\":\"$NVIDIA_SMI\",\"root_path\":\"$PATH\",\"orig_user_path\":\"$ORIG_USER_PATH_VAL\",\"euid\":$EUID,\"sudo_user\":\"${SUDO_USER:-none}\",\"user_home\":\"$(eval echo ~${SUDO_USER:-root} 2>/dev/null || echo "")\"}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log

# Try to run nvidia-smi --version and capture both exit code and error
# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:175\",\"message\":\"before_nvidia_smi_test\",\"data\":{\"nvidia_smi_path\":\"$NVIDIA_SMI\"}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log
NVIDIA_SMI_TEST_OUTPUT=$("$NVIDIA_SMI" --version 2>&1 || echo "COMMAND_FAILED")
NVIDIA_SMI_TEST_RC=$?

# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:180\",\"message\":\"nvidia-smi --version test as root\",\"data\":{\"exit_code\":$NVIDIA_SMI_TEST_RC,\"output_length\":${#NVIDIA_SMI_TEST_OUTPUT},\"output_preview\":\"${NVIDIA_SMI_TEST_OUTPUT:0:200}\"}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log

# If it fails as root, try running as the original user (if SUDO_USER is set)
if [ $NVIDIA_SMI_TEST_RC -ne 0 ] && [ -n "$SUDO_USER" ]; then
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:183\",\"message\":\"trying nvidia-smi as original user\",\"data\":{\"sudo_user\":\"$SUDO_USER\",\"root_path\":\"$PATH\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
    
    # Get the original user's PATH
    ORIG_USER_PATH=$(sudo -u "$SUDO_USER" -E printenv PATH 2>/dev/null || echo "$PATH")
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:186\",\"message\":\"original user PATH retrieved\",\"data\":{\"orig_user_path\":\"$ORIG_USER_PATH\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
    
    # Try with original user's PATH
    NVIDIA_SMI_USER_TEST_OUTPUT=$(sudo -u "$SUDO_USER" -E env "PATH=$ORIG_USER_PATH" "$NVIDIA_SMI" --version 2>&1 || echo "COMMAND_FAILED")
    NVIDIA_SMI_USER_TEST_RC=$?
    
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:193\",\"message\":\"nvidia-smi as user test result\",\"data\":{\"exit_code\":$NVIDIA_SMI_USER_TEST_RC,\"output_length\":${#NVIDIA_SMI_USER_TEST_OUTPUT},\"output_preview\":\"${NVIDIA_SMI_USER_TEST_OUTPUT:0:200}\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
    
    # If that fails, try without PATH override (use user's default environment)
    if [ $NVIDIA_SMI_USER_TEST_RC -ne 0 ]; then
        # #region agent log
        TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
        echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:198\",\"message\":\"trying nvidia-smi with user default env\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
        # #endregion agent log
        NVIDIA_SMI_USER_TEST_OUTPUT=$(sudo -u "$SUDO_USER" "$NVIDIA_SMI" --version 2>&1 || echo "COMMAND_FAILED")
        NVIDIA_SMI_USER_TEST_RC=$?
        # #region agent log
        TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
        echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:204\",\"message\":\"nvidia-smi with default env result\",\"data\":{\"exit_code\":$NVIDIA_SMI_USER_TEST_RC,\"output_length\":${#NVIDIA_SMI_USER_TEST_OUTPUT},\"output_preview\":\"${NVIDIA_SMI_USER_TEST_OUTPUT:0:200}\"}}" >> "$LOG_FILE" 2>/dev/null || true
        # #endregion agent log
    fi
    
    if [ $NVIDIA_SMI_USER_TEST_RC -eq 0 ]; then
        # It works as the original user, so we know nvidia-smi is functional
        # We'll continue - the worker will run as root but nvidia-smi should work in Docker containers
        # #region agent log
        TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
        echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:212\",\"message\":\"nvidia-smi works as user, continuing\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
        # #endregion agent log
    else
        # #region agent log
        TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
        echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:217\",\"message\":\"nvidia-smi failed as user, exiting\",\"data\":{\"error_output\":\"$NVIDIA_SMI_USER_TEST_OUTPUT\"}}" >> "$LOG_FILE" 2>/dev/null || true
        # #endregion agent log
        echo -e "${RED}ERROR: Found nvidia-smi at $NVIDIA_SMI but it doesn't work!${NC}"
        echo -e "${YELLOW}Error output: $NVIDIA_SMI_USER_TEST_OUTPUT${NC}"
        echo -e "${YELLOW}Please verify nvidia-smi works manually${NC}"
        exit 1
    fi
elif [ $NVIDIA_SMI_TEST_RC -ne 0 ]; then
    # #region agent log
    TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
    echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:226\",\"message\":\"nvidia-smi failed as root and no SUDO_USER, exiting\",\"data\":{\"error_output\":\"$NVIDIA_SMI_TEST_OUTPUT\"}}" >> "$LOG_FILE" 2>/dev/null || true
    # #endregion agent log
    echo -e "${RED}ERROR: Found nvidia-smi at $NVIDIA_SMI but it doesn't work!${NC}"
    echo -e "${YELLOW}Error output: $NVIDIA_SMI_TEST_OUTPUT${NC}"
    echo -e "${YELLOW}Please verify nvidia-smi works manually${NC}"
    exit 1
fi

# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:242\",\"message\":\"before_gpu_info_query\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log
GPU_INFO=$("$NVIDIA_SMI" --query-gpu=name,memory.total --format=csv,noheader,nounits 2>/dev/null | head -1 || echo "")
GPU_INFO_RC=$?
# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:245\",\"message\":\"after_gpu_info_query\",\"data\":{\"exit_code\":$GPU_INFO_RC,\"gpu_info\":\"$GPU_INFO\"}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log
if [ -z "$GPU_INFO" ]; then
    echo -e "${YELLOW}Warning: Could not query GPU info, but nvidia-smi is available${NC}"
    echo -e "${GREEN}✓ GPU detected (nvidia-smi available)${NC}\n"
else
    echo -e "${GREEN}✓ GPU detected: $GPU_INFO${NC}\n"
fi

# #region agent log
TIMESTAMP=$(date +%s000 2>/dev/null || echo "0")
echo "{\"timestamp\":$TIMESTAMP,\"location\":\"install.sh:251\",\"message\":\"completed_step2_moving_to_step3\",\"data\":{}}" >> "$LOG_FILE" 2>/dev/null || true
# #endregion agent log

# ===== Step 3: Install Dependencies =====
echo -e "${YELLOW}=== Step 3: Installing Dependencies ===${NC}"

# Detect WSL
IS_WSL=false
if [ -f /proc/version ] && grep -qi microsoft /proc/version; then
    IS_WSL=true
    echo -e "${YELLOW}WSL detected${NC}"
fi

# Update packages
apt-get update -qq

# Check for Docker
DOCKER_AVAILABLE=false
if command -v docker &> /dev/null; then
    if docker info &> /dev/null; then
        DOCKER_AVAILABLE=true
        echo -e "${GREEN}✓ Docker is available${NC}"
    fi
fi

# Install Docker if needed
if [ "$DOCKER_AVAILABLE" = false ]; then
    if [ "$IS_WSL" = true ]; then
        echo -e "${YELLOW}Docker not found. Checking for Docker Desktop...${NC}"
        # Check if Docker Desktop socket is available (common in WSL)
        if [ -S /var/run/docker.sock ] || [ -S /mnt/wsl/docker-desktop/docker-desktop.sock ]; then
            echo -e "${YELLOW}Docker Desktop socket found, but docker command not available.${NC}"
            echo -e "${YELLOW}Please ensure Docker Desktop WSL integration is enabled:${NC}"
            echo "  1. Open Docker Desktop"
            echo "  2. Go to Settings → Resources → WSL Integration"
            echo "  3. Enable integration for this Ubuntu distribution"
            echo "  4. Click Apply & Restart"
            echo "  5. Close and reopen this terminal"
            echo ""
            echo -e "${RED}Installation cannot continue without Docker.${NC}"
            exit 1
        else
            echo -e "${YELLOW}Installing Docker in WSL (Docker Desktop recommended for Windows)${NC}"
            curl -fsSL https://get.docker.com -o get-docker.sh
            sh get-docker.sh
            rm get-docker.sh
            DOCKER_AVAILABLE=true
        fi
    else
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        rm get-docker.sh
        DOCKER_AVAILABLE=true
    fi
fi

# Verify Docker works
if ! docker info &> /dev/null; then
    echo -e "${RED}ERROR: Docker is installed but not working!${NC}"
    if [ "$IS_WSL" = true ]; then
        echo -e "${YELLOW}For WSL, ensure Docker Desktop is running and WSL integration is enabled.${NC}"
    fi
    exit 1
fi

# Check for NVIDIA runtime in Docker
HAS_NVIDIA_RUNTIME=false
if docker info 2>/dev/null | grep -qi nvidia; then
    HAS_NVIDIA_RUNTIME=true
    echo -e "${GREEN}✓ NVIDIA runtime detected in Docker${NC}"
fi

# Install NVIDIA Container Toolkit if needed (skip on WSL with Docker Desktop)
if [ "$HAS_NVIDIA_RUNTIME" = false ]; then
    if [ "$IS_WSL" = true ]; then
        echo -e "${YELLOW}NVIDIA runtime not found in Docker.${NC}"
        echo -e "${YELLOW}If using Docker Desktop, GPU support should be automatic.${NC}"
        echo -e "${YELLOW}Skipping NVIDIA Container Toolkit installation (not needed with Docker Desktop).${NC}"
        echo -e "${YELLOW}If GPU containers don't work, ensure Docker Desktop has WSL GPU support enabled.${NC}"
    else
        echo "Installing NVIDIA Container Toolkit..."
        distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
        curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | apt-key add - 2>/dev/null || true
        curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | tee /etc/apt/sources.list.d/nvidia-docker.list 2>/dev/null || true
        apt-get update -qq
        if apt-get install -y nvidia-container-toolkit 2>/dev/null; then
            systemctl restart docker 2>/dev/null || true
            echo -e "${GREEN}✓ NVIDIA Container Toolkit installed${NC}"
        else
            echo -e "${YELLOW}Warning: Could not install NVIDIA Container Toolkit${NC}"
            echo -e "${YELLOW}You may need to install it manually or use Docker Desktop (for WSL)${NC}"
        fi
    fi
else
    echo -e "${GREEN}✓ NVIDIA Container Toolkit available${NC}"
fi
echo ""

# ===== Step 4: Setup Worker =====
echo -e "${YELLOW}=== Step 4: Setting Up Worker ===${NC}"

# Create worker directory
mkdir -p "$WORKER_DIR"
cd "$WORKER_DIR"

# Download worker script
echo "Downloading worker script..."
if ! curl -fsSL "https://capa.cloud/worker/main.py" -o main.py; then
    echo -e "${RED}Failed to download worker script${NC}"
    exit 1
fi
chmod +x main.py
echo -e "${GREEN}✓ Worker script downloaded${NC}"

# Download requirements
echo "Downloading requirements..."
if ! curl -fsSL "https://capa.cloud/worker/requirements.txt" -o requirements.txt; then
    echo -e "${YELLOW}Warning: Could not download requirements.txt${NC}"
    echo "requests" > requirements.txt
fi

# Install Python and pip if needed
if ! command -v python3 &> /dev/null; then
    echo "Installing Python 3..."
    apt-get install -y python3
fi

if ! command -v pip3 &> /dev/null; then
    echo "Installing pip3..."
    apt-get install -y python3-pip
fi

# Install Python dependencies
echo "Installing Python dependencies..."
# Ubuntu 24.04+ has PEP 668 protection, use --break-system-packages for system-wide install
# This is safe for our use case as we're installing in a controlled environment
if pip3 install --break-system-packages -q -r requirements.txt 2>/dev/null; then
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
elif pip3 install -q -r requirements.txt 2>/dev/null; then
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
else
    echo -e "${YELLOW}Warning: Could not install some Python dependencies${NC}"
    echo -e "${YELLOW}Trying with --break-system-packages flag...${NC}"
    pip3 install --break-system-packages -r requirements.txt || {
        echo -e "${RED}ERROR: Failed to install Python dependencies${NC}"
        echo -e "${YELLOW}You may need to install them manually${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
fi

# ===== Step 5: Generate SSH Key =====
echo -e "${YELLOW}=== Step 5: SSH Configuration ===${NC}"

SSH_KEY_DIR="/root/.ssh"
mkdir -p "$SSH_KEY_DIR"

if [ ! -f "$SSH_KEY_DIR/capa_worker" ]; then
    ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_DIR/capa_worker" -N "" -q
fi

SSH_PUBLIC_KEY=$(cat "$SSH_KEY_DIR/capa_worker.pub")
SSH_PORT=2222

echo -e "${GREEN}✓ SSH key generated${NC}"
echo -e "${GREEN}✓ SSH port: $SSH_PORT${NC}\n"

# ===== Step 6: Configure Firewall =====
echo -e "${YELLOW}=== Step 6: Firewall Configuration ===${NC}"

# UFW
if command -v ufw &> /dev/null; then
    ufw --force enable 2>/dev/null || true
    ufw allow 22/tcp 2>/dev/null || true
    ufw allow $SSH_PORT/tcp 2>/dev/null || true
    echo -e "${GREEN}✓ UFW configured${NC}"
fi

# Firewalld
if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-port=22/tcp 2>/dev/null || true
    firewall-cmd --permanent --add-port=$SSH_PORT/tcp 2>/dev/null || true
    firewall-cmd --reload 2>/dev/null || true
    echo -e "${GREEN}✓ Firewalld configured${NC}"
fi

echo ""

# ===== Step 7: Create Systemd Service =====
echo -e "${YELLOW}=== Step 7: Creating Service ===${NC}"

# Create environment file
cat > "$WORKER_DIR/.env" <<EOF
ACCOUNT_ID=$ACCOUNT_ID
WORKER_ID=$(hostname)-$(date +%s)
SSH_PORT=$SSH_PORT
SSH_KEY=$SSH_PUBLIC_KEY
CAPA_API_URL=$API_URL
EOF

# Create systemd service
cat > "/etc/systemd/system/$SERVICE_NAME.service" <<EOF
[Unit]
Description=CapaCloud GPU Worker
After=docker.service
Requires=docker.service

[Service]
Type=simple
User=root
WorkingDirectory=$WORKER_DIR
EnvironmentFile=$WORKER_DIR/.env
ExecStart=/usr/bin/python3 $WORKER_DIR/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
echo -e "${GREEN}✓ Service created${NC}\n"

# ===== Step 8: Start Service =====
echo -e "${YELLOW}=== Step 8: Starting Worker ===${NC}"
systemctl start "$SERVICE_NAME"
sleep 2

if systemctl is-active --quiet "$SERVICE_NAME"; then
    echo -e "${GREEN}✓ Worker started successfully${NC}"
else
    echo -e "${YELLOW}⚠ Service may have failed to start${NC}"
    echo "Check status: sudo systemctl status $SERVICE_NAME"
fi

# ===== Summary =====
echo -e "\n${GREEN}=== Installation Complete! ===${NC}\n"
echo "Configuration: $WORKER_DIR/.env"
echo "SSH Public Key:"
echo "$SSH_PUBLIC_KEY"
echo ""
echo "Next steps:"
echo "1. Go to: https://capa.cloud/provider/gpus/register"
echo "2. Find your machine in the pending list"
echo "3. Complete registration"
echo ""
echo "Useful commands:"
echo "  Check status: sudo systemctl status $SERVICE_NAME"
echo "  View logs: sudo journalctl -u $SERVICE_NAME -f"
echo "  Test manually: cd $WORKER_DIR && python3 main.py"
