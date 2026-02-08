import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# Email configuration from environment variables
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@cybersecureafrica.org")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

def send_confirmation_email(to_email: str, fullname: str, token: str) -> bool:
    """
    Send email confirmation to registered user
    
    Args:
        to_email: Recipient email address
        fullname: Recipient full name
        token: Confirmation token
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        # Create message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Confirm Your Registration - CyberSecure Africa"
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email

        # Confirmation link
        confirm_link = f"{FRONTEND_URL}/confirm?token={token}"

        # HTML email body
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #059669 0%, #047857 100%); 
                           color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 30px; }}
                .button {{ display: inline-block; padding: 15px 30px; background: #059669; 
                          color: white; text-decoration: none; border-radius: 5px; 
                          font-weight: bold; margin: 20px 0; }}
                .footer {{ text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🛡️ CyberSecure Africa</h1>
                    <p>Empowering Digital Defenders</p>
                </div>
                <div class="content">
                    <h2>Welcome, {fullname}!</h2>
                    <p>Thank you for registering for the <strong>CyberSecure Africa Cybersecurity Training Program</strong> 
                    starting on <strong>February 15, 2026</strong>.</p>
                    
                    <p>To complete your registration, please confirm your email address by clicking the button below:</p>
                    
                    <div style="text-align: center;">
                        <a href="{confirm_link}" class="button">Confirm My Email</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #059669;">{confirm_link}</p>
                    
                    <p><strong>What's Next?</strong></p>
                    <ul>
                        <li>You'll receive program details and curriculum via email</li>
                        <li>Access to our learning platform will be granted before the start date</li>
                        <li>Join our community of aspiring cybersecurity professionals</li>
                    </ul>
                    
                    <p>If you didn't register for this program, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>© 2026 CyberSecure Africa | A Very Africa Nonprofit</p>
                    <p>Building a safer digital Africa, one defender at a time.</p>
                </div>
            </div>
        </body>
        </html>
        """

        # Plain text version
        text = f"""
        Welcome to CyberSecure Africa, {fullname}!

        Thank you for registering for our Cybersecurity Training Program starting February 15, 2026.

        Please confirm your email by visiting: {confirm_link}

        If you didn't register, please ignore this email.

        © 2026 CyberSecure Africa
        """

        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")
        msg.attach(part1)
        msg.attach(part2)

        # Send email if SMTP is configured
        if SMTP_USER and SMTP_PASSWORD:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
            logger.info(f"Confirmation email sent to {to_email}")
            return True
        else:
            # In development, just log the confirmation link
            logger.warning(f"SMTP not configured. Confirmation link for {to_email}: {confirm_link}")
            print(f"\n{'='*80}\nCONFIRMATION LINK for {to_email}:\n{confirm_link}\n{'='*80}\n")
            return True

    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False


def send_welcome_email(to_email: str, fullname: str) -> bool:
    """
    Send welcome email after successful confirmation
    
    Args:
        to_email: Recipient email address
        fullname: Recipient full name
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Welcome to CyberSecure Africa! 🎉"
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email

        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #059669 0%, #047857 100%); 
                           color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 30px; }}
                .footer {{ text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Registration Confirmed!</h1>
                </div>
                <div class="content">
                    <h2>Welcome Aboard, {fullname}!</h2>
                    <p>Your email has been confirmed. You're officially enrolled in the CyberSecure Africa 
                    Cybersecurity Training Program!</p>
                    
                    <p><strong>Program Start Date:</strong> February 15, 2026</p>
                    
                    <p>We'll send you more details about the curriculum, schedules, and platform access 
                    as we get closer to the start date.</p>
                    
                    <p>Get ready to become a digital defender! 🛡️</p>
                </div>
                <div class="footer">
                    <p>© 2026 CyberSecure Africa | A Very Africa Nonprofit</p>
                </div>
            </div>
        </body>
        </html>
        """

        text = f"""
        Registration Confirmed!

        Welcome aboard, {fullname}!

        You're officially enrolled in the CyberSecure Africa Cybersecurity Training Program 
        starting February 15, 2026.

        We'll send you more details soon.

        © 2026 CyberSecure Africa
        """

        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")
        msg.attach(part1)
        msg.attach(part2)

        if SMTP_USER and SMTP_PASSWORD:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
            logger.info(f"Welcome email sent to {to_email}")
            return True
        else:
            logger.warning(f"SMTP not configured. Welcome email skipped for {to_email}")
            return True

    except Exception as e:
        logger.error(f"Failed to send welcome email to {to_email}: {str(e)}")
        return False
