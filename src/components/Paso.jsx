import React from 'react';
import { useInView } from 'react-intersection-observer';
import image from '../assets/p1.png';
import 'tailwindcss/tailwind.css';

const Paso = () => {
  const steps = [
    {
      number: 1,
      title: 'Compra tu Script',
      description: 'Explora nuestra extensa biblioteca de scripts para juegos y elige el que se ajuste a tus necesidades.',
      buttonText: 'Explorar Scripts',
    },
    {
      number: 2,
      title: 'Descarga al Instante',
      description: 'Después de la compra, puedes descargar el script al instante y empezar a usarlo de inmediato.',
      buttonText: 'Descargar Ahora',
    },
    {
      number: 3,
      title: 'Mejora tu Juego',
      description: 'Integra el script en tu juego y disfruta de las funciones y características mejoradas.',
      buttonText: 'Ver Más',
    },
  ];

  return (
    <div className="relative py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-play">
      <div className="container mx-auto px-8">
        {steps.map((step, index) => (
          <Step key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

const Step = ({ step, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className={`relative mb-16 flex items-center ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'} transform transition duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        background: `linear-gradient(${index % 2 !== 0 ? '225deg' : '135deg'}, rgba(255, 255, 255, 0.1) 25%, transparent 25%)`,
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="w-1/2 flex justify-center items-center">
        <div className="text-center">
          <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-8">
            {step.number}
          </div>
          <img src={image} alt={`Paso ${step.number}`} className="w-64 h-64 object-cover rounded-2xl shadow-2xl transform transition duration-500 hover:scale-110 hover:shadow-3xl" />
        </div>
      </div>
      <div className="w-1/2 text-center px-8">
        <h3 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">{step.title}</h3>
        <p className="text-2xl mb-4">{step.description}</p>
        <div className="border-b-4 border-blue-500 w-1/4 mx-auto mt-4 mb-8"></div>
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-full text-xl font-bold shadow-md transform transition duration-500 hover:scale-105 hover:from-blue-600 hover:to-blue-800">
          {step.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Paso;
