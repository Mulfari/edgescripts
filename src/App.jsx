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
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const handleLogin = (email, password) => {
    const isValidUser = email === 'test@test.com' && password === 'password';
    if (isValidUser) {
      const user = { email };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const handleRegister = (email, password) => {
    const user = { email };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} user={user} handleLogout={handleLogout} />
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
              <Footer />
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
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register handleRegister={handleRegister} />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> {/* Añadir la ruta VerifyEmail */}
      </Routes>
    </Router>
  );
};

export default App;
