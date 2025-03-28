import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email?token=${token}`);
        if (!response.ok) {
          throw new Error('Failed to verify email');
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('Error verifying email.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [location]);

  useEffect(() => {
    if (!isLoading && message) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            navigate('/login');
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoading, message, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Email Verification</h2>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mb-4"></div>
            <span className="text-xl text-black">Verifying...</span>
          </div>
        ) : (
          <div className="text-black bg-gray-200 p-4 rounded-md text-center">
            <p className="text-lg font-semibold">{message}</p>
            <p className="mt-4 text-sm text-gray-600">
              You will be redirected in <span className="text-red-600">{countdown}</span> seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
