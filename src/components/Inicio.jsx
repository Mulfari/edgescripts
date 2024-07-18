import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import i1 from '../assets/i1.jpg';
import s1 from '../assets/s1.png';

const Inicio = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoaded(true);
    };

    const imageElement = document.getElementById('characterImage');
    if (imageElement && imageElement.complete) {
      handleImageLoad();
    } else if (imageElement) {
      imageElement.addEventListener('load', handleImageLoad);
      return () => {
        imageElement.removeEventListener('load', handleImageLoad);
      };
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-fixed bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url(${i1})` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full text-center lg:text-left text-white p-6 lg:p-16">
        <div className="flex flex-col items-center lg:items-start lg:w-1/2 mb-8 lg:mb-0">
          <div className="mb-4">
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-play">
              Welcome to EdgeScripts, your ultimate source for top-tier gaming scripts designed for online games. Elevate your gameplay with our cutting-edge solutions.
            </p>
          </div>
          <div className="text-lg md:text-xl lg:text-2xl font-bold mb-4 font-press-start text-blue-500">
            <Typewriter
              words={['Unlock your gaming potential']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            id="characterImage"
            src={s1}
            alt="Character"
            className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: '300px', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
