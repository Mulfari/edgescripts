import React from 'react';
import i1 from '../assets/i1.jpg';
import s1 from '../assets/Categorias/wzinicio2.png'; // Ruta actualizada de la imagen

const Inicio = () => {
  return (
    <div
      className="relative w-screen h-[20.5rem] bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${i1})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-16 md:px-40 lg:px-72">
        <div className="mt-20">
          <h1 className="text-6xl font-bold mb-6">Products</h1>
          <p className="text-3xl mb-10">Unlock your gaming potential</p>
        </div>
      </div>
      <img
        src={s1}
        alt="Character"
        className="absolute bottom-0 right-8 md:right-16 lg:right-24 z-20 animate-fadeInUp hidden sm:block"
        style={{ width: '7%', height: 'auto' }} // Ajustar tamaño a 7% del ancho del componente
      />
    </div>
  );
};

export default Inicio;
