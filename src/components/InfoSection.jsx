import React from 'react';
import { FaShieldAlt, FaSyncAlt, FaCogs, FaQuestionCircle } from 'react-icons/fa';

const InfoSection = () => {
  const infoData = [
    {
      icon: <FaShieldAlt size={40} className="text-blue-400" />,
      title: 'Safe to use',
      description: 'Our macros are completely safe, do not interfere with game files, and do not require any external applications.',
    },
    {
      icon: <FaSyncAlt size={40} className="text-green-400" />,
      title: 'Compatibility',
      description: 'Compatibility with most mouse brands and devices.',
    },
    {
      icon: <FaCogs size={40} className="text-red-400" />,
      title: 'Customized',
      description: 'We work with custom code tailored to the client’s needs.',
    },
    {
      icon: <FaQuestionCircle size={40} className="text-yellow-400" />,
      title: 'Personalized Support',
      description: 'We offer personalized customer support to ensure your needs are met. Our detailed tutorials guide you on how to install and use our macros effectively.',
    },
  ];

  return (
    <div className="py-8 bg-gray-200">
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
