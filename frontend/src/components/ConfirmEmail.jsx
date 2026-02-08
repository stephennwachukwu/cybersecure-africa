import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('confirming'); // confirming, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid confirmation link. Please check your email and try again.');
        return;
      }

      try {
        const response = await axios.post('/api/confirm-email', { token });
        
        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message);
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.detail || 'Email confirmation failed. The link may be invalid or expired.');
      }
    };

    confirmEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-green to-cyber-dark flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-12 text-center animate-fadeInUp">
        {status === 'confirming' && (
          <>
            <div className="spinner mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Confirming Your Email...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your registration.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-cyber-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Email Confirmed! 🎉
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              {message}
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 text-left rounded">
              <p className="text-green-900 mb-2">
                <strong>What's Next?</strong>
              </p>
              <ul className="text-green-800 space-y-2">
                <li>✓ You'll receive program details via email</li>
                <li>✓ Platform access will be granted before Feb 15, 2026</li>
                <li>✓ Join our community of digital defenders</li>
              </ul>
            </div>
            
            <a href="/" className="btn-primary inline-block">
              Return to Home
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Confirmation Failed
            </h2>
            
            <p className="text-gray-600 mb-8">
              {message}
            </p>
            
            <div className="space-y-3">
              <a href="/#register" className="btn-primary inline-block w-full">
                Register Again
              </a>
              <a href="/" className="btn-secondary inline-block w-full">
                Return to Home
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
