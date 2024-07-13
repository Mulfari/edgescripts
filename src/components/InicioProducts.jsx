import React, { useState, useEffect } from 'react';
import i1 from '../assets/i1.jpg';

const InicioProducts = () => {
  const [isReduced, setIsReduced] = useState(false);
  const [leftOffset, setLeftOffset] = useState('28%');

  useEffect(() => {
    const handleScroll = () => {
      const imageElement = document.getElementById('inicioProducts');
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setIsReduced(true);
          const newLeftOffset = Math.min(33, 28 + (window.innerHeight - rect.top) * 0.01);
          setLeftOffset(`${newLeftOffset}%`);
        } else {
          setIsReduced(false);
          setLeftOffset('28%');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id="inicioProducts"
      className="relative w-screen h-[17.16rem] bg-fixed bg-center bg-cover overflow-hidden flex items-center"
      style={{ backgroundImage: `url(${i1})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 md:px-8 lg:px-16">
        <h1 
          className="absolute font-bold titulo-dinamico"
          style={{ 
            fontFamily: '"Press Start 2P", cursive', 
            left: leftOffset,
            top: '65%', 
            transform: 'translate(-50%, -50%)', 
            color: '#d3d3d3', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: '3rem' 
          }}
        >
          Products
        </h1>
      </div>
    </div>
  );
};

export default InicioProducts;
