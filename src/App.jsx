import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthContext';
import CartProvider from './CartContext';
import Inicio from './components/Inicio';
import InicioProducts from './components/InicioProducts';
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

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/products/*" element={<InicioProducts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Inicio />} />
            </Routes>
            <div className="Content">
              <Routes>
                <Route path="/" element={<><InfoSection /><AfterBefore /><Paso /><Purchase /><Reviews /></>} />
                <Route path="/products" element={<ProductosPage />} />
                <Route path="/products/warzone" element={<ProductWarzone />} />
              </Routes>
            </div>
            <Footer className="Footer" />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
