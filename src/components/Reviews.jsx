import React from 'react';
import { useInView } from 'react-intersection-observer';
import wzLogo from '../assets/Categorias/wzlogo.png';
import valorantLogo from '../assets/Categorias/valorantlogo.jpg';
import csgoLogo from '../assets/Categorias/csgologo.jpg';
import fortniteLogo from '../assets/Categorias/fortnitelogo.jpg';
import xdefiantLogo from '../assets/Categorias/xdefiantlogo.png';
import theFinalsLogo from '../assets/Categorias/thefinalslogo.webp';

const productLogos = {
  "Script de Warzone": wzLogo,
  "Script de Valorant": valorantLogo,
  "Script de Counter-Strike": csgoLogo,
  "Script de Fortnite": fortniteLogo,
  "Script de XDefiant": xdefiantLogo,
  "Script de The Finals": theFinalsLogo,
};

const Reviews = () => {
  const reviews = [
    {
      name: "Carlos M.",
      date: "2023-06-15",
      product: "Script de Warzone",
      review: "¡Este sitio me ha ayudado a mejorar mis habilidades en juegos de una manera increíble! Los scripts son muy fáciles de usar y efectivos.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ana P.",
      date: "2023-06-12",
      product: "Script de Valorant",
      review: "La variedad de scripts disponibles es impresionante. Además, el servicio al cliente es excelente y siempre están dispuestos a ayudar.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Luis F.",
      date: "2023-06-10",
      product: "Script de Fortnite",
      review: "He probado varios scripts y todos funcionan a la perfección. ¡Altamente recomendable para cualquier gamer!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    }
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white p-6 rounded-lg shadow-md transition-all duration-1000 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-center mb-4">
        <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mr-4"/>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
          <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-lg font-medium text-blue-600">Product: {review.product.replace('Script de ', '')}</span>
        <img src={productLogos[review.product]} alt={review.product} className="w-6 h-6 ml-2"/>
      </div>
      <p className="text-gray-600 mb-4 italic">"{review.review}"</p>
      <div className="flex items-center">
        {[...Array(review.rating)].map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-500"></i>
        ))}
        {[...Array(5 - review.rating)].map((_, i) => (
          <i key={i} className="far fa-star text-yellow-500"></i>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
