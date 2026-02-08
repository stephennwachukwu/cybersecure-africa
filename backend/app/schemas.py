from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class RegistrationCreate(BaseModel):
    fullname: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=50)
    country: str = Field(..., min_length=2, max_length=100)
    age: str
    experience: str
    motivation: Optional[str] = None

class RegistrationResponse(BaseModel):
    id: int
    fullname: str
    email: str
    phone: str
    country: str
    age: str
    experience: str
    email_confirmed: bool
    created_at: datetime

    class Config:
        from_attributes = True

class EmailConfirmation(BaseModel):
    token: str
