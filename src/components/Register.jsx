import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8 && password.length <= 32;
const getPasswordStrength = (password) => {
  const score = zxcvbn(password).score;
  return score > 2 ? 4 : score; // Normal passwords will appear stronger
};

const getMeterSegments = (score) => {
  switch (score) {
    case 1:
      return ['bg-green-500', 'bg-gray-300', 'bg-gray-300']; // Decente
    case 2:
      return ['bg-yellow-500', 'bg-yellow-500', 'bg-gray-300']; // Medianamente difícil
    case 3:
    case 4:
      return ['bg-red-500', 'bg-red-500', 'bg-red-500']; // Fuerte
    default:
      return ['bg-gray-300', 'bg-gray-300', 'bg-gray-300']; // Inicial
  }
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dob, setDob] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailBlurred && email && !isValidEmail(email)) {
      setError('Invalid email format');
    } else {
      setError('');
    }
  }, [email, emailBlurred]);

  useEffect(() => {
    if (passwordBlurred && password && !isValidPassword(password)) {
      setError('Password must be between 8 and 32 characters long');
    } else {
      setError('');
    }
  }, [password, passwordBlurred]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      setError('You must be at least 18 years old to register');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
          dateOfBirth: dob,
          acceptedTerms: acceptTerms,
          subscribedToNewsletter: subscribeNewsletter
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDob('');
        setAcceptTerms(false);
        setSubscribeNewsletter(false);
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to register');
        setFailedAttempts((prev) => prev + 1);
      }
    } catch (error) {
      setError(error.message.includes('NetworkError') ? 'Network error, please try again later' : 'An error occurred');
    } finally {
      setIsLoading(false);
    }

    if (failedAttempts >= 3) {
      setError('Too many failed attempts, please try again later');
    }
  };

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        navigate('/login');
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [success, navigate]);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      {success ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform duration-500 ease-in-out">
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Registration Successful</h2>
          <p className="text-green-500 mb-4">Please check your email to confirm your account.</p>
          <p className="text-gray-700">You will be redirected in <span className="text-red-500 font-bold">{countdown}</span> seconds...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative ${isLoading ? 'opacity-50' : ''}`}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Register</h2>
          {error && (
            <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailBlurred(true)}
              required
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              min="1900-01-01"
              max={maxDate} // Limitar hasta la fecha actual
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordBlurred(true)}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="ml-2 text-gray-700"
                onClick={toggleShowPassword}
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-strength mt-2 w-full h-2 rounded-full overflow-hidden flex">
              {getMeterSegments(getPasswordStrength(password)).map((color, index) => (
                <div key={index} className={`flex-1 ${color}`}></div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="ml-2 text-gray-700"
                onClick={toggleShowConfirmPassword}
                disabled={isLoading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
                disabled={isLoading}
              />
              Accept <Link to="/support/terms" className="text-blue-600">Terms and Conditions</Link>
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={subscribeNewsletter}
                onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                disabled={isLoading}
              />
              Subscribe to Newsletter
            </label>
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              'Register'
            )}
          </button>
          <p className="mt-6 text-center text-gray-700">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
