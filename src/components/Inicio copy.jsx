import React from 'react';
import i1 from '../assets/i1.jpg';
import s1 from '../assets/s1.png'; // Reemplaza con la nueva imagen del personaje

const Inicio = () => {
  return (
    <div
      className="relative w-screen h-[41rem] bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${i1})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-50"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-8 md:px-32 lg:px-64"
           style={{ paddingLeft: '20%' }} // Mover la descripción y los botones un 20% más a la derecha
      >
        <div className="mt-20">
          <h1 className="text-6xl font-bold mb-6">Venta Scripts</h1>
          <p className="text-3xl mb-10">Descubre nuestra variedad</p>
          <div className="flex space-x-4">
            <button className="btn-primary">Explorar</button>
            <button className="btn-secondary">Comprar</button>
          </div>
        </div>
      </div>
      <img
        src={s1}
        alt="Character"
        className="absolute bottom-0 right-64 md:right-96 lg:right-128 z-20 animate-fadeInUp hidden sm:block"
        style={{ width: '600px', height: 'auto', bottom: '10%' }} // Ajustar la imagen un 10% más arriba
      />
    </div>
  );
};

export default Inicio;
