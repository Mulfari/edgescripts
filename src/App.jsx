import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider from './AuthContext';
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
import VerifyEmail from './components/VerifyEmail';
import Dashboard from './components/Dashboard';
import TermsAndConditions from './components/TermsAndConditions';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import PasswordReset from './components/PasswordReset';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import Device from './components/Device';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItem = JSON.parse(localStorage.getItem('cartItem'));
    if (savedCartItem) {
      setCartItems([savedCartItem]);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems([product]);
    localStorage.setItem('cartItem', JSON.stringify(product));
  };

  const removeFromCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItem');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header cartItems={cartItems} removeFromCart={removeFromCart} />
          <Routes>
            <Route path="/products/warzone" element={<ProductWarzone addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/support/terms" element={<TermsAndConditions />} />
            <Route path="/support/faq" element={<FAQ />} />
            <Route path="/support/contact" element={<Contact />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/products" element={<Navigate to="/" replace />} />
            <Route path="/device" element={<Device />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
          <div className="Content">
            <Routes>
              <Route path="/" element={<><InfoSection /><AfterBefore /><Paso /><Purchase /><Reviews /></>} />
              <Route path="/products" element={<ProductosPage />} />
            </Routes>
          </div>
          <Footer className="Footer" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
