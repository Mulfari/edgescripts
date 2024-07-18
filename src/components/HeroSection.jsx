// src/components/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">EdgeScripts</h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8">Los mejores scripts para juegos en línea</p>
        <a 
          href="#productos" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Ver Productos
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
