from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from datetime import datetime
from .database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(50))
    country = Column(String(100))
    age = Column(String(20))
    experience = Column(String(50))
    motivation = Column(Text)
    email_confirmed = Column(Boolean, default=False)
    confirmation_token = Column(String(255), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
