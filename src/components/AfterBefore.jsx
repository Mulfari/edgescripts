import React from 'react';
import { useInView } from 'react-intersection-observer';
import beforeImage from '../assets/before.jpg';  // Asegúrate de tener una imagen para "antes"
import afterImage from '../assets/after.jpg';    // Asegúrate de tener una imagen para "después"
import 'tailwindcss/tailwind.css'; // Asegúrate de tener TailwindCSS configurado

const AfterBefore = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageWithEffect src={beforeImage} alt="Antes de usar scripts" label="Without EdgeScript" />
          <ImageWithEffect src={afterImage} alt="Después de usar scripts" label="With EdgeScript" />
        </div>
      </div>
    </div>
  );
};

const ImageWithEffect = ({ src, alt, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className={`relative group transform transition duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <img src={src} alt={alt} className="w-full h-80 object-cover rounded-lg shadow-md transition-all duration-300 filter brightness-50 group-hover:brightness-100 transform group-hover:scale-105"/>
      <div className="absolute inset-0 flex items-start justify-center rounded-lg transition-all duration-300 group-hover:bg-opacity-0">
        <h3 className="mt-4 text-2xl font-bold text-white bg-black bg-opacity-60 px-4 py-2 rounded-md shadow-lg">{label}</h3>
      </div>
    </div>
  );
};

export default AfterBefore;
