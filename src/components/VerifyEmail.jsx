import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Email Verification</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
            <span className="ml-4 text-xl">Verifying...</span>
          </div>
        ) : (
          <p className="text-black bg-gray-200 p-4 rounded-md text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
