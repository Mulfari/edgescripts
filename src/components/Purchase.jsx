import React from 'react';
import { useInView } from 'react-intersection-observer';

const Purchase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="relative">
      <svg
        className="absolute inset-x-0 top-0 -mt-1"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(180deg)' }}
      >
        <path
          fill="#1f2937"
          d="M0,192L80,186.7C160,181,320,171,480,186.7C640,203,800,245,960,245.3C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <div
        ref={ref}
        className={`relative py-16 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white transform transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Get your macro now and go to the battleground!
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Check out our featured products below or see{' '}
            <a
              href="/products"
              className="text-blue-400 underline hover:text-blue-600 transition duration-300"
            >
              all our products!
            </a>
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-gray-600 text-white py-3 px-8 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            Purchase Now
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-gray-600 opacity-10 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Purchase;
