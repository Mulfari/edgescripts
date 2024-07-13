import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Inicio from './components/Inicio';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductosPage from './components/ProductosPage';
import ProductWarzone from './components/ProductWarzone';
import InfoSection from './components/InfoSection';
import Paso from './components/Paso';
import Reviews from './components/Reviews';
import AfterBefore from './components/AfterBefore';
import Purchase from './components/Purchase';
import Login from './components/Login';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail'; // Importar el componente VerifyEmail

const App = () => {
  const getInitialCartItems = () => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const getInitialUser = () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  };

  const [cartItems, setCartItems] = useState(getInitialCartItems);
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error registering:', error);
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Header cartItems={cartItems} removeFromCart={removeFromCart} user={user} handleLogout={handleLogout} />
        <div className="Content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Inicio />
                  <InfoSection />
                  <AfterBefore />
                  <Paso />
                  <Purchase />
                  <Reviews />
                </>
              }
            />
            <Route path="/products" element={<ProductosPage cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route
              path="/products/warzone"
              element={
                <>
                  <Inicio />
                  <ProductWarzone cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
                </>
              }
            />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/register" element={<Register handleRegister={handleRegister} />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </div>
        <Footer className="Footer" />
      </div>
    </Router>
  );
};

export default App;
