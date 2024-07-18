import React, { useState } from 'react';
import { Collapse } from 'react-collapse';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is 'macro script'?",
      answer: "Macro is a script that performs specific actions like reducing recoil (No recoil macro), No spread, fastswitch, rapidfire, full auto, etc. Scripts move your mouse cursor to make you hit same spot when shooting. Some macros also use keyboard to perform fast key actions."
    },
    {
      question: "Macro doesn't work in game",
      answer: "Ensure the macro is set up correctly and that the game allows macro usage. Check the game settings and permissions."
    },
    {
      question: "Do they work on my mouse?",
      answer: "Most macros work with a variety of mouse brands and models, but it's best to check the specific requirements."
    },
    {
      question: "How to use/install macros?",
      answer: "Download the macro file and import it into your mouse software. Follow the specific instructions provided for your device."
    },
    {
      question: "Does mouse DPI change the way that macro works?",
      answer: "Yes, DPI settings can affect the macro's performance. Ensure your DPI settings are configured as recommended."
    },
    {
      question: "Macro doesn't work as seen on the product page/video",
      answer: "Make sure you have followed all setup instructions correctly. Contact support if the issue persists."
    },
    {
      question: "How can I pay for the product?",
      answer: "We accept payments through Stripe and other major payment gateways."
    },
    {
      question: "Is Stripe safe?",
      answer: "Yes, Stripe is a secure and trusted payment gateway used by millions of businesses worldwide."
    },
    {
      question: "The macro does not work",
      answer: "Ensure all instructions have been followed. If the problem continues, please contact our support team for assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white text-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleCollapse(index)}
              className="w-full text-left text-lg font-semibold focus:outline-none"
            >
              {faq.question}
              <span className="float-right">
                {activeIndex === index ? '-' : '+'}
              </span>
            </button>
            <Collapse isOpened={activeIndex === index}>
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            </Collapse>
            {index < faqs.length - 1 && <hr className="mt-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
