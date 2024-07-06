// src/components/Explorar.jsx

import React from 'react';
import img1 from '../assets/image1.webp'; // Reemplaza con la ruta correcta de tu imagen
import img2 from '../assets/image2.webp'; // Reemplaza con la ruta correcta de tu imagen

const Explorar = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Venta de Scripts</h2>
          <p className="text-gray-700 text-lg mb-8">
            Bienvenidos a nuestra página de venta de scripts para juegos en línea. Aquí encontrarás la mejor selección de scripts para mejorar tu experiencia de juego.
          </p>
          <button className="bg-transparent border-2 border-black text-black py-2 px-4 rounded">Explorar</button>
        </div>
        <div className="md:w-1/2 flex flex-col md:flex-row items-center md:justify-around mt-8 md:mt-0">
          <img src={img1} alt="Imagen 1" className="w-full md:w-1/2 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
          <img src={img2} alt="Imagen 2" className="w-full md:w-1/2 h-48 object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Explorar;
