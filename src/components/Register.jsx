import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8;
const getPasswordStrength = (password) => zxcvbn(password).score;
const Spinner = () => <div className="loader">Loading...</div>;

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
      setError('Password must be at least 8 characters long');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      {success ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform duration-500 ease-in-out">
          <FaCheckCircle className="text-green-500 text-5xl mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Registration Successful</h2>
          <p className="text-green-500 mb-4">Please check your email.</p>
          <p className="text-gray-700">You will be redirected in <span className="text-red-500 font-bold">{countdown}</span> seconds...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
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
              />
              <button
                type="button"
                className="ml-2 text-gray-700"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-strength mt-2">
              <meter value={getPasswordStrength(password)} max="4"></meter>
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
              />
              <button
                type="button"
                className="ml-2 text-gray-700"
                onClick={toggleShowConfirmPassword}
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
              />
              Subscribe to Newsletter
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Register'}
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
