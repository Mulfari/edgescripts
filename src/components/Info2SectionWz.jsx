// File path: src/components/Info2SectionWZ.jsx

import React from 'react';
import wzImageFull from '../assets/wzimagefull.webp';

const Info2SectionWZ = ({
  title = "INFO",
  text = "No recoil script for Call of Duty Warzone 3 (2024)",
  imgAlt = "Nature Photography",
}) => {
  const features = [
    "Does not interfere with the game files",
    "Customizable mouse and *keyboard hotkeys (*for Logitech G series keyboards)",
    "Smooth no recoil – no screen shaking",
    "Works with any DPI and FOV",
    "Secure and Easy to use!",
    "Compatible with Modern Warfare 2",
  ];

  return (
    <>
      <hr className="my-6 border-t border-gray-300" /> {/* Divisor horizontal */}
      <section className="w-full py-1 md:py-2 lg:py-3">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: 'black' }}>
                {title}
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" style={{ color: 'black' }}>
                {text}
              </p>
              <ul className="list-none space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">✔️</span>
                    <span className="text-black">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-xl object-cover">
            <img src={wzImageFull} alt={imgAlt} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
      <style jsx>{`
        .compare-image-slider {
          transition: transform 0.2s ease-in-out; // Transición suave
        }
        .compare-image-slider:focus {
          outline: none; // Quitar outline al enfocar
          transform: scale(1.1); // Escalar al enfocar
        }
      `}</style>
    </>
  );
};

export default Info2SectionWZ;
