import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import i1 from '../assets/i1.jpg';
import s1 from '../assets/s1.png';

const Inicio = () => {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const imageElement = document.getElementById('characterImage');
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
      className="relative w-full h-[39rem] md:h-[19.5rem] lg:h-[39rem] bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${i1})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className={`relative z-10 flex flex-col items-start justify-center h-full text-left text-white p-6 md:px-20 lg:px-32 ${isReduced ? 'animate-moveLeft' : 'animate-moveRight'}`} style={{ maxWidth: '70%' }}>
        <div className="mt-16 mb-6">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed font-play">
            Welcome to EdgeScripts, your ultimate source for top-tier gaming scripts designed for online games. Elevate your gameplay with our cutting-edge solutions.
          </p>
        </div>
        <div className="mt-6 md:mt-8 lg:mt-10">
          <div style={{ height: '3rem', width: '100%' }}>
            <h1 className="text-base md:text-lg lg:text-xl font-bold mb-4 whitespace-nowrap overflow-visible text-clip font-press-start text-blue-500">
              <Typewriter
                words={['Unlock your gaming potential']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
        </div>
      </div>
      <img
        id="characterImage"
        src={s1}
        alt="Character"
        className="hidden xl:block absolute bottom-10 right-8 md:right-20 lg:right-32 z-20 animate-fadeInUp"
        style={{ width: '30vw', height: 'auto', maxWidth: '600px' }}
      />
    </div>
  );
};

export default Inicio;
