import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="Content">
            <Routes>
              <Route path="/" element={<><Inicio /><InfoSection /><AfterBefore /><Paso /><Purchase /><Reviews /></>} />
              <Route path="/products" element={<ProductosPage />} />
              <Route path="/products/warzone" element={<><Inicio /><ProductWarzone /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
          </div>
          <Footer className="Footer" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
