import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Curriculum from './components/Curriculum';
import RegistrationForm from './components/RegistrationForm';
import Confirmation from './components/Confirmation';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState('');

  useEffect(() => {
    // Check for confirmation token in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      handleEmailConfirmation(token);
    }
  }, []);

  const handleEmailConfirmation = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/confirm-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`✅ ${data.message}`);
        // Clear token from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        alert(`❌ ${data.detail}`);
      }
    } catch (error) {
      console.error('Confirmation error:', error);
      alert('Failed to confirm email. Please try again.');
    }
  };

  const handleRegistrationSuccess = (email) => {
    setRegistrationEmail(email);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 8000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <Features />
      <Curriculum />
      <RegistrationForm onSuccess={handleRegistrationSuccess} />
      {showConfirmation && (
        <Confirmation email={registrationEmail} onClose={() => setShowConfirmation(false)} />
      )}
      <Footer />
    </div>
  );
}
