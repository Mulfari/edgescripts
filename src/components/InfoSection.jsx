import React from 'react';
import { FaShieldAlt, FaSyncAlt, FaCogs, FaQuestionCircle } from 'react-icons/fa';

const InfoSection = () => {
  const infoData = [
    {
      icon: <FaShieldAlt size={40} className="text-blue-400" />,
      title: 'Safe to use',
      description: 'Our macros work on mouse software level. It doesn’t interfere with any game files and doesn’t require any external applications.',
    },
    {
      icon: <FaSyncAlt size={40} className="text-green-400" />,
      title: 'Compatibility',
      description: 'Royal Coders offers macros for various mouse brands. Please check the product page for details, as some of the macros may not be compatible with all mice specified.',
    },
    {
      icon: <FaCogs size={40} className="text-red-400" />,
      title: 'How does it work?',
      description: 'Macro makes specific mouse movements to counteract recoil. It works as if you would move the mouse yourself to control recoil precisely. Some macros offer a humanizer function.',
    },
    {
      icon: <FaQuestionCircle size={40} className="text-yellow-400" />,
      title: 'Support',
      description: 'We have created detailed tutorials on how to install and use our macros. In case you have any problems, feel free to contact our support.',
    },
  ];

  return (
    <div className="py-8 bg-gray-200"> {/* Reducir el margen superior y opacar el fondo */}
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoData.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800 rounded-lg shadow-lg animate-fadeIn"
              style={{ animationDelay: `${index * 0.3}s`, animationFillMode: 'both' }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
