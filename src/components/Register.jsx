import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

// Validación del formato del correo electrónico
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validación de la fuerza de la contraseña
const isValidPassword = (password) => {
  const minLength = 8;
  return password.length >= minLength;
};

// Indicador de fuerza de la contraseña
const getPasswordStrength = (password) => {
  const result = zxcvbn(password);
  return result.score;
};

// Spinner
const Spinner = () => <div className="loader">Loading...</div>;

// Componentes de entrada reutilizables
const TextInput = ({ id, label, type, value, onChange, onBlur, placeholder, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2" htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required
      placeholder={placeholder}
      aria-describedby={`${id}Help`}
    />
    {error && <p id={`${id}Help`} className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
  </div>
);

const CheckboxInput = ({ id, label, checked, onChange, link }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="mr-2"
        checked={checked}
        onChange={onChange}
        required
      />
      {label} {link && <Link to={link} className="text-blue-600">Terms and Conditions</Link>}
    </label>
  </div>
);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Validación en tiempo real del correo electrónico
  useEffect(() => {
    if (emailBlurred && email && !isValidEmail(email)) {
      setError('Invalid email format');
    } else {
      setError('');
    }
  }, [email, emailBlurred]);

  // Validación en tiempo real de la contraseña
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

    // Validar edad y términos
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

    // Enviar solicitud de registro
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
      if (error.message.includes('NetworkError')) {
        setError('Network error, please try again later');
      } else {
        setError('An error occurred');
      }
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
          <TextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailBlurred(true)}
            placeholder="Enter your email"
            error={error}
          />
          <TextInput
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordBlurred(true)}
            placeholder="Enter your password"
            error={error}
          />
          <div className="relative flex items-center mb-4">
            <button
              type="button"
              className="ml-2 text-gray-700"
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password-strength mt-2 mb-4">
            <meter value={getPasswordStrength(password)} max="4"></meter>
          </div>
          <TextInput
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            error={error}
          />
          <div className="relative flex items-center mb-4">
            <button
              type="button"
              className="ml-2 text-gray-700"
              onClick={toggleShowConfirmPassword}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <TextInput
            id="dob"
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter your date of birth"
            error={error}
          />
          <CheckboxInput
            id="acceptTerms"
            label="Accept"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            link="/support/terms"
          />
          <CheckboxInput
            id="subscribeNewsletter"
            label="Subscribe to Newsletter"
            checked={subscribeNewsletter}
            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
          />
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
