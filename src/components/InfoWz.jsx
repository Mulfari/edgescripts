// File path: src/components/InfoWz.jsx

import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaPlus, FaMinus } from 'react-icons/fa';

const InfoWz = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const features = [
    "Does not interfere with the game files",
    "Customizable mouse and *keyboard hotkeys (*for Logitech G series keyboards)",
    "Smooth no recoil – no screen shaking",
    "Works with any DPI and FOV",
    "Secure and Easy to use!",
    "Compatible with Modern Warfare 2"
  ];

  return (
    <>
      <hr className="my-6 border-t border-gray-300" />
      <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'black' }}>Frequently Asked Questions</h2>
    <div className="my-6 ml-0 max-w-full sm:max-w-md lg:max-w-lg p-4">
      <button
        onClick={toggleAccordion}
        className="w-full text-left text-lg font-semibold focus:outline-none flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-2 shadow-sm hover:bg-gray-100 transition duration-300"
      >
        <div className="flex items-center">
          <span className="text-2xl mr-2">{isOpen ? <FaMinus /> : <FaPlus />}</span>
          <span>INFO</span>
        </div>
      </button>
      <Collapse isOpened={isOpen}>
        <div className="mt-4 text-gray-700 ml-8">
          <p className="mb-2 font-semibold">No recoil script for Call of Duty Warzone 3 (2024)</p>
          <ul className="ml-5 list-disc space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-base leading-6">{feature}</li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
    </>
  );
};

export default InfoWz;
