import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [sentMessages, setSentMessages] = useState(0);

  useEffect(() => {
    if (user) {
      fetchMessagesCount();
    }
  }, [user]);

  const fetchMessagesCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/count`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setSentMessages(data.count);
    } catch (error) {
      console.error('Error fetching messages count:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (sentMessages >= 5) {
      setError('You have reached the maximum number of messages (5). Please contact support if you need to send more messages.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('');
        setSuccess(true);
        fetchMessagesCount();
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (error) {
      setError(error.message.includes('NetworkError') ? 'Network error, please try again later' : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        setSuccess(false);
        setCountdown(5);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [success]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform duration-500 ease-in-out">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact</h2>
          <p className="text-red-500">You need to be logged in to access this section.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      {success ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform duration-500 ease-in-out">
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Message Sent</h2>
          <p className="text-green-500 mb-4">Your message has been sent successfully.</p>
          <p className="text-gray-700">Redirecting in <span className="text-red-500 font-bold">{countdown}</span> seconds...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Contact</h2>
          {error && (
            <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Enter your message"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          <p className="mt-6 text-center text-gray-700">
            Messages sent: {sentMessages}/5
          </p>
        </form>
      )}
    </div>
  );
};

export default Contact;
