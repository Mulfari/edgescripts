import React, { useState } from 'react';
import productImage from '../assets/image1.webp'; // Reemplaza con la ruta correcta de tu imagen
import wzLogo from '../assets/Categorias/wzlogo.png'; // Reemplaza con la ruta correcta de tu logo de Warzone
import valorantLogo from '../assets/Categorias/valorantlogo.jpg'; // Reemplaza con la ruta correcta de tu logo de Valorant
import csgoLogo from '../assets/Categorias/csgologo.jpg'; // Reemplaza con la ruta correcta de tu logo de Counter-Strike
import fortniteLogo from '../assets/Categorias/fortnitelogo.jpg'; // Reemplaza con la ruta correcta de tu logo de Fortnite
import xdefiantLogo from '../assets/Categorias/xdefiantlogo.png'; // Reemplaza con la ruta correcta de tu logo de XDefiant
import theFinalsLogo from '../assets/Categorias/thefinalslogo.webp'; // Reemplaza con la ruta correcta de tu logo de The Finals

const productos = [
  {
    id: 1,
    imagen: productImage,
    descripcion: 'Descripción del Producto 1 - Warzone',
    precio: '$10.00',
    categoria: 'Warzone',
  },
  {
    id: 2,
    imagen: productImage,
    descripcion: 'Descripción del Producto 2 - Valorant',
    precio: '$20.00',
    categoria: 'Valorant',
  },
  {
    id: 3,
    imagen: productImage,
    descripcion: 'Descripción del Producto 3 - Counter-Strike',
    precio: '$30.00',
    categoria: 'Counter-Strike',
  },
  {
    id: 4,
    imagen: productImage,
    descripcion: 'Descripción del Producto 4 - Warzone',
    precio: '$40.00',
    categoria: 'Warzone',
  },
  {
    id: 5,
    imagen: productImage,
    descripcion: 'Descripción del Producto 5 - Fortnite',
    precio: '$50.00',
    categoria: 'Fortnite',
  },
  {
    id: 6,
    imagen: productImage,
    descripcion: 'Descripción del Producto 6 - XDefiant',
    precio: '$60.00',
    categoria: 'XDefiant',
  },
  {
    id: 7,
    imagen: productImage,
    descripcion: 'Descripción del Producto 7 - Fortnite',
    precio: '$70.00',
    categoria: 'Fortnite',
  },
  {
    id: 8,
    imagen: productImage,
    descripcion: 'Descripción del Producto 8 - XDefiant',
    precio: '$80.00',
    categoria: 'XDefiant',
  },
  {
    id: 9,
    imagen: productImage,
    descripcion: 'Descripción del Producto 9 - Valorant',
    precio: '$90.00',
    categoria: 'Valorant',
  },
];

const Products = () => {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const filteredProducts = productos.filter(producto => 
    (categoria === 'Todos' || producto.categoria === categoria) &&
    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderProducts = () => {
    if (categoria === 'The Finals') {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="bg-gray-800 text-white p-20 rounded-lg shadow-lg max-w-2xl text-center">
            <h2 className="text-5xl font-bold mb-4">Coming Soon</h2>
            <p className="text-2xl">Pronto tendremos productos para este juego. ¡Mantente al tanto!</p>
          </div>
        </div>
      );
    }

    return filteredProducts.map((producto) => (
      <div key={producto.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ minHeight: '32rem' }}>
        <img src={producto.imagen} alt={producto.descripcion} className="w-full h-64 object-cover mb-4 rounded-lg" />
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{producto.descripcion}</h3>
        <p className="text-xl font-bold text-gray-600">{producto.precio}</p>
        <button className="btn-primary">
          Añadir al Carrito
        </button>
      </div>
    ));
  };

  // Ajustamos la altura de las tarjetas y de la caja contenedora
  const cardHeight = 32; // Ajustamos la altura a 32rem por tarjeta
  const totalHeight = cardHeight * 3; // Altura para 3 filas de tarjetas

  return (
    <div className="flex min-h-screen bg-green-900">
      {/* Barra lateral de categorías */}
      <aside className="w-1/4 p-6 bg-gray-800 text-white min-h-screen">
        <div>
          {/* Buscador */}
          <div className="mb-4 p-4 rounded-xl bg-gray-700">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-2 rounded-lg bg-gray-600 text-white"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="p-4 rounded-xl bg-gray-700">
            <h2 className="text-2xl font-bold mb-4">Categorías</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCategoria('Todos')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'Todos' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={productImage} alt="Todos" className="w-6 h-6 mr-2 rounded-full" /> {/* Imagen genérica para "Todos" */}
                  Todos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCategoria('Warzone')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'Warzone' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={wzLogo} alt="Warzone" className="w-6 h-6 mr-2 rounded-full" />
                  Warzone
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCategoria('Valorant')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'Valorant' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={valorantLogo} alt="Valorant" className="w-6 h-6 mr-2 rounded-full" />
                  Valorant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCategoria('Counter-Strike')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'Counter-Strike' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={csgoLogo} alt="Counter-Strike" className="w-6 h-6 mr-2 rounded-full" />
                  Counter-Strike
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCategoria('Fortnite')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'Fortnite' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={fortniteLogo} alt="Fortnite" className="w-6 h-6 mr-2 rounded-full" />
                  Fortnite
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCategoria('XDefiant')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'XDefiant' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={xdefiantLogo} alt="XDefiant" className="w-6 h-6 mr-2 rounded-full" />
                  XDefiant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCategoria('The Finals')} 
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors flex items-center ${categoria === 'The Finals' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
                >
                  <img src={theFinalsLogo} alt="The Finals" className="w-6 h-6 mr-2 rounded-full" />
                  The Finals
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-gray-700">
          <h2 className="text-xl font-bold mb-2">Información Adicional</h2>
          <p className="text-gray-300">Aquí puedes agregar alguna información adicional, enlaces o cualquier otro contenido que desees mostrar.</p>
        </div>
      </aside>

      {/* Sección de productos */}
      <div className="flex-1 p-6 bg-gray-800">
        <div className="p-4 rounded-xl bg-gray-700" style={{ minHeight: `${totalHeight}rem` }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
