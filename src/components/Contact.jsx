import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Us</h2>
          <p className="text-red-500">You need to be logged in to access this section.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setFeedback('Your message has been sent successfully!');
        setMessage('');
      } else {
        setFeedback('Failed to send message. Please try again later.');
      }
    } catch (error) {
      setFeedback('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Contact Us</h2>
        {feedback && <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-4">{feedback}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            placeholder="Enter your message"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
