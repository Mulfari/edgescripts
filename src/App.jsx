import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Inicio from './components/Inicio';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductosPage from './components/ProductosPage';
import ProductWarzone from './components/ProductWarzone';  // Importa el nuevo componente
import InfoSection from './components/InfoSection';
import Paso from './components/Paso';
import Reviews from './components/Reviews';
import AfterBefore from './components/AfterBefore';
import Purchase from './components/Purchase';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
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
        <Route path="/products" element={<ProductosPage />} />
        <Route
          path="/products/warzone"
          element={
            <>
              <Header />
              <Inicio />
              <ProductWarzone />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
