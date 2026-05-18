#!/bin/bash
# CapaCloud GPU Worker Uninstallation Script

set +e  # Don't exit on error

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SERVICE_NAME="capa-worker"
WORKER_DIR="/opt/capa-worker"

echo -e "${GREEN}=== CapaCloud GPU Worker Uninstallation ===${NC}\n"

# Check root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Stop and remove service
echo "Stopping service..."
systemctl stop "$SERVICE_NAME" 2>/dev/null
systemctl disable "$SERVICE_NAME" 2>/dev/null
systemctl daemon-reload 2>/dev/null
rm -f "/etc/systemd/system/$SERVICE_NAME.service"
echo -e "${GREEN}✓ Service removed${NC}"

# Stop and remove containers
echo "Stopping containers..."
docker stop capa-gpu-1 2>/dev/null
docker rm -f capa-gpu-1 2>/dev/null
docker rm -f capa-gpu-1-setup 2>/dev/null
docker rmi -f capa-gpu-1-setup-image 2>/dev/null
echo -e "${GREEN}✓ Containers removed${NC}"

# Remove worker directory
if [ -d "$WORKER_DIR" ]; then
    read -p "Remove worker directory ($WORKER_DIR)? (y/n) " -n 1 -r < /dev/tty
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$WORKER_DIR"
        echo -e "${GREEN}✓ Worker directory removed${NC}"
    fi
fi

echo -e "\n${GREEN}=== Uninstallation Complete! ===${NC}"
echo "Note: SSH keys in /root/.ssh/ were not removed"
