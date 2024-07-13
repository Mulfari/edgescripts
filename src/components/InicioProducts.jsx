import React, { useState, useEffect } from 'react';
import i1 from '../assets/i1.jpg';

const InicioProducts = () => {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const imageElement = document.getElementById('inicioProducts');
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setIsReduced(true);
        } else {
          setIsReduced(false);
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
      className="relative w-screen h-[15.6rem] bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${i1})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl font-bold" style={{ fontFamily: '"Press Start 2P", cursive' }}>Products</h1>
      </div>
    </div>
  );
};

export default InicioProducts;
