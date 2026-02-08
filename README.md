# 🛡️ CyberSecure Africa - Cybersecurity Education Platform

A production-ready, full-stack web application for managing registrations for the **CyberSecure Africa Cybersecurity Training Program** starting February 15, 2026.

![Platform Preview](https://via.placeholder.com/1200x600/047857/ffffff?text=CyberSecure+Africa)

## 🌟 Features

### Frontend
- ✨ **Modern, responsive design** with React + Tailwind CSS
- 🎨 **Premium UI/UX** with smooth animations and transitions
- 📱 **Mobile-first** responsive design
- 🔒 **Email confirmation** flow with beautiful templates
- 📊 **Comprehensive curriculum** display with 8 modules
- 🎯 **Interactive registration** form with real-time validation

### Backend
- ⚡ **FastAPI** with async support
- 🗄️ **PostgreSQL** database with connection pooling
- 📧 **SMTP email integration** for registration confirmations
- ✅ **Input validation** with Pydantic
- 🔐 **Security best practices** implemented
- 📈 **Health checks** and monitoring endpoints

### DevOps & Infrastructure
- 🐳 **Docker & Docker Compose** for containerization
- 🌐 **Nginx reverse proxy** with SSL/TLS support
- 🔒 **Let's Encrypt** SSL certificates with auto-renewal
- 🔥 **Production hardening** with security headers
- 📊 **Rate limiting** to prevent abuse
- 🚀 **One-command deployment** scripts

---

## 📁 Project Structure

```
cybersecure-africa/
│
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── database.py        # Database configuration
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── email_service.py   # Email service
│   │   └── routers/
│   │       └── registration.py # Registration endpoints
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Backend container
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Curriculum.jsx
│   │   │   ├── RegistrationForm.jsx
│   │   │   ├── Confirmation.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.js        # Vite configuration
│   ├── nginx.conf            # Nginx config for frontend
│   └── Dockerfile            # Frontend container
│
├── nginx/                     # Nginx Reverse Proxy
│   ├── nginx.conf            # Main nginx config
│   └── conf.d/
│       └── cybersecure.conf  # Site configuration
│
├── docker-compose.yml        # Docker Compose configuration
├── .env.example              # Environment variables template
├── deploy.sh                 # Deployment script
├── setup-ssl.sh              # SSL setup script
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Ubuntu 22.04 LTS (or similar Linux distribution)
- Minimum 2GB RAM, 2 vCPU
- Domain name pointing to your server (for SSL)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd cybersecure-africa
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
nano .env  # Edit with your configuration
```

**Required configurations:**
```env
# Database
DB_PASSWORD=your_secure_password

# Email (for registration confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@cybersecureafrica.org

# Domain
DOMAIN=cybersecureafrica.org
BASE_URL=https://cybersecureafrica.org
```

### 3. Run Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

This will:
- Install Docker and Docker Compose
- Configure firewall
- Build and start all services
- Setup health checks

### 4. Setup SSL Certificates (Production)
```bash
chmod +x setup-ssl.sh
./setup-ssl.sh
```

---

## 🐳 Docker Commands

### Start all services
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild after changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database access
```bash
docker-compose exec db psql -U cyberuser -d cybersecure
```

---

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Use this password in `.env`:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

### Email Features
- Beautiful HTML email templates
- Registration confirmation links
- Program information included in emails
- Curriculum overview
- Error handling and logging

---

## 🔒 Security Features

### Application Security
- ✅ HTTPS/SSL encryption
- ✅ Security headers (HSTS, X-Frame-Options, CSP)
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ CORS configuration
- ✅ Environment variable management

### Infrastructure Security
- ✅ Non-root Docker containers
- ✅ Health checks for all services
- ✅ UFW firewall configuration
- ✅ Nginx reverse proxy
- ✅ Database password protection
- ✅ Gzip compression
- ✅ Static asset caching

---

## 📊 API Endpoints

### Public Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "+234 xxx xxx xxxx",
  "country": "Nigeria",
  "age": "25-34",
  "experience": "Beginner (Some IT knowledge)",
  "motivation": "Want to learn cybersecurity..."
}
```

#### Confirm Email
```http
POST /api/confirm-email
Content-Type: application/json

{
  "token": "confirmation_token_here"
}
```

#### Get Statistics
```http
GET /api/stats
```

#### Health Check
```http
GET /health
```

### Admin Endpoints (Should be protected in production)
```http
GET /api/registrations?skip=0&limit=100
```

---

## 🎨 Curriculum Modules

The platform features an 8-module comprehensive curriculum:

1. **Cybersecurity Fundamentals** (4 weeks)
2. **Network Security & Defense** (4 weeks)
3. **Ethical Hacking & Penetration Testing** (5 weeks)
4. **Cryptography & Secure Communications** (3 weeks)
5. **Incident Response & Digital Forensics** (4 weeks)
6. **Cloud Security & DevSecOps** (3 weeks)
7. **Security Governance & Compliance** (3 weeks)
8. **Capstone Project** (2 weeks)

Each module includes:
- Detailed topic breakdown
- Hands-on labs
- Real-world scenarios
- Assessment and certification

---

## 🌐 Production Deployment

### DNS Configuration
Point your domain to your server:
```
A Record: @ → YOUR_SERVER_IP
A Record: www → YOUR_SERVER_IP
```

### SSL Certificate Setup
```bash
./setup-ssl.sh
```

### Firewall Rules
```bash
sudo ufw status
```

Should show:
```
80/tcp    ALLOW
443/tcp   ALLOW
22/tcp    ALLOW
```

---

## 🔧 Troubleshooting

### Services not starting
```bash
# Check logs
docker-compose logs

# Check service status
docker-compose ps

# Restart services
docker-compose restart
```

### Database connection issues
```bash
# Check database logs
docker-compose logs db

# Access database directly
docker-compose exec db psql -U cyberuser -d cybersecure
```

### Email not sending
1. Verify SMTP credentials in `.env`
2. Check backend logs: `docker-compose logs backend`
3. Ensure Gmail App Password is correct
4. Check firewall isn't blocking port 587

### SSL certificate issues
```bash
# Check certificate status
docker-compose run --rm certbot certificates

# Renew certificates manually
docker-compose run --rm certbot renew
```

---

## 📈 Monitoring

### View Application Logs
```bash
docker-compose logs -f --tail=100
```

### Check Resource Usage
```bash
docker stats
```

### Database Statistics
```bash
docker-compose exec db psql -U cyberuser -d cybersecure -c "SELECT COUNT(*) FROM registrations;"
```

---

## 🤝 Contributing

We welcome contributions! Areas for improvement:

- [ ] Admin dashboard for managing registrations
- [ ] Bulk email notifications
- [ ] Student portal with course materials
- [ ] Progress tracking system
- [ ] Payment integration (for advanced courses)
- [ ] API authentication/authorization
- [ ] Automated testing suite

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Support

For issues and questions:
- **Email**: info@veryafrica.org
- **Phone**: +123 456 7890
- **Address**: 123 Charity Road, Lagos, Nigeria

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Registration system
- ✅ Email confirmations
- ✅ Program information page

### Phase 2 (Planned)
- [ ] Admin dashboard
- [ ] Student login portal
- [ ] Course content delivery
- [ ] Progress tracking

### Phase 3 (Future)
- [ ] Live classes integration
- [ ] Discussion forums
- [ ] Certificate generation
- [ ] Job board

---

**Built with ❤️ by A Very Africa Nonprofit**

*Empowering Africa's Digital Defenders*
