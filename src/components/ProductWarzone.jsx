import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import ProductCard from './ProductCard';
import productImage from '../assets/Categorias/wzlogo.png';

const productos = [
  { id: 1, imagen: productImage, descripcion: 'COD Warzone 3 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Warzone', popularidad: 5, nuevo: true, reviews: 10, detalles: 'Detalles del producto', caracteristicas: ['Característica 1', 'Característica 2'] },
  // Otros productos de Warzone...
];

const ProductWarzone = () => {
  const category = "Warzone";
  const productsInCategory = productos.filter(product => product.categoria === category);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        {productsInCategory.map(productDetail => (
          <ProductCard key={productDetail.id} productDetail={productDetail} addToCart={addToCart} removeFromCart={removeFromCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductWarzone;
