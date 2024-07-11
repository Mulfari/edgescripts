import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Products from './Products';
import Inicio from './Inicio';

const ProductosPage = ({ cartItems, addToCart, removeFromCart }) => {
  const { category } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <Inicio />
      <Products category={category || 'Todos'} addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default ProductosPage;
