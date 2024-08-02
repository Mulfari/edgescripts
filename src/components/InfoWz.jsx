// File path: src/components/InfoWz.jsx

import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaPlus, FaMinus } from 'react-icons/fa';

const InfoWz = () => {
  const [isNotConvincedOpen, setIsNotConvincedOpen] = useState(false);
  const [isMacroOpen, setIsMacroOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isOtherQuestionsOpen, setIsOtherQuestionsOpen] = useState(false);

  const toggleNotConvincedAccordion = () => {
    setIsNotConvincedOpen(!isNotConvincedOpen);
  };

  const toggleMacroAccordion = () => {
    setIsMacroOpen(!isMacroOpen);
  };

  const toggleInstallAccordion = () => {
    setIsInstallOpen(!isInstallOpen);
  };

  const toggleOtherQuestionsAccordion = () => {
    setIsOtherQuestionsOpen(!isOtherQuestionsOpen);
  };

  return (
    <>
      <hr className="my-6 border-t border-gray-300" />
      <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'black' }}>Frequently Asked Questions</h2>

      <div className="my-3 mx-auto max-w-full md:max-w-2xl lg:max-w-3xl p-2">
        <button
          onClick={toggleNotConvincedAccordion}
          className="w-full text-left text-lg font-semibold focus:outline-none flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-gray-100 transition duration-300"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{isNotConvincedOpen ? <FaMinus /> : <FaPlus />}</span>
            <span>Still not convinced?</span>
          </div>
        </button>
        <Collapse isOpened={isNotConvincedOpen}>
          <div className="mt-4 text-gray-700">
            <p className="mb-2">Our No Recoil Macro Script is customized for each client. Have you ever wondered how some players can control recoil so easily in-game? Now you have the answer.</p>
            <p className="mb-2">Our script offers personalized settings tailored to your specific needs, providing you with the ultimate advantage. Experience unparalleled precision and ease of use with our highly optimized solution.</p>
            <p className="mb-2">Join the many satisfied gamers who have improved their gameplay with our No Recoil Macro Script. Don't let recoil control be a challenge anymore!</p>
          </div>
        </Collapse>
      </div>

      <div className="my-3 mx-auto max-w-full md:max-w-2xl lg:max-w-3xl p-2">
        <button
          onClick={toggleMacroAccordion}
          className="w-full text-left text-lg font-semibold focus:outline-none flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-gray-100 transition duration-300"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{isMacroOpen ? <FaMinus /> : <FaPlus />}</span>
            <span>How does our no recoil macro work?</span>
          </div>
        </button>
        <Collapse isOpened={isMacroOpen}>
          <div className="mt-4 text-gray-700">
            <p className="mb-2">Our COD WZ 3 No Recoil Macro Script integrates effortlessly with Logitech G-Hub or LGS, ensuring a smooth experience. Enjoy unmatched precision and security with our no recoil macro, designed specifically for COD WZ 3 and Logitech devices.</p>
            <p className="mb-2">The script includes adjustable sensitivity settings and a customizable button layout, giving you full control over your gameplay.</p>
            <p className="mb-2">Rest assured, our No Recoil solution works seamlessly with Logitech G-Hub and LGS, fully optimized for WZ3.</p>
          </div>
        </Collapse>
      </div>

      <div className="my-3 mx-auto max-w-full md:max-w-2xl lg:max-w-3xl p-2">
        <button
          onClick={toggleInstallAccordion}
          className="w-full text-left text-lg font-semibold focus:outline-none flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-gray-100 transition duration-300"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{isInstallOpen ? <FaMinus /> : <FaPlus />}</span>
            <span>How to install?</span>
          </div>
        </button>
        <Collapse isOpened={isInstallOpen}>
          <div className="mt-4 text-gray-700">
            <p className="mb-2">For detailed information on how to install after purchase, visit our <a href="/how-to-install" className="text-blue-500 underline">How to install</a> page.</p>
          </div>
        </Collapse>
      </div>

      <div className="my-3 mx-auto max-w-full md:max-w-2xl lg:max-w-3xl p-2">
        <button
          onClick={toggleOtherQuestionsAccordion}
          className="w-full text-left text-lg font-semibold focus:outline-none flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-gray-100 transition duration-300"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{isOtherQuestionsOpen ? <FaMinus /> : <FaPlus />}</span>
            <span>Other Questions?</span>
          </div>
        </button>
        <Collapse isOpened={isOtherQuestionsOpen}>
          <div className="mt-4 text-gray-700">
            <p className="mb-2">If you have any other questions, you can visit our <a href="/support/faq" className="text-blue-500 underline">FAQ</a>.</p>
            <p className="mb-2">You can also send a message to support by visiting <a href="/support/contact" className="text-blue-500 underline">contact</a>.</p>
            <p className="mb-2">Or join our Discord server for help.</p>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default InfoWz;
