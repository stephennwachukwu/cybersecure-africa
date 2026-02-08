#!/bin/bash

# Server Setup Script for GitHub Actions Deployment
# Run this script on your Ubuntu server before first deployment

set -e

echo "======================================"
echo "CyberSecure Africa - Server Setup"
echo "For GitHub Actions Deployment"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}Error: Do not run this script as root${NC}"
   echo "Run as a regular user with sudo privileges"
   exit 1
fi

echo -e "${BLUE}Step 1: Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

echo ""
echo -e "${BLUE}Step 3: Creating project directory...${NC}"
mkdir -p ~/cybersecure-africa/{nginx/conf.d,nginx/ssl,scripts}
cd ~/cybersecure-africa
echo -e "${GREEN}✓ Directory created: ~/cybersecure-africa${NC}"

echo ""
echo -e "${BLUE}Step 4: Creating .env file template...${NC}"
if [ ! -f .env ]; then
    cat > .env << 'EOF'
# Database Configuration
POSTGRES_DB=cybersecure
POSTGRES_USER=cyberuser
POSTGRES_PASSWORD=CHANGE_THIS_PASSWORD

# Application Environment
ENVIRONMENT=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@yourdomain.com

# Docker Images (update with your registry)
# For GitHub Container Registry:
BACKEND_IMAGE=ghcr.io/yourusername/cybersecure-africa-backend:latest
FRONTEND_IMAGE=ghcr.io/yourusername/cybersecure-africa-frontend:latest

# For Docker Hub:
# BACKEND_IMAGE=yourdockerusername/cybersecure-backend:latest
# FRONTEND_IMAGE=yourdockerusername/cybersecure-frontend:latest

# SSL Configuration
DOMAIN=yourdomain.com
EMAIL=admin@yourdomain.com
EOF
    echo -e "${GREEN}✓ .env template created${NC}"
    echo -e "${YELLOW}⚠️  Edit ~/cybersecure-africa/.env with your actual values${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo -e "${BLUE}Step 5: Setting up firewall...${NC}"
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp  # SSH
    sudo ufw allow 80/tcp  # HTTP
    sudo ufw allow 443/tcp # HTTPS
    echo -e "${GREEN}✓ Firewall configured${NC}"
else
    echo -e "${YELLOW}⚠️  UFW not installed, skipping firewall setup${NC}"
fi

echo ""
echo -e "${BLUE}Step 6: Downloading nginx configuration files...${NC}"
# Download nginx config from repository (you'll need to update this URL)
echo "You'll need to add nginx configuration files manually or via first GitHub Actions deployment"
echo "Files needed in ~/cybersecure-africa/nginx/:"
echo "  - nginx.conf"
echo "  - conf.d/cybersecure.conf"

echo ""
echo -e "${GREEN}======================================"
echo "Server Setup Complete!"
echo "======================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit configuration file:"
echo "   ${BLUE}nano ~/cybersecure-africa/.env${NC}"
echo ""
echo "2. Update these values in .env:"
echo "   - POSTGRES_PASSWORD (use a strong password)"
echo "   - ALLOWED_ORIGINS (your domain)"
echo "   - ALLOWED_HOSTS (your domain)"
echo "   - FRONTEND_URL (your domain)"
echo "   - SMTP credentials"
echo "   - Docker image names (your username)"
echo "   - DOMAIN (your domain)"
echo ""
echo "3. Generate SSH key for GitHub Actions (if not done):"
echo "   ${BLUE}ssh-keygen -t rsa -b 4096 -C \"github-actions@yourdomain.com\"${NC}"
echo ""
echo "4. Add public key to authorized_keys:"
echo "   ${BLUE}cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys${NC}"
echo ""
echo "5. Copy private key for GitHub Secrets:"
echo "   ${BLUE}cat ~/.ssh/id_rsa${NC}"
echo "   (Copy this entire output to GitHub Secret: SSH_PRIVATE_KEY)"
echo ""
echo "6. Configure GitHub Secrets:"
echo "   - SERVER_HOST: $(curl -s ifconfig.me)"
echo "   - SERVER_USER: $USER"
echo "   - SSH_PRIVATE_KEY: (from step 5)"
echo "   - DOCKER_USERNAME: (your Docker Hub username)"
echo "   - DOCKER_PASSWORD: (your Docker Hub password/token)"
echo ""
echo "7. Push code to GitHub to trigger deployment"
echo ""
echo -e "${YELLOW}NOTE: You may need to logout and login again for Docker group to take effect${NC}"
echo ""

# Check if logout is needed
if ! groups | grep -q docker; then
    echo -e "${RED}⚠️  Important: Run 'exit' and SSH back in for Docker permissions to work${NC}"
fi
