// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      setError('Invalid or missing token');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred. Please try again later.');
      } else {
        setSuccess('Your password has been successfully reset.');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10" />
        )}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Reset Password</h2>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-4">
            {success}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter new password"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
