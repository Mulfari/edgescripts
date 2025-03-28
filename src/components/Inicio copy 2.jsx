import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import s1 from '../assets/s1.png'; // Asegúrate de que la ruta sea correcta
import Stars from './Stars'; // Importa el componente Stars

const Inicio = () => {
  return (
    <section className="relative bg-gradient-to-r from-black via-gray-800 to-black pt-16">
      <Stars width={window.innerWidth} height={window.innerHeight} />
      <div className="relative z-20 container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7" style={{ marginTop: '-3%' }}>
            <h1 className="max-w-2xl mb-6 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-white whitespace-nowrap">
              Welcome to EdgeScripts
            </h1>
            <div style={{ marginLeft: '3%' }}>
              <p className="max-w-3xl mb-1 font-light text-gray-200 md:text-xl lg:text-2xl">
                Your ultimate source for scripts designed for online games.
              </p>
              <p className="max-w-3xl mb-6 font-light text-gray-200 md:text-xl lg:text-2xl">
                Elevate your gameplay with our cutting-edge solutions.
              </p>
            </div>
            <div className="flex space-x-6" style={{ marginLeft: '2%', marginTop: '2%' }}>
              <a 
                href="/register" 
                className="inline-flex items-center justify-center px-12 py-3 text-lg font-medium text-center text-white rounded-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg transform transition duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Register
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a 1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
            <LazyLoadImage
              src={s1}
              alt="mockup"
              effect="blur"
              className="max-w-full h-auto"
            />
          </div>                
        </div>
      </div>
    </section>
  );
};

export default Inicio;
