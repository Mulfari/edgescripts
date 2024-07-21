import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getCsrfToken } from '../utils/Utils';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const MAX_SUBJECT_LENGTH = 100;
  const MAX_MESSAGE_LENGTH = 1000;

  useEffect(() => {
    if (!user) {
      setError('You need to be logged in to access this section.');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (subject.length > MAX_SUBJECT_LENGTH) {
      setError(`Subject must be less than ${MAX_SUBJECT_LENGTH} characters.`);
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be less than ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    try {
      const csrfToken = await getCsrfToken();

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ subject, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred.');
      }

      setSuccess('Message sent successfully.');
      setSubject('');
      setMessage('');
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Access Restricted</h2>
          <p className="text-gray-700 mb-4">You need to be logged in to access this section.</p>
          <div className="flex justify-around">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg transform transition duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Login
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a 1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-teal-400 shadow-lg transform transition duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Register
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a 1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Contact Support</h2>
        {error && (
          <div className="flex items-center bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <FaTimesCircle className="mr-2" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center bg-green-100 text-green-700 p-4 rounded-lg mb-4">
            <FaCheckCircle className="mr-2" />
            <p>{success}</p>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Enter the subject"
            maxLength={MAX_SUBJECT_LENGTH}
          />
          <small className="text-gray-500">{subject.length}/{MAX_SUBJECT_LENGTH}</small>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Enter your message"
            rows="5"
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <small className="text-gray-500">{message.length}/{MAX_MESSAGE_LENGTH}</small>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg transform transition duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Send Message
          <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a 1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Contact;
