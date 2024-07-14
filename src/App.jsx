import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthContext';
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
import UserDashboard from './components/UserDashboard'; // Importa el componente Dashboard

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header cartItems={cartItems} removeFromCart={removeFromCart} />
          <Routes>
            <Route path="/products/*" element={<InicioProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/dashboard" element={<UserDashboard />} /> {/* Añade la ruta del Dashboard */}
            <Route path="*" element={<Inicio />} />
          </Routes>
          <div className="Content">
            <Routes>
              <Route path="/" element={<><InfoSection /><AfterBefore /><Paso /><Purchase /><Reviews /></>} />
              <Route path="/products" element={<ProductosPage />} />
              <Route path="/products/warzone" element={<ProductWarzone addToCart={addToCart} removeFromCart={removeFromCart} />} />
            </Routes>
          </div>
          <Footer className="Footer" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
