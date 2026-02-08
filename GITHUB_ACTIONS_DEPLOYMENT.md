# 🚀 GitHub Actions Deployment Guide

Complete guide to deploy CyberSecure Africa platform using GitHub Actions CI/CD.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Server Setup](#initial-server-setup)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Configure GitHub Secrets](#configure-github-secrets)
5. [Deployment Options](#deployment-options)
6. [Triggering Deployments](#triggering-deployments)
7. [Monitoring & Troubleshooting](#monitoring--troubleshooting)
8. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### What You Need

✅ **GitHub Account** with repository for this project  
✅ **Ubuntu Server** (20.04+ recommended)  
✅ **Domain Name** pointing to your server  
✅ **SSH Access** to your server  
✅ **Docker Hub Account** (or use GitHub Container Registry)  
✅ **SMTP Credentials** (Gmail, SendGrid, etc.)

---

## 🖥️ Initial Server Setup

### Step 1: Prepare Your Server

SSH into your server and run these commands:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes to take effect
exit
```

### Step 2: Create Project Directory

```bash
# Create directory for the application
mkdir -p ~/cybersecure-africa
cd ~/cybersecure-africa

# Create necessary subdirectories
mkdir -p nginx/conf.d nginx/ssl
```

### Step 3: Create Environment File

```bash
# Create .env file
nano .env
```

Add your configuration:

```env
# Database
POSTGRES_DB=cybersecure
POSTGRES_USER=cyberuser
POSTGRES_PASSWORD=your_very_secure_password_here

# Application
ENVIRONMENT=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
FROM_EMAIL=noreply@yourdomain.com

# Docker Images (update with your username/organization)
BACKEND_IMAGE=yourdockerusername/cybersecure-backend:latest
FRONTEND_IMAGE=yourdockerusername/cybersecure-frontend:latest
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

### Step 4: Copy Nginx Configuration

You'll need to copy the nginx configuration files to the server. This can be done during first deployment or manually:

```bash
# You can do this manually first time, or let GitHub Actions handle it
cd ~/cybersecure-africa
```

---

## 🔐 GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `cybersecure-africa`
3. Choose **Private** (recommended for production)
4. Click "Create repository"

### Step 2: Push Your Code

```bash
# On your local machine, navigate to the project
cd /path/to/cybersecure-africa

# Initialize git (if not already done)
git init

# Add remote
git remote add origin https://github.com/yourusername/cybersecure-africa.git

# Add all files
git add .

# Commit
git commit -m "Initial commit with GitHub Actions CI/CD"

# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🔑 Configure GitHub Secrets

GitHub Secrets store sensitive information securely. Here's how to set them up:

### Navigate to Secrets Settings

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Required Secrets

Add these secrets one by one:

#### 1. Server Access Secrets

**`SERVER_HOST`**
- Value: Your server IP address or domain
- Example: `123.45.67.89` or `server.yourdomain.com`

**`SERVER_USER`**
- Value: SSH username (usually `ubuntu` or `root`)
- Example: `ubuntu`

**`SSH_PRIVATE_KEY`**
- Value: Your SSH private key
- How to get it:

```bash
# On your local machine
cat ~/.ssh/id_rsa

# If you don't have SSH key, generate one:
ssh-keygen -t rsa -b 4096 -C "github-actions@yourdomain.com"

# Copy the private key content
cat ~/.ssh/id_rsa
```

Copy the ENTIRE output including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

Then add the PUBLIC key to your server:

```bash
# On your server
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste your public key (from cat ~/.ssh/id_rsa.pub)
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

#### 2. Docker Registry Secrets

**Option A: Using Docker Hub**

**`DOCKER_USERNAME`**
- Your Docker Hub username

**`DOCKER_PASSWORD`**
- Your Docker Hub password or access token
- Generate token at: https://hub.docker.com/settings/security

**Option B: Using GitHub Container Registry (GHCR)**

No secrets needed! GitHub automatically provides `GITHUB_TOKEN`.
Just ensure your repository visibility allows package access.

#### 3. Application Secrets (Optional - can use .env on server)

**`POSTGRES_PASSWORD`**
- Database password

**`SMTP_PASSWORD`**
- Email service app password

---

## 🎯 Deployment Options

You have **two workflow options**:

### Option 1: GitHub Container Registry (Recommended)

**File:** `.github/workflows/deploy.yml`

**Advantages:**
- ✅ No additional accounts needed
- ✅ Private images by default
- ✅ Better integration with GitHub
- ✅ Free for public repos

**Setup:**
1. Enable GitHub Container Registry (automatic)
2. Update image names in `docker-compose.prod.yml`:

```yaml
backend:
  image: ghcr.io/yourusername/cybersecure-africa-backend:latest

frontend:
  image: ghcr.io/yourusername/cybersecure-africa-frontend:latest
```

### Option 2: Docker Hub

**File:** `.github/workflows/deploy-dockerhub.yml`

**Advantages:**
- ✅ Familiar to most developers
- ✅ Public images available
- ✅ Simple setup

**Setup:**
1. Create Docker Hub account at https://hub.docker.com
2. Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
3. Update image names in `docker-compose.prod.yml`

---

## 🚀 Triggering Deployments

### Automatic Deployment

Deployments trigger automatically when:

```bash
# Any push to main branch
git push origin main
```

### Manual Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select workflow (e.g., "Deploy CyberSecure Africa")
4. Click **Run workflow**
5. Select branch
6. Click **Run workflow** button

### Deployment Process

When triggered, GitHub Actions will:

1. ✅ **Test** - Run backend and frontend tests
2. ✅ **Build** - Build Docker images
3. ✅ **Push** - Push images to registry
4. ✅ **Deploy** - SSH into server and update containers
5. ✅ **Verify** - Run health checks
6. ✅ **Scan** - Security vulnerability scanning (optional)

---

## 📊 Monitoring & Troubleshooting

### View Deployment Logs

1. Go to **Actions** tab in GitHub
2. Click on the latest workflow run
3. Click on individual jobs to see logs

### Common Issues & Solutions

#### ❌ SSH Connection Failed

**Error:** `Permission denied (publickey)`

**Solution:**
```bash
# Verify SSH key is correct
# On your local machine:
ssh -i ~/.ssh/id_rsa ubuntu@your-server-ip

# If it works manually, secret is wrong
# Re-copy your private key to SSH_PRIVATE_KEY secret
```

#### ❌ Docker Login Failed

**Error:** `unauthorized: authentication required`

**Solution:**
```bash
# For Docker Hub:
# 1. Verify DOCKER_USERNAME and DOCKER_PASSWORD secrets
# 2. Try logging in manually:
docker login -u yourusername

# For GHCR:
# 1. Check repository visibility
# 2. Ensure GITHUB_TOKEN has package permissions
```

#### ❌ Health Check Failed

**Error:** `curl: (7) Failed to connect`

**Solution:**
```bash
# SSH into your server
ssh ubuntu@your-server-ip

# Check if services are running
cd ~/cybersecure-africa
docker-compose ps

# Check logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx

# Restart if needed
docker-compose restart
```

#### ❌ Image Pull Failed

**Error:** `manifest unknown` or `pull access denied`

**Solution:**
```bash
# Update image names in docker-compose.prod.yml
# Ensure they match what's pushed to registry

# For GHCR:
image: ghcr.io/yourusername/cybersecure-africa-backend:latest

# For Docker Hub:
image: yourdockerusername/cybersecure-backend:latest
```

### Monitor Application

```bash
# SSH into server
ssh ubuntu@your-server-ip

# View real-time logs
cd ~/cybersecure-africa
docker-compose logs -f

# Check service status
docker-compose ps

# Test health endpoint
curl http://localhost/health

# Test API
curl http://localhost/api/health
```

---

## 🔧 Advanced Configuration

### Environment-Specific Deployments

Create separate workflows for staging and production:

**.github/workflows/deploy-staging.yml**
```yaml
name: Deploy to Staging
on:
  push:
    branches:
      - staging

jobs:
  deploy:
    environment: staging
    # ... rest of deployment steps
```

**.github/workflows/deploy-production.yml**
```yaml
name: Deploy to Production
on:
  push:
    branches:
      - main

jobs:
  deploy:
    environment: production
    # ... rest of deployment steps
```

### Add Slack Notifications

Add to your workflow:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Deployment to production: ${{ job.status }}'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Database Migrations

Add before deployment:

```yaml
- name: Run database migrations
  run: |
    ssh -i ~/.ssh/id_rsa ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << 'EOF'
      cd ~/cybersecure-africa
      docker-compose exec -T backend alembic upgrade head
    EOF
```

### Rollback Strategy

Add rollback workflow:

**.github/workflows/rollback.yml**
```yaml
name: Rollback Deployment

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Image tag to rollback to'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
      - name: Rollback to previous version
        run: |
          ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << EOF
            cd ~/cybersecure-africa
            docker-compose down
            # Update image tags to specified version
            export BACKEND_IMAGE=ghcr.io/.../backend:${{ github.event.inputs.version }}
            export FRONTEND_IMAGE=ghcr.io/.../frontend:${{ github.event.inputs.version }}
            docker-compose up -d
          EOF
```

---

## 📝 Complete Deployment Checklist

### Before First Deployment

- [ ] Server is set up with Docker & Docker Compose
- [ ] Domain DNS points to server IP
- [ ] `.env` file created on server
- [ ] Nginx config files on server
- [ ] SSH key pair generated
- [ ] Public key added to server `~/.ssh/authorized_keys`
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] All GitHub secrets configured
- [ ] SMTP credentials tested
- [ ] SSL certificates obtained (or will be obtained)

### After First Deployment

- [ ] Verify all services are running: `docker-compose ps`
- [ ] Test health endpoint: `curl http://localhost/health`
- [ ] Test website in browser
- [ ] Submit test registration
- [ ] Verify email delivery
- [ ] Check confirmation flow
- [ ] Review logs for errors
- [ ] Setup SSL if not already done
- [ ] Configure domain to use HTTPS
- [ ] Test production URLs

---

## 🎓 Example: Complete First Deployment

Here's a complete example from start to finish:

```bash
# 1. On your LOCAL machine - prepare code
cd cybersecure-africa
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cybersecure-africa.git
git push -u origin main

# 2. On your SERVER - initial setup
ssh ubuntu@your-server-ip
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
exit

# SSH again (for group to take effect)
ssh ubuntu@your-server-ip
mkdir -p ~/cybersecure-africa/nginx/{conf.d,ssl}
cd ~/cybersecure-africa
nano .env  # Add your configuration
exit

# 3. On GITHUB - configure secrets
# Go to repo → Settings → Secrets → Add:
# - SERVER_HOST: your-server-ip
# - SERVER_USER: ubuntu
# - SSH_PRIVATE_KEY: (paste private key)
# - DOCKER_USERNAME: yourdockerusername
# - DOCKER_PASSWORD: yourpassword

# 4. PUSH to trigger deployment
git push origin main

# 5. MONITOR deployment
# Watch on GitHub Actions tab

# 6. VERIFY deployment
ssh ubuntu@your-server-ip
cd ~/cybersecure-africa
docker-compose ps
curl http://localhost/health
```

---

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs
2. SSH into server and check container logs
3. Verify all secrets are correct
4. Ensure server has enough resources
5. Check firewall settings

**Need Help?** Open an issue in the GitHub repository.

---

**Happy Deploying! 🚀**
