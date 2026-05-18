#!/bin/bash
# CapaCloud GPU Worker Update Script

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

WORKER_DIR="/opt/capa-worker"
SERVICE_NAME="capa-worker"

echo -e "${GREEN}=== CapaCloud GPU Worker Update ===${NC}\n"

if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Stop service
echo "Stopping service..."
systemctl stop "$SERVICE_NAME"

# Update worker script
echo "Updating worker script..."
cd "$WORKER_DIR"
curl -fsSL "https://capa.cloud/worker/main.py" -o main.py
chmod +x main.py

# Update requirements
echo "Updating requirements..."
curl -fsSL "https://capa.cloud/worker/requirements.txt" -o requirements.txt
pip3 install -q -r requirements.txt

# Restart service
echo "Restarting service..."
systemctl start "$SERVICE_NAME"

echo -e "\n${GREEN}✓ Update complete!${NC}"
echo "Check status: sudo systemctl status $SERVICE_NAME"
