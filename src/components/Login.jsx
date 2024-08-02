import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { getCsrfToken } from '../utils/Utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirigir a la página de inicio si el usuario está logueado
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const csrfToken = await getCsrfToken(); // Obtener el token CSRF

      const response = await login(email, password);

      if (response.ok) {
        navigate('/device'); // Redirigir a /device después de iniciar sesión
      } else {
        setError(response.error.error || response.error);
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const resendVerificationEmail = async () => {
    setResendMessage('');
    setResendError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/resend-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage(data.message);
      } else {
        setResendError(data.error);
      }
    } catch (error) {
      setResendError('An error occurred while resending the verification email. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10" />
        )}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Login</h2>
        {error && (
          <div className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
            <p>{error}</p>
            {error === 'Please verify your email address to log in.' && (
              <p className="mt-2 text-gray-700">
                Email not confirmed. Please check your email to verify your account. <Link to="#" onClick={resendVerificationEmail} className="text-blue-600 font-semibold">Resend verification email</Link>
              </p>
            )}
          </div>
        )}
        {resendMessage && (
          <p className="text-green-500 bg-green-100 p-3 rounded-lg mb-4 flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> {resendMessage}
          </p>
        )}
        {resendError && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{resendError}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              className="block w-4/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              className="ml-3 text-gray-700 border border-gray-300 rounded-lg p-3 focus:outline-none"
              onClick={toggleShowPassword}
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            'Login'
          )}
        </button>
        <div className="mt-8 text-center text-lg space-y-3">
          <p className="text-gray-700">
            Forgot your password? <Link to="/password-reset" className="text-blue-600 font-semibold">Reset it here</Link>
          </p>
          <p className="text-gray-700">
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
