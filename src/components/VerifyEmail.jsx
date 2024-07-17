import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

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
        if (data.message === 'Email verified successfully') {
          setIsVerified(true);
        }
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
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Email Verification</h2>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mb-4"></div>
            <span className="text-xl text-black">Verifying...</span>
          </div>
        ) : (
          <>
            <p className="text-black bg-gray-200 p-4 rounded-md text-center">
              {message}
            </p>
            {isVerified && (
              <p className="text-black bg-gray-200 p-4 rounded-md text-center mt-4">
                Your email has been verified successfully. Please proceed to log in.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
