import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const csrfToken = await getCsrfToken(); // Obtener el token CSRF

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'CSRF-Token': csrfToken, // Incluir el token CSRF
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-transform transform hover:scale-105">
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
            rows="5"
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
