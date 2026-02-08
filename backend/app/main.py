from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from .database import Base, engine
from .routers import registration
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CyberSecure Africa API",
    description="API for CyberSecure Africa Cybersecurity Training Program",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gzip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Include routers
app.include_router(registration.router)


@app.get("/")
def root():
    return {
        "message": "CyberSecure Africa API",
        "version": "1.0.0",
        "status": "operational"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
