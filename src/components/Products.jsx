import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productImage from '../assets/Categorias/wzlogo.png'; // Reemplaza con la ruta correcta de tu imagen
import { FaTag, FaStar, FaSearch } from 'react-icons/fa';

const productos = [
  { id: 1, imagen: productImage, descripcion: 'COD Warzone 3 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Warzone', popularidad: 5, nuevo: true },
  { id: 2, imagen: productImage, descripcion: 'Apex Legends No Recoil Macro', precioOriginal: '', precioDescuento: '14.99 $', descuento: '', categoria: 'Apex Legends', popularidad: 4, nuevo: false },
  { id: 3, imagen: productImage, descripcion: 'PUBG No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '25%', categoria: 'PUBG', popularidad: 3, nuevo: false },
  { id: 4, imagen: productImage, descripcion: 'Call Of Duty Black Ops 3 Macro', precioOriginal: '', precioDescuento: '9.99 $', descuento: '', categoria: 'Call of Duty', popularidad: 4, nuevo: true },
  { id: 5, imagen: productImage, descripcion: 'Call Of Duty Modern Warfare', precioOriginal: '24.99 $', precioDescuento: '18.99 $', descuento: '24%', categoria: 'Call of Duty', popularidad: 5, nuevo: false },
  { id: 6, imagen: productImage, descripcion: 'Valorant No Recoil Macro', precioOriginal: '', precioDescuento: '14.99 $', descuento: '', categoria: 'Valorant', popularidad: 4, nuevo: false },
  { id: 7, imagen: productImage, descripcion: 'COD Modern Warfare 2 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Call of Duty', popularidad: 3, nuevo: true },
  { id: 8, imagen: productImage, descripcion: 'Battlefield 2042 No Recoil Macro', precioOriginal: '', precioDescuento: '18.99 $', descuento: '', categoria: 'Battlefield', popularidad: 5, nuevo: false },
  { id: 9, imagen: productImage, descripcion: 'CS2 No Recoil Macro', precioOriginal: '', precioDescuento: '14.99 $', descuento: '', categoria: 'CS:GO', popularidad: 2, nuevo: false },
];

const categorias = ['Todos', 'Warzone', 'Apex Legends', 'PUBG', 'Call of Duty', 'Valorant', 'Battlefield', 'CS:GO'];

const Products = ({ category }) => {
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simular tiempo de carga
    return () => clearTimeout(timer);
  }, [category, currentPage]);

  const filtrarProductos = (productos, busqueda, categoria) => {
    return productos.filter(producto => 
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoria === 'Todos' || producto.categoria.toLowerCase() === categoria.toLowerCase())
    );
  };

  const productosFiltrados = filtrarProductos(productos, busqueda, category);

  // Obtener productos actuales para paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderProducts = () => {
    if (loading) {
      return <div className="loader"></div>;
    }
    
    return currentProducts.map((producto) => (
      <Link 
        key={producto.id}
        to={`/products/${producto.categoria.toLowerCase()}`}
        className="bg-gray-900 p-6 rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-lg relative overflow-hidden flex flex-col justify-between group animate-fadeIn"
        style={{ minHeight: '400px' }}
      >
        <div className="relative flex-1">
          {producto.descuento && (
            <span className="absolute top-2 left-2 bg-pink-400 text-white text-xs font-bold rounded-full px-2 py-1">
              -{producto.descuento}
            </span>
          )}
          {producto.nuevo && (
            <span className="absolute top-2 right-2 bg-teal-400 text-white text-xs font-bold rounded-full px-2 py-1">
              Nuevo
            </span>
          )}
          <img src={producto.imagen} alt={producto.descripcion} className="w-full h-56 object-cover rounded-t-2xl shadow-md" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-center px-4">{producto.descripcion}</p>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">{producto.categoria}</p>
            <h3 className="text-lg font-bold mb-2 text-white">{producto.descripcion}</h3>
            <div className="flex items-center mb-2">
              <FaTag className="text-blue-400 mr-1" />
              {producto.precioOriginal && (
                <p className="text-gray-400 line-through mr-2">{producto.precioOriginal}</p>
              )}
              <p className="text-xl font-bold text-blue-400">{producto.precioDescuento}</p>
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < producto.popularidad ? "text-yellow-400" : "text-gray-600"} />
              ))}
            </div>
          </div>
          <div className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-transform duration-300 transform group-hover:scale-105 text-center">
            View Details
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen py-6 relative">
      {loading && <div className="loader"></div>}
      <div className={`container mx-auto px-4 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex flex-wrap justify-between items-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg">
          <nav className="flex items-center space-x-2 text-white">
            <Link to="/" className="text-blue-200 hover:underline">Home</Link>
            <span>&gt;</span>
            <span className="text-gray-200">Products</span>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="p-2 rounded-lg bg-gray-700 text-gray-200 pl-10"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mb-6 space-x-2 category-buttons">
          {categorias.map((cat) => (
            <Link
              key={cat}
              to={`/products/${cat.toLowerCase()}`}
              className={`py-2 px-4 rounded-full text-white ${
                category === cat ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
              } transition-colors duration-300`}
            >
              {cat}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderProducts()}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(productosFiltrados.length / productsPerPage) }, (_, i) => (
            <button 
              key={i + 1} 
              onClick={() => paginate(i + 1)} 
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
