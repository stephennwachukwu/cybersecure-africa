import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from typing import Optional

class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER", "")
        self.smtp_password = os.getenv("SMTP_PASSWORD", "")
        self.from_email = os.getenv("FROM_EMAIL", "noreply@cybersecureafrica.org")
        self.base_url = os.getenv("BASE_URL", "http://localhost:5173")

    def send_confirmation_email(self, to_email: str, fullname: str, token: str) -> bool:
        """Send email confirmation with verification link"""
        if not self.smtp_user or not self.smtp_password:
            print("Email credentials not configured. Skipping email...")
            return False

        confirmation_link = f"{self.base_url}/confirm?token={token}"
        
        subject = "Welcome to CyberSecure Africa - Confirm Your Registration"
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }}
                .container {{ max-width: 600px; margin: 40px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
                .header {{ background: linear-gradient(135deg, #047857 0%, #059669 100%); padding: 40px 20px; text-align: center; }}
                .header h1 {{ color: white; margin: 0; font-size: 28px; }}
                .content {{ padding: 40px 30px; }}
                .content h2 {{ color: #047857; margin-top: 0; }}
                .content p {{ color: #4b5563; line-height: 1.6; font-size: 16px; }}
                .button {{ display: inline-block; background: #047857; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }}
                .button:hover {{ background: #059669; }}
                .footer {{ background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }}
                .curriculum {{ background: #f0fdf4; padding: 20px; border-radius: 6px; margin: 20px 0; }}
                .curriculum h3 {{ color: #047857; margin-top: 0; }}
                .curriculum ul {{ color: #374151; line-height: 1.8; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🛡️ CyberSecure Africa</h1>
                    <p style="color: #d1fae5; margin: 10px 0 0 0;">Empowering Digital Defenders</p>
                </div>
                <div class="content">
                    <h2>Welcome, {fullname}! 👋</h2>
                    <p>Thank you for registering for the <strong>CyberSecure Africa Cybersecurity Training Program</strong> starting on <strong>February 15, 2026</strong>.</p>
                    
                    <p>Please confirm your email address to complete your registration:</p>
                    
                    <div style="text-align: center;">
                        <a href="{confirmation_link}" class="button">Confirm My Registration</a>
                    </div>
                    
                    <div class="curriculum">
                        <h3>What You'll Learn:</h3>
                        <ul>
                            <li>Network Security & Defense</li>
                            <li>Ethical Hacking & Penetration Testing</li>
                            <li>Cryptography & Secure Communications</li>
                            <li>Incident Response & Forensics</li>
                            <li>Cloud Security & DevSecOps</li>
                            <li>Security Governance & Compliance</li>
                        </ul>
                    </div>
                    
                    <p>This comprehensive 6-month program will equip you with practical skills to protect digital assets and build a career in cybersecurity.</p>
                    
                    <p><strong>Program Details:</strong></p>
                    <ul>
                        <li>📅 Start Date: February 15, 2026</li>
                        <li>⏱️ Duration: 6 months (part-time)</li>
                        <li>💻 Format: Online with hands-on labs</li>
                        <li>🎓 Certificate: Upon completion</li>
                    </ul>
                    
                    <p>If you didn't register for this program, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>© 2026 CyberSecure Africa | A Very Africa Nonprofit Initiative</p>
                    <p>123 Charity Road, Lagos, Nigeria | info@veryafrica.org</p>
                </div>
            </div>
        </body>
        </html>
        """

        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.from_email
            msg['To'] = to_email

            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)

            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            print(f"Confirmation email sent to {to_email}")
            return True
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            return False

email_service = EmailService()
