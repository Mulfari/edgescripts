import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const Contact = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !message) {
      setError('Title and message are required.');
      return;
    }

    try {
      const response = await fetch('/api/contact/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error sending the message. Please try again.');
      }

      setSuccess('Message sent successfully.');
      setTitle('');
      setMessage('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <p className="text-red-500">You need to be logged in to use this section.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Contact Us</h2>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
        {success && <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Enter your message"
          ></textarea>
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
