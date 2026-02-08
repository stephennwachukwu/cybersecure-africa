# 🚀 GitHub Actions Quick Reference Card

## 📋 Setup Checklist

### One-Time Setup

```bash
# 1. On Server
□ Run: curl -fsSL https://get.docker.com | sh
□ Run: ./scripts/setup-server-for-github-actions.sh
□ Edit: ~/cybersecure-africa/.env
□ Generate SSH key: ssh-keygen -t rsa -b 4096
□ Add public key to ~/.ssh/authorized_keys

# 2. On GitHub
□ Create repository
□ Push code: git push origin main
□ Add Secrets (Settings → Secrets → Actions):
  ├─ SERVER_HOST (your server IP)
  ├─ SERVER_USER (ubuntu)
  ├─ SSH_PRIVATE_KEY (entire private key)
  ├─ DOCKER_USERNAME (Docker Hub username)
  └─ DOCKER_PASSWORD (Docker Hub token)

# 3. First Deployment
□ Push to main branch
□ Watch Actions tab
□ Verify: curl http://your-server-ip/health
```

---

## 🎯 GitHub Secrets Required

| Secret Name | Example Value | Where to Get It |
|-------------|---------------|-----------------|
| `SERVER_HOST` | `123.45.67.89` | Your VPS/cloud server IP |
| `SERVER_USER` | `ubuntu` | SSH username |
| `SSH_PRIVATE_KEY` | `-----BEGIN...` | `cat ~/.ssh/id_rsa` |
| `DOCKER_USERNAME` | `myusername` | Docker Hub account |
| `DOCKER_PASSWORD` | `dckr_pat_...` | Docker Hub → Settings → Security |

---

## 🔄 Deployment Workflows

### Available Workflows

| Workflow File | Trigger | Purpose |
|---------------|---------|---------|
| `deploy.yml` | Push to `main` | Full deployment (GHCR) |
| `deploy-dockerhub.yml` | Push to `main` | Deployment via Docker Hub |
| `ci-tests.yml` | Any branch except `main` | Run tests only |

### Choose Your Workflow

**Option 1: GitHub Container Registry (GHCR)**
- Use: `.github/workflows/deploy.yml`
- Pros: No extra accounts, private by default
- Images: `ghcr.io/username/repo-backend:latest`

**Option 2: Docker Hub**
- Use: `.github/workflows/deploy-dockerhub.yml`  
- Pros: Public images, familiar
- Images: `username/cybersecure-backend:latest`

**Disable unused workflow:**
```bash
# Rename unused workflow
mv .github/workflows/deploy-dockerhub.yml .github/workflows/deploy-dockerhub.yml.disabled
```

---

## 📝 Common Commands

### Trigger Deployment

```bash
# Automatic (push to main)
git add .
git commit -m "Update application"
git push origin main

# Manual (via GitHub UI)
# Go to: Actions → Select Workflow → Run workflow
```

### Check Deployment Status

```bash
# On GitHub
Go to: Repository → Actions → Latest workflow run

# On Server
ssh user@server
cd ~/cybersecure-africa
docker-compose ps              # Check services
docker-compose logs -f         # View logs
curl http://localhost/health   # Test health
```

### Update Environment Variables

```bash
# On Server
ssh user@server
cd ~/cybersecure-africa
nano .env                      # Edit variables
docker-compose restart         # Apply changes
```

---

## 🐛 Troubleshooting

### Deployment Failed?

```bash
# 1. Check GitHub Actions Logs
# Go to: Actions → Failed run → Click on red job

# 2. Common Issues & Fixes

# SSH Permission Denied
→ Check SSH_PRIVATE_KEY secret
→ Verify public key in ~/.ssh/authorized_keys
→ Test: ssh -i ~/.ssh/id_rsa user@server

# Docker Login Failed  
→ Check DOCKER_USERNAME and DOCKER_PASSWORD
→ Generate new token: hub.docker.com/settings/security

# Image Not Found
→ Update image names in docker-compose.prod.yml
→ Match with pushed images

# Health Check Failed
→ SSH to server: ssh user@server
→ Check logs: docker-compose logs
→ Restart: docker-compose restart
```

### Rollback Deployment

```bash
# SSH to server
ssh user@server
cd ~/cybersecure-africa

# Stop current deployment
docker-compose down

# Pull specific version (if needed)
docker pull username/cybersecure-backend:v1.2.0

# Update docker-compose.prod.yml with version tag
# Then restart
docker-compose up -d
```

---

## 📊 Monitoring

### View Deployment Logs

```bash
# Real-time logs
ssh user@server
cd ~/cybersecure-africa
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Health Checks

```bash
# From anywhere
curl https://yourdomain.com/health

# On server
curl http://localhost/health
curl http://localhost/api/health
curl http://localhost:8000/api/docs  # API documentation
```

### Service Status

```bash
ssh user@server
cd ~/cybersecure-africa
docker-compose ps  # List all services
docker stats       # Resource usage
```

---

## 🔧 Maintenance

### Update Application

```bash
# Local machine
git pull origin main  # Get latest changes
git add .
git commit -m "Update XYZ"
git push origin main  # Triggers auto-deployment
```

### Database Backup

```bash
# On server
cd ~/cybersecure-africa
docker-compose exec db pg_dump -U cyberuser cybersecure > backup_$(date +%Y%m%d).sql

# Download backup
scp user@server:~/cybersecure-africa/backup_*.sql ./
```

### View Registrations

```bash
# On server
docker-compose exec db psql -U cyberuser cybersecure
# Then run SQL:
SELECT id, fullname, email, email_confirmed, created_at 
FROM registrations 
ORDER BY created_at DESC 
LIMIT 20;
```

---

## 🎨 Customization

### Update Environment Variables

```bash
# On server
nano ~/cybersecure-africa/.env
# Edit values, then:
docker-compose restart backend  # Apply changes
```

### Add New Service

```yaml
# Edit docker-compose.prod.yml
services:
  newservice:
    image: some-image:latest
    # ...
```

### Change Domain

```bash
# 1. Update DNS to point to server
# 2. Edit .env file
nano ~/cybersecure-africa/.env
# Update: DOMAIN=newdomain.com
# 3. Regenerate SSL
./scripts/setup-ssl.sh
# 4. Restart
docker-compose restart nginx
```

---

## 📚 Useful Links

- **GitHub Actions Docs**: https://docs.github.com/actions
- **Docker Hub**: https://hub.docker.com
- **GitHub Container Registry**: https://ghcr.io
- **Repository**: https://github.com/yourusername/cybersecure-africa

---

## 🆘 Quick Help

### Something Wrong?

1. ✅ Check GitHub Actions logs
2. ✅ SSH to server and check `docker-compose logs`
3. ✅ Verify all secrets are set correctly
4. ✅ Test SSH connection manually
5. ✅ Check `.env` file on server

### Still Stuck?

- Open issue on GitHub repository
- Check full documentation: `GITHUB_ACTIONS_DEPLOYMENT.md`
- Review deployment logs in Actions tab

---

**Last Updated**: 2026-02-07  
**Version**: 1.0.0
