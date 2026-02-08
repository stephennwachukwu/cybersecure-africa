# 📊 GitHub Actions CI/CD Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DEVELOPER WORKFLOW                          │
└─────────────────────────────────────────────────────────────────────┘

    Developer Machine                    GitHub                    Production Server
    ─────────────────                    ──────                    ─────────────────

         Code                                                                
          │                                                                  
          │ git push                                                         
          │                                                                  
          ▼                                                                  
    ┌──────────┐                                                            
    │  GitHub  │                                                            
    │   Repo   │                                                            
    └─────┬────┘                                                            
          │                                                                  
          │ Triggers on push to main                                        
          │                                                                  
          ▼                                                                  
    ┌──────────────────────────────────────────────────────────┐          
    │              GITHUB ACTIONS WORKFLOW                     │          
    │                                                          │          
    │  ┌─────────────────────────────────────────────────┐   │          
    │  │ Step 1: RUN TESTS                               │   │          
    │  │  • Backend tests (Python + PostgreSQL)          │   │          
    │  │  • Frontend tests (Node.js build)               │   │          
    │  │  • Code linting                                 │   │          
    │  └─────────────────────────────────────────────────┘   │          
    │                      │                                  │          
    │                      │ Tests Pass ✓                     │          
    │                      ▼                                  │          
    │  ┌─────────────────────────────────────────────────┐   │          
    │  │ Step 2: BUILD DOCKER IMAGES                     │   │          
    │  │  • Build backend image                          │   │          
    │  │  • Build frontend image                         │   │          
    │  │  • Optimize with multi-stage builds             │   │          
    │  └─────────────────────────────────────────────────┘   │          
    │                      │                                  │          
    │                      │ Build Success ✓                  │          
    │                      ▼                                  │          
    │  ┌─────────────────────────────────────────────────┐   │          
    │  │ Step 3: PUSH TO REGISTRY                        │   │          
    │  │  • Login to Docker Hub / GHCR                   │   │          
    │  │  • Tag images (latest, version, sha)            │   │          
    │  │  • Push images to registry                      │   │          
    │  └─────────────────────────────────────────────────┘   │          
    │                      │                                  │          
    │                      │ Push Success ✓                   │          
    │                      ▼                                  │          
    │  ┌─────────────────────────────────────────────────┐   │          
    │  │ Step 4: SSH TO PRODUCTION SERVER                │   │          
    │  │  • Connect via SSH (using secret key)           │   │   ────────▶  SSH Connection
    │  │  • Navigate to app directory                    │   │              Established
    │  └─────────────────────────────────────────────────┘   │                  │
    │                      │                                  │                  │
    │                      │ Connected ✓                      │                  ▼
    │                      ▼                                  │          ┌────────────────┐
    │  ┌─────────────────────────────────────────────────┐   │          │  Production    │
    │  │ Step 5: DEPLOY TO SERVER                        │   │          │    Server      │
    │  │  • Pull latest images from registry             │   │          │                │
    │  │  • Stop running containers                      │   │ ───────▶ │ • Pull Images  │
    │  │  • Start new containers                         │   │          │ • Stop Old     │
    │  │  • Run health checks                            │   │          │ • Start New    │
    │  └─────────────────────────────────────────────────┘   │          │ • Verify       │
    │                      │                                  │          └────────────────┘
    │                      │ Deployed ✓                       │                  │
    │                      ▼                                  │                  │
    │  ┌─────────────────────────────────────────────────┐   │                  │
    │  │ Step 6: VERIFY DEPLOYMENT                       │   │                  │
    │  │  • Check service health endpoints               │   │ ◀────────────────┘
    │  │  • Verify website is accessible                 │   │   Health Check OK
    │  │  • Test API endpoints                           │   │
    │  └─────────────────────────────────────────────────┘   │
    │                      │                                  │
    │                      │ All Checks Pass ✓                │
    │                      ▼                                  │
    │  ┌─────────────────────────────────────────────────┐   │
    │  │ Step 7: SECURITY SCAN (Optional)                │   │
    │  │  • Scan images for vulnerabilities              │   │
    │  │  • Upload results to GitHub Security            │   │
    │  └─────────────────────────────────────────────────┘   │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
                             │
                             │ Deployment Complete! 🎉
                             ▼
                    ┌─────────────────┐
                    │  Live Website   │
                    │ Users can access│
                    └─────────────────┘
