import React from 'react';
import CompareImage from 'react-compare-image';
import beforeImage from '../assets/before.png';
import afterImage from '../assets/after.png';

const InfoSectionWZ = ({
  title = "Discover the Beauty of Nature",
  text = "Immerse yourself in the stunning landscapes and vibrant wildlife captured in our high-quality nature photography. Explore the wonders of the natural world and find inspiration in the breathtaking images.",
  imgAlt = "Nature Photography",
}) => {
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
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-xl object-cover">
            <CompareImage
              leftImage={beforeImage}
              rightImage={afterImage}
              leftImageLabel="Before"
              rightImageLabel="After"
              sliderLineWidth={3} // Ancho de la línea del slider
              sliderLineColor="rgba(0, 0, 0, 0.5)" // Color de la línea del slider
            />
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

export default InfoSectionWZ;
