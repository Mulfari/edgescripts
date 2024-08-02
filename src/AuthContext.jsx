import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCsrfToken } from './utils/Utils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Importar y utilizar useNavigate

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.brand === null || parsedUser.dpi === null || parsedUser.sensitivity === null) {
        navigate('/device');
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  const login = async (email, password, callback) => {
    const csrfToken = await getCsrfToken(); // Obtener el token CSRF
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken, // Incluir el token CSRF
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { ok: false, error: errorData };
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      if (callback) callback(data.user);

      if (data.user.brand === null || data.user.dpi === null || data.user.sensitivity === null) {
        navigate('/device');
      } else {
        navigate('/');
      }

      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: 'An error occurred during login. Please try again later.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Asegurarse de redirigir al login en logout
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const data = await response.json();
        setUser(data.user);

        if (data.user.brand === null || data.user.dpi === null || data.user.sensitivity === null) {
          navigate('/device');
        } else {
          navigate('/');
        }
      } catch (error) {
        logout();
      }
    }
  };

  const updateUser = async (id, fields) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, ...fields }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return false;
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