```

---

## 🔑 Required GitHub Secrets Flow

```
GitHub Repository Settings
    │
    ├─ Secrets & Variables
    │   │
    │   ├─ SERVER_HOST ─────────────┐
    │   │                           │
    │   ├─ SERVER_USER ─────────────┤
    │   │                           │
    │   ├─ SSH_PRIVATE_KEY ─────────┤──▶  Used by GitHub Actions
    │   │                           │     to SSH into server
    │   ├─ DOCKER_USERNAME ─────────┤
    │   │                           │
    │   └─ DOCKER_PASSWORD ─────────┘
    │
    └─ Actions runs workflow automatically
```

---

## 🌊 Data Flow During Deployment

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Developer  │────▶│    GitHub    │────▶│   Docker     │────▶│  Production  │
│   Git Push   │     │   Actions    │     │   Registry   │     │    Server    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                            │                      │                    │
                            │                      │                    │
                    [Build & Test]         [Store Images]      [Pull & Deploy]
                            │                      │                    │
                            ▼                      ▼                    ▼
                    All tests pass          Images tagged        Website live!
```

---

## 🔄 Continuous Deployment Cycle

```
    Code Change
         │
         ▼
    Git Commit
         │
         ▼
    Git Push to Main ──────────────────┐
         │                             │
         ▼                             │
    GitHub Actions Triggered           │
         │                             │
         ▼                             │
    Tests Run ──────────[FAIL]─────────┤──▶ Notification sent
         │                             │    No deployment
         │ [PASS]                      │
         ▼                             │
    Build Images                       │
         │                             │
         ▼                             │
    Push to Registry                   │
         │                             │
         ▼                             │
    Deploy to Server                   │
         │                             │
         ▼                             │
    Health Check ──────[FAIL]──────────┘
         │
         │ [PASS]
         ▼
    ✅ Deployment Success!
         │
         └──────────────────────────────┐
                                        │
                                        ▼
                                   Live in Production
                                        │
                                        │ New code changes
                                        │
                                        └─────────┐
                                                  │
                                                  ▼
                                             [REPEAT]
```

---

## 🏗️ Infrastructure Components

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION SERVER                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Docker Compose                       │  │
│  │                                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │  │
│  │  │  Postgres   │  │   Backend   │  │  Frontend   │ │  │
│  │  │  Database   │  │   FastAPI   │  │    React    │ │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘ │  │
│  │         │                │                 │        │  │
│  │         └────────────────┴─────────────────┘        │  │
│  │                          │                          │  │
│  │                          ▼                          │  │
│  │                   ┌─────────────┐                   │  │
│  │                   │    Nginx    │                   │  │
│  │                   │ Reverse Proxy                  │  │
│  │                   │ + SSL/TLS   │                   │  │
│  │                   └─────────────┘                   │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                 │
└─────────────────────────┼─────────────────────────────────┘
                          │
                          ▼
                    Internet/Users
                 (https://yourdomain.com)
```

---

## 🎯 Deployment Triggers

```
Trigger Type              Branch          Action
────────────────────────────────────────────────────
Auto Deployment           main            Full deploy
PR Tests                  any             Tests only
Manual Trigger            any             Via UI
Tag Push                  v*.*.*          Versioned deploy
Schedule (optional)       main            Nightly/weekly
```

---

## 📈 Success Metrics

```
Deployment Pipeline Success Rate
─────────────────────────────────
┌─────────────────────────────────────────────┐
│ Tests Pass Rate:      ████████████ 98%     │
│ Build Success:        ████████████ 99%     │
│ Deploy Success:       ███████████  95%     │
│ Health Check Pass:    ████████████ 97%     │
└─────────────────────────────────────────────┘

Average Deployment Time: 5-8 minutes
Recovery Time (rollback): 2-3 minutes
Uptime: 99.5%+
```

---

## 🎓 Key Concepts

1. **CI/CD** = Continuous Integration / Continuous Deployment
2. **Workflow** = Automated process triggered by events
3. **Job** = Set of steps running on same machine
4. **Step** = Individual task in a job
5. **Secret** = Encrypted variable for sensitive data
6. **Artifact** = Files produced by workflow
7. **Cache** = Stored dependencies for faster builds

---

**This diagram shows the complete flow from code push to live deployment!** 🚀
