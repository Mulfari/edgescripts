// File path: src/components/WeaponArticle.jsx

import React, { useState } from 'react';
import stg44Image from '../assets/STG44.webp';
import staticHvImage from '../assets/STATIC_HV.webp';
import kar98kImage from '../assets/KAR98K.webp';
import mcwImage from '../assets/MCW.png';
import taqEradicatorImage from '../assets/TAQ_ERADICATOR.webp';
import superi46Image from '../assets/SUPERI_46.webp';

const WeaponArticle = ({
  title,
  category,
  attachments,
  image,
  isPopular
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden my-4 mx-auto max-w-full sm:max-w-md lg:max-w-lg relative">
      {isPopular && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
          Top
        </div>
      )}
      <div className="cursor-pointer flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 to-gray-900" onClick={handleToggle}>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-300">{category}</p>
        </div>
        <img src={image} alt={title} className="w-48 h-auto" />
      </div>
      {expanded && (
        <div className="p-4 bg-gray-900">
          <ul className="mt-4 space-y-2 text-gray-300">
            {attachments.map((attachment, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-bold">{attachment.name}:</span>
                <span>{attachment.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const WeaponArticleList = () => {
  const articles = [
    { 
      title: "STG44", 
      category: "Long Range", 
      attachments: [
        { name: "Muzzle", value: "QUARTERMASTER SUPPRESSOR" }, 
        { name: "Barrel", value: "FERNGEWEHR 792 BARREL" }, 
        { name: "Optic", value: "JAK GLASSLESS OPTIC" }, 
        { name: "Magazine", value: "50 ROUND DRUM" }, 
        { name: "Ammunition", value: "7.92X33MM HIGH GRAIN" }
      ],
      image: stg44Image,
      isPopular: true
    },
    { 
      title: "STATIC-HV", 
      category: "Close Range", 
      attachments: [
        { name: "Muzzle", value: "QUARTERMASTER SUPPRESSOR" }, 
        { name: "Barrel", value: "GARROTE-8 LONG BARREL" }, 
        { name: "Optic", value: "NYDAR MODEL 2023" }, 
        { name: "Stock", value: "SPRY 34 LIGHT STOCK" }, 
        { name: "Underbarrel", value: "DR-6 HANDSTOP" }
      ],
      image: staticHvImage,
      isPopular: true
    },
    { 
      title: "KAR98K", 
      category: "Sniper", 
      attachments: [
        { name: "Muzzle", value: "SONIC SUPPRESSOR L" }, 
        { name: "Barrel", value: "PRAZISIONSGEWEHR 762 LONG" }, 
        { name: "Optic", value: "RANGE CALLER V3.4" }, 
        { name: "Ammunition", value: "7.92 HIGH GRAIN ROUNDS" }, 
        { name: "Sling", value: "RECON SLING" }
      ],
      image: kar98kImage,
      isPopular: false
    },
    { 
      title: "MCW", 
      category: "Sniper Support", 
      attachments: [
        { name: "Muzzle", value: "QUARTERMASTER SUPPRESSOR" }, 
        { name: "Optic", value: "MK. 3 REFLECTOR" }, 
        { name: "Underbarrel", value: "DR-6 HANDSTOP" }, 
        { name: "Magazine", value: "40 ROUND MAG" }, 
        { name: "Conversion Kit", value: "JAK RAVEN KIT" }
      ],
      image: mcwImage,
      isPopular: false
    },
    { 
      title: "TAQ ERADICATOR", 
      category: "Long Range", 
      attachments: [
        { name: "Muzzle", value: "QUARTERMASTER SUPPRESSOR" }, 
        { name: "Barrel", value: "CONQUER-70 LONG" }, 
        { name: "Stock", value: "TACVERTE CORE" }, 
        { name: "Underbarrel", value: "PARACORD GRIP" }, 
        { name: "Ammunition", value: "7.62X51MM HIGH GRAIN" }
      ],
      image: taqEradicatorImage,
      isPopular: false
    },
    { 
      title: "SUPERI 46", 
      category: "Close Range", 
      attachments: [
        { name: "Muzzle", value: "ZEHMN35 COMPENSATED FLASH HIDER" }, 
        { name: "Stock", value: "RESCUE-9 STOCK" }, 
        { name: "Underbarrel", value: "XRK EDGE BW-4 HANDSTOP" }, 
        { name: "Magazine", value: "40 ROUND MAG" }, 
        { name: "Ammunition", value: "4.6MM HIGH GRAIN" }
      ],
      image: superi46Image,
      isPopular: false
    }
  ];

  return (
    <>
      <hr className="my-6 border-t border-gray-300" />
      <section className="w-full py-1 md:py-2 lg:py-3">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
                Meta Weapons
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center -mx-2">
          {articles.map((article, index) => (
            <div key={index} className="w-full sm:w-full md:w-full lg:w-1/3 px-2 mb-4">
              <WeaponArticle {...article} />
            </div>
          ))}
        </div>
      </div>
      <div className="text-right px-4 py-2 text-gray-600">
        Meta loadouts from warzoneloadout.games
      </div>
    </>
  );
};

export default WeaponArticleList;
