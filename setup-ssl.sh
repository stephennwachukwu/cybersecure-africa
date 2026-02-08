#!/bin/bash

# SSL Certificate Setup Script for CyberSecure Africa
# This script uses Certbot to obtain Let's Encrypt SSL certificates

set -e

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found. Please create it from .env.example"
    exit 1
fi

# Check if domain and email are set
if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Error: DOMAIN and EMAIL must be set in .env file"
    exit 1
fi

echo "🔒 Setting up SSL certificates for $DOMAIN"

# Create directories
mkdir -p nginx/ssl
mkdir -p nginx/conf.d

# Stop nginx if running
docker-compose stop nginx 2>/dev/null || true

# Start only the services needed for certificate
docker-compose up -d certbot

# Obtain certificate
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Set correct permissions
sudo chown -R $USER:$USER nginx/ssl

echo "✅ SSL certificates obtained successfully!"
echo "📝 Certificates are stored in: nginx/ssl/live/$DOMAIN/"

# Restart nginx with SSL
docker-compose up -d nginx

echo "🚀 Nginx restarted with SSL configuration"
echo "🌐 Your site should now be available at: https://$DOMAIN"
