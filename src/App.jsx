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

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
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

  return (
    <Router>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
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
      </Routes>
    </Router>
  );
};

export default App;