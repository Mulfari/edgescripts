import React from 'react';
import { useParams } from 'react-router-dom';
import Products from './Products';

const ProductosPage = ({ cartItems, addToCart, removeFromCart }) => {
  const { category } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <Products category={category || 'Todos'} addToCart={addToCart} />
    </div>
  );
};

export default ProductosPage;
