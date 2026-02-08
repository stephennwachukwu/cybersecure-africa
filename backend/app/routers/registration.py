from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from ..database import get_db
from ..models import Registration
from ..schemas import RegistrationCreate, RegistrationResponse, EmailConfirmation
from ..email_service import email_service
import secrets

router = APIRouter(prefix="/api", tags=["registration"])


@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
def register_user(data: RegistrationCreate, db: Session = Depends(get_db)):
    """Register a new user for the cybersecurity program"""
    
    # Check if email already exists
    existing = db.query(Registration).filter(Registration.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Generate confirmation token
    confirmation_token = secrets.token_urlsafe(32)
    
    # Create registration
    registration = Registration(
        **data.model_dump(),
        confirmation_token=confirmation_token,
        email_confirmed=False
    )
    
    try:
        db.add(registration)
        db.commit()
        db.refresh(registration)
        
        # Send confirmation email
        email_service.send_confirmation_email(
            to_email=registration.email,
            fullname=registration.fullname,
            token=confirmation_token
        )
        
        return {
            "message": "Registration successful! Please check your email to confirm your registration.",
            "email": registration.email,
            "confirmation_required": True
        }
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/confirm-email", response_model=dict)
def confirm_email(confirmation: EmailConfirmation, db: Session = Depends(get_db)):
    """Confirm user email address"""
    
    registration = db.query(Registration).filter(
        Registration.confirmation_token == confirmation.token
    ).first()
    
    if not registration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid confirmation token"
        )
    
    if registration.email_confirmed:
        return {
            "message": "Email already confirmed",
            "email": registration.email
        }
    
    registration.email_confirmed = True
    db.commit()
    
    return {
        "message": "Email confirmed successfully! Welcome to CyberSecure Africa.",
        "email": registration.email
    }


@router.get("/registrations", response_model=list[RegistrationResponse])
def get_registrations(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all registrations (admin endpoint - should be protected in production)"""
    registrations = db.query(Registration).offset(skip).limit(limit).all()
    return registrations


@router.get("/stats", response_model=dict)
def get_stats(db: Session = Depends(get_db)):
    """Get registration statistics"""
    total = db.query(Registration).count()
    confirmed = db.query(Registration).filter(Registration.email_confirmed == True).count()
    
    return {
        "total_registrations": total,
        "confirmed_registrations": confirmed,
        "pending_confirmations": total - confirmed
    }
