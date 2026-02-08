#!/bin/bash

# Deployment Script for CyberSecure Africa Platform
# This script automates the deployment process on Ubuntu

set -e

echo "======================================"
echo "CyberSecure Africa - Deployment Script"
echo "======================================"
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${YELLOW}Warning: This script should not be run as root${NC}"
   echo "Please run as a regular user with sudo privileges"
   exit 1
fi

echo -e "${BLUE}Step 1: Checking system requirements...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose not found. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Setting up environment variables...${NC}"

if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your configuration before proceeding${NC}"
    echo "Press Enter after you've updated the .env file..."
    read
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo -e "${BLUE}Step 3: Building Docker images...${NC}"
docker-compose build
echo -e "${GREEN}✓ Docker images built${NC}"

echo ""
echo -e "${BLUE}Step 4: Starting services...${NC}"
docker-compose up -d
echo -e "${GREEN}✓ Services started${NC}"

echo ""
echo -e "${BLUE}Step 5: Waiting for services to be healthy...${NC}"
sleep 10

# Check service health
echo "Checking service status..."
docker-compose ps

echo ""
echo -e "${GREEN}======================================"
echo "Deployment Complete!"
echo "======================================${NC}"
echo ""
echo "Services are running at:"
echo "  • Frontend: http://localhost"
echo "  • Backend API: http://localhost/api/docs"
echo "  • Health Check: http://localhost/health"
echo ""
echo "Next steps:"
echo "1. Configure your DNS to point to this server's IP"
echo "2. Run ./scripts/setup-ssl.sh to obtain SSL certificates"
echo "3. Update nginx configuration to enable HTTPS"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop services: docker-compose down"
echo ""
