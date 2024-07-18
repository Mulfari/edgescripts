import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import s1 from '../assets/s1.png'; // Asegúrate de que la ruta sea correcta
import Stars from './Stars'; // Importa el componente Stars

const Inicio = () => {
  return (
    <div className="relative">
      <Stars />
      <section className="bg-gradient-radial from-purple-400 via-pink-500 to-red-500 pt-16 relative z-20">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid lg:grid-cols-12 lg:gap-8 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
                Payments tool for software companies
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl">
                From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Speak to Sales
              </a> 
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
    </div>
  );
};

export default Inicio;
