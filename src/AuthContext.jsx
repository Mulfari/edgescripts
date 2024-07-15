import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password, cartItems) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error logging in:', errorData);
        return false;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      // Update user details if necessary
      const { brand, dpi, sensibilidad } = data.user;
      const product = cartItems[0];

      if (!brand || !dpi || !sensibilidad) {
        const updatedUser = {
          ...data.user,
          brand: brand || product.brand,
          dpi: dpi || product.dpi,
          sensibilidad: sensibilidad || product.sensibilidad,
        };

        const updateResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
          },
          body: JSON.stringify(updatedUser),
        });

        if (updateResponse.ok) {
          const updatedData = await updateResponse.json();
          localStorage.setItem('user', JSON.stringify(updatedData.user));
          setUser(updatedData.user);
        }
      }

      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
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
      } catch (error) {
        console.error('Error verifying token:', error);
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
        console.error('Error updating user:', errorData);
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
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
