#!/bin/bash

# CyberSecure Africa Deployment Script
# Tested on Ubuntu 22.04 LTS

set -e

echo "🚀 CyberSecure Africa Deployment Script"
echo "========================================"

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo "⚠️  Please do not run this script as root"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "✅ Docker installed successfully"
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "🐙 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installed successfully"
else
    echo "✅ Docker Compose already installed"
fi

# Install additional tools
echo "🛠️  Installing additional tools..."
sudo apt install -y git curl wget ufw certbot

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
echo "✅ Firewall configured"

# Clone or update repository
if [ ! -d "cybersecure-africa" ]; then
    echo "📥 Cloning repository..."
    # git clone YOUR_REPO_URL cybersecure-africa
    # cd cybersecure-africa
    echo "⚠️  Please clone your repository manually"
else
    echo "📂 Repository already exists"
    cd cybersecure-africa
    git pull
fi

# Setup environment variables
if [ ! -f ".env" ]; then
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file with your configuration"
    echo "   Run: nano .env"
    echo ""
    read -p "Press enter to continue after editing .env..."
else
    echo "✅ .env file already exists"
fi

# Build and start services
echo "🏗️  Building and starting services..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🏥 Checking service health..."
docker-compose ps

# Setup SSL (if domain is configured)
read -p "Do you want to setup SSL certificates? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    chmod +x setup-ssl.sh
    ./setup-ssl.sh
fi

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Configure your domain's DNS to point to this server's IP"
echo "   2. Setup SSL certificates if not done: ./setup-ssl.sh"
echo "   3. Configure email settings in .env for registration confirmations"
echo "   4. Access your application at: http://$(curl -s ifconfig.me)"
echo ""
echo "📊 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - View database: docker-compose exec db psql -U cyberuser -d cybersecure"
echo ""
