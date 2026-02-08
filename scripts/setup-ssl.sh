#!/bin/bash

# SSL Certificate Setup Script for CyberSecure Africa
# This script obtains SSL certificates from Let's Encrypt

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

DOMAIN=${DOMAIN:-cybersecureafrica.org}
EMAIL=${EMAIL:-admin@cybersecureafrica.org}

echo "======================================"
echo "SSL Certificate Setup"
echo "======================================"
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# Check if certificates already exist
if [ -d "./nginx/ssl/live/$DOMAIN" ]; then
    echo "⚠️  Certificates already exist for $DOMAIN"
    read -p "Do you want to renew them? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping certificate generation."
        exit 0
    fi
fi

echo "Obtaining SSL certificates from Let's Encrypt..."
echo "This may take a few minutes..."
echo ""

# Run certbot in standalone mode (requires port 80 to be available)
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

echo ""
echo "✓ SSL certificates obtained successfully!"
echo ""
echo "Certificates are stored in /etc/letsencrypt/live/$DOMAIN/"
echo ""
echo "Next steps:"
echo "1. Update your DNS records to point to this server"
echo "2. Restart nginx: docker-compose restart nginx"
echo ""
