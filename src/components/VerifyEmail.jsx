import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Error verifying email.');
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
