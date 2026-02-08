# 🚀 Quick Start Guide - CyberSecure Africa

## For Local Development (No SSL)

### 1. Install Prerequisites
```bash
# Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your settings (use default values for local testing)
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Access Application
- Frontend: http://localhost
- Backend API: http://localhost/api/docs
- Database: localhost:5432

---

## For Production Deployment

### 1. Prepare Server
- Ubuntu 22.04 LTS
- 2GB RAM minimum
- Domain pointing to server

### 2. Run Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

### 3. Configure .env
Edit `.env` with production values:
```env
DB_PASSWORD=strong_password_here
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
DOMAIN=yourdomain.com
BASE_URL=https://yourdomain.com
```

### 4. Setup SSL
```bash
chmod +x setup-ssl.sh
./setup-ssl.sh
```

### 5. Verify Deployment
```bash
# Check services
docker-compose ps

# View logs
docker-compose logs -f

# Test health endpoint
curl https://yourdomain.com/health
```

---

## Email Configuration (Gmail)

1. Enable 2FA on Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" → Generate
3. Copy 16-character password to `.env`

---

## Common Commands

```bash
# View all logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop everything
docker-compose down

# Rebuild after code changes
docker-compose down && docker-compose build --no-cache && docker-compose up -d

# Access database
docker-compose exec db psql -U cyberuser -d cybersecure

# Check registration count
docker-compose exec db psql -U cyberuser -d cybersecure -c "SELECT COUNT(*) FROM registrations;"
```

---

## Testing the Registration Flow

1. Open http://localhost (or your domain)
2. Scroll to "Register Now" section
3. Fill out the form
4. Submit registration
5. Check email for confirmation link
6. Click confirmation link
7. Verify in database:
   ```bash
   docker-compose exec db psql -U cyberuser -d cybersecure -c "SELECT * FROM registrations;"
   ```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 80
sudo lsof -i :80
# Kill process
sudo kill -9 PID
```

### Can't Send Emails
- Verify SMTP credentials
- Check firewall allows port 587
- View backend logs: `docker-compose logs backend`

### Database Connection Failed
```bash
# Check database is running
docker-compose ps db

# Restart database
docker-compose restart db
```

---

## Next Steps

After successful deployment:
1. Test registration flow end-to-end
2. Monitor logs for errors
3. Setup monitoring (optional)
4. Configure backup for database
5. Add admin authentication
6. Customize branding and colors

---

**Need Help?**
- Email: info@veryafrica.org
- Check logs: `docker-compose logs`
- Review README.md for detailed docs
