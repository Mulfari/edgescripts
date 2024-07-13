import React, { useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const ProductCard = ({ productDetail, addToCart }) => {
  const [step, setStep] = useState(1);
  const [option, setOption] = useState('');
  const [brand, setBrand] = useState('');
  const [dpi, setDpi] = useState('');
  const [sensitivity, setSensitivity] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(false);

  const handleOptionChange = (option) => {
    setOption(option);
    setStep(2);
    setError('');
  };

  const handleBrandChange = (brand) => {
    setBrand(brand);
    setError('');
  };

  const handleDpiChange = (dpi) => {
    setDpi(dpi);
    setError('');
  };

  const handleSensitivityChange = (sensitivity) => {
    setSensitivity(sensitivity);
    setError('');
  };

  const handleNextStep = (nextStep) => {
    if (nextStep === 2 && !option) {
      setError('Please select an option.');
    } else if (nextStep === 3 && (!brand || !dpi || !sensitivity)) {
      setError('Please select brand, DPI, and sensitivity.');
    } else {
      setStep(nextStep);
      setError('');
    }
  };

  const handleBackStep = (prevStep) => {
    setStep(prevStep);
    setError('');
  };

  const handleAddToCart = () => {
    const prices = {
      '1 weapon': '14.99',
      '2 weapons': '24.99',
      'Custom': '39.99'
    };
    const product = {
      option,
      brand,
      dpi,
      sensitivity,
      descripcion: productDetail.descripcion,
      precioDescuento: prices[option],
    };
    addToCart(product);
    setStep(4); // Move to Order Completed after adding to cart
    setOption('');
    setBrand('');
    setDpi('');
    setSensitivity('');
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  const handleCheckout = () => {
    // Handle checkout process
  };

  const handleViewProducts = () => {
    // Handle view more products process
  };

  const handleBack = () => {
    setStep(1); // Restart the process
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition-all duration-500 min-h-[500px] relative">
      {notification && (
        <div className="fixed bottom-4 right-4 bg-white text-black border border-black p-4 rounded-lg shadow-lg flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" />
          <span>Product added to cart!</span>
        </div>
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="flex-shrink-0 relative w-full lg:w-1/3">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{productDetail.descripcion}</h1>
          <img src={productDetail.imagen} alt={productDetail.descripcion} className="w-full h-64 object-cover rounded-md" />
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < productDetail.popularidad ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-gray-600">{productDetail.reviews} customer reviews</span>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-6 w-full lg:w-2/3">
          {step !== 4 && <ProgressBar step={step} />}
          {error && <p className="text-red-500">{error}</p>}
          {step === 1 && (
            <Step1 handleOptionChange={handleOptionChange} />
          )}
          {step === 2 && (
            <Step2
              handleBrandChange={handleBrandChange}
              handleDpiChange={handleDpiChange}
              handleSensitivityChange={handleSensitivityChange}
              handleNextStep={() => handleNextStep(3)}
              handleBackStep={() => handleBackStep(1)}
            />
          )}
          {step === 3 && (
            <Step3
              option={option}
              brand={brand}
              dpi={dpi}
              sensitivity={sensitivity}
              handleBackStep={() => handleBackStep(2)}
              handleAddToCart={handleAddToCart}
            />
          )}
          {step === 4 && (
            <OrderCompleted
              handleCheckout={handleCheckout}
              handleViewProducts={handleViewProducts}
              handleBack={handleBack}
            />
          )}
        </div>
      </div>
      <ProductDetails details={productDetail.detalles} features={productDetail.caracteristicas} />
      <ProductDescription />
      <ProductReviews reviews={productDetail.reviews} />
    </div>
  );
};

export default ProductCard;