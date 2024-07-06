// src/components/ProductDetail.js

import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import productImage from '../assets/Categorias/wzlogo.png';

const productos = [
  { id: 1, imagen: productImage, descripcion: 'COD Warzone 3 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Warzone', popularidad: 5, nuevo: true, reviews: 10, detalles: 'Detalles del producto', caracteristicas: ['Característica 1', 'Característica 2'] },
  { id: 2, imagen: productImage, descripcion: 'Apex Legends No Recoil Macro', precioOriginal: '', precioDescuento: '14.99 $', descuento: '', categoria: 'Apex Legends', popularidad: 4, nuevo: false, reviews: 8, detalles: 'Detalles del producto', caracteristicas: ['Característica 1'] },
  { id: 3, imagen: productImage, descripcion: 'PUBG No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '25%', categoria: 'PUBG', popularidad: 3, nuevo: false, reviews: 5 },
  { id: 4, imagen: productImage, descripcion: 'Call Of Duty Black Ops 3 Macro', precioOriginal: '', precioDescuento: '9.99 $', descuento: '', categoria: 'Call of Duty', popularidad: 4, nuevo: true, reviews: 12 },
  { id: 5, imagen: productImage, descripcion: 'Call Of Duty Modern Warfare', precioOriginal: '24.99 $', precioDescuento: '18.99 $', descuento: '24%', categoria: 'Call of Duty', popularidad: 5, nuevo: false, reviews: 15 },
  { id: 6, imagen: productImage, descripcion: 'Valorant No Recoil Macro', precioOriginal: '', precioDescuento: '14.99 $', descuento: '', categoria: 'Valorant', popularidad: 4, nuevo: false, reviews: 8 },
  { id: 7, imagen: productImage, descripcion: 'COD Modern Warfare 2 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Call of Duty', popularidad: 3, nuevo: true, reviews: 10 },
  { id: 8, imagen: productImage, descripcion: 'Battlefield 2042 No Recoil Macro', precioOriginal: '', precioDescuento: '18.99 $', descuento: '', categoria: 'Battlefield', popularidad: 5, nuevo: false, reviews: 7 },
  { id: 9, imagen: productImage, descripcion: 'CS2 No Recoil Macro', precioOriginal: '', precioDescuento: '14.99 $', descuento: '', categoria: 'CS:GO', popularidad: 2, nuevo: false, reviews: 3 },
];

const Breadcrumb = ({ category }) => (
  <nav className="text-gray-600 text-sm mb-4">
    <a href="/" className="hover:text-gray-800">Home</a> &gt;
    <a href="/products" className="hover:text-gray-800">Products</a> &gt;
    <span className="text-gray-800"> {category}</span>
  </nav>
);

Breadcrumb.propTypes = {
  category: PropTypes.string.isRequired,
};

const ProductCard = ({ productDetail }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <div className="flex flex-col lg:flex-row">
      <div className="flex-shrink-0 relative">
        <img src={productDetail.imagen} alt={productDetail.descripcion} className="w-full h-64 object-cover rounded-md" />
        {productDetail.descuento && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            SALE
          </span>
        )}
      </div>
      <div className="mt-4 lg:mt-0 lg:ml-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{productDetail.descripcion}</h1>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < productDetail.popularidad ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </span>
          <span className="text-gray-600 ml-2">{productDetail.reviews} customer reviews</span>
        </div>
        <div className="mb-4">
          {productDetail.precioOriginal && (
            <p className="text-gray-500 line-through text-lg">{productDetail.precioOriginal}</p>
          )}
          <p className="text-3xl font-bold text-gray-900">{productDetail.precioDescuento}</p>
        </div>
        <ProductDetails details={productDetail.detalles} features={productDetail.caracteristicas} />
        <ProductActions />
      </div>
    </div>
    <ProductDescription />
    <ProductReviews reviews={productDetail.reviews} />
  </div>
);

ProductCard.propTypes = {
  productDetail: PropTypes.shape({
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precioOriginal: PropTypes.string,
    precioDescuento: PropTypes.string.isRequired,
    descuento: PropTypes.string,
    categoria: PropTypes.string.isRequired,
    popularidad: PropTypes.number.isRequired,
    nuevo: PropTypes.bool.isRequired,
    reviews: PropTypes.number.isRequired,
    detalles: PropTypes.string,
    caracteristicas: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const ProductDetails = ({ details, features }) => (
  <div className="border-t border-gray-200 mt-6 pt-4">
    <h2 className="text-xl font-bold text-gray-900 mb-2">INFO</h2>
    <p className="text-gray-700 mb-4">{details}</p>
    <ul className="list-disc list-inside text-gray-700">
      {features && features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

ProductDetails.propTypes = {
  details: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
};

const ProductActions = () => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
    <div className="mb-4">
      <label className="block text-gray-700">MOUSE:</label>
      <select className="block w-full mt-1 p-2 border border-gray-300 rounded-md">
        <option>Choose an option</option>
      </select>
    </div>
    <div className="flex items-center">
      <input type="number" className="w-16 p-2 border border-gray-300 rounded-md mr-4" defaultValue="1" />
      <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">Add to Cart</button>
    </div>
  </div>
);

const ProductDescription = () => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">DESCRIPTION</h3>
    <p className="text-gray-700">Detailed description of the product goes here.</p>
  </div>
);

const ProductReviews = ({ reviews }) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">REVIEWS ({reviews})</h3>
    <p className="text-gray-700">Customer reviews will be displayed here.</p>
  </div>
);

ProductReviews.propTypes = {
  reviews: PropTypes.number.isRequired,
};

const ProductDetail = () => {
  const { category } = useParams();
  const productsInCategory = productos.filter(product => product.categoria.toLowerCase() === category.toLowerCase());

  if (productsInCategory.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb category={category} />
          <div className="text-center text-gray-700 text-lg mt-8">No products found in this category.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <Breadcrumb category={category} />
        {productsInCategory.map(productDetail => (
          <ProductCard key={productDetail.id} productDetail={productDetail} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
