import React, { useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import productImage from '../assets/Categorias/wzlogo.png';
import logitechLogo from '../assets/Categorias/logitechlogo.png';
import razerLogo from '../assets/Categorias/razerlogo.png';
import cardImage from '../assets/wzinicio2.png';

const productos = [
  { id: 1, imagen: productImage, descripcion: 'COD Warzone 3 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Warzone', popularidad: 5, nuevo: true, reviews: 10, detalles: 'Detalles del producto', caracteristicas: ['Característica 1', 'Característica 2'] },
  // Otros productos de Warzone...
];

const Breadcrumb = () => (
  <nav className="text-gray-600 text-sm mb-4 flex items-center space-x-2">
    <a href="/" className="hover:text-gray-800">Home</a>
    <span>&gt;</span>
    <a href="/products" className="hover:text-gray-800">Products</a>
    <span>&gt;</span>
    <span className="text-gray-800">Warzone</span>
  </nav>
);

const ProgressBar = ({ step }) => (
  <div className="flex flex-col items-center mb-6">
    <div className="relative w-full flex justify-between">
      {[1, 2, 3].map((s) => (
        <div key={s} className="relative w-1/3">
          <div className={`absolute top-0 left-0 h-2 ${s <= step ? 'bg-blue-500' : 'bg-gray-300'} rounded-full transition-all duration-700 ease-in-out`} style={{ width: '100%' }}></div>
        </div>
      ))}
    </div>
  </div>
);

const PricingCard = ({ title, price, description, features, handleOptionChange }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center min-h-[500px] flex flex-col justify-between">
    <div>
      <img src={cardImage} alt={title} className="w-24 h-24 mx-auto mb-4 object-contain" />
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-3xl font-extrabold mb-4 text-gray-900">${price}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="text-left mb-4 text-gray-900">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      onClick={() => handleOptionChange(title)}
    >
      Get Started
    </button>
  </div>
);

const Step1 = ({ handleOptionChange }) => {
  const plans = [
    {
      title: '1 weapon',
      price: '14.99',
      description: 'Perfect for casual gamers or those just starting out.',
      features: [
        'Access to all game servers',
        '100 GB of cloud storage',
        'Basic customer support',
      ],
    },
    {
      title: '2 weapons',
      price: '24.99',
      description: 'For serious gamers who demand the best performance.',
      features: [
        'Access to all game servers',
        '500 GB of cloud storage',
        'Priority customer support',
        'Exclusive in-game rewards',
      ],
    },
    {
      title: 'Custom',
      price: '39.99',
      description: 'For the ultimate gaming experience.',
      features: [
        'Access to all game servers',
        'Unlimited cloud storage',
        'Priority customer support',
        'Exclusive in-game rewards',
        'Early access to new games',
      ],
    },
  ];

  return (
    <div className="flex flex-col mt-6 h-full">
      <label className="block text-gray-700 mb-4 text-2xl font-semibold">Step 1: Choose your product</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} handleOptionChange={handleOptionChange} />
        ))}
      </div>
    </div>
  );
};

const Step2 = ({ handleBrandChange, handleDpiChange, handleSensitivityChange, handleNextStep, handleBackStep }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [dpi, setDpi] = useState('');
  const [sensitivity, setSensitivity] = useState('');

  const handleBrandSelection = (brand) => {
    setSelectedBrand(brand);
    handleBrandChange(brand);
  };

  const handleDpiInput = (event) => {
    const value = event.target.value;
    setDpi(value);
    handleDpiChange(value);
  };

  const handleSensitivityInput = (event) => {
    const value = event.target.value;
    setSensitivity(value);
    handleSensitivityChange(value);
  };

  return (
    <div className="flex flex-col mt-6 h-full">
      <label className="block text-gray-700 mb-4 text-2xl font-semibold">Step 2: Choose your device</label>
      <div className="flex space-x-4 mb-4">
        {[
          { id: 'logitech', src: logitechLogo, alt: 'Logitech' },
          { id: 'razer', src: razerLogo, alt: 'Razer' },
        ].map((brand) => (
          <button
            key={brand.id}
            className={`p-2 border rounded-md focus:outline-none transition-colors duration-300 ${
              selectedBrand === brand.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => handleBrandSelection(brand.id)}
          >
            <img src={brand.src} alt={brand.alt} className="h-10 w-auto" />
          </button>
        ))}
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <label className="block text-gray-700 mb-2">Select DPI:</label>
        <input
          type="number"
          className="block w-32 p-2 border border-gray-300 rounded-md"
          value={dpi}
          onChange={handleDpiInput}
          min="1"
          max="5000"
          placeholder="Enter DPI"
        />
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <label className="block text-gray-700 mb-2">Sensitivity:</label>
        <input
          type="number"
          className="block w-32 p-2 border border-gray-300 rounded-md"
          value={sensitivity}
          onChange={handleSensitivityInput}
          min="1"
          max="30"
          placeholder="Enter Sensitivity"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300" onClick={handleBackStep}>Back</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800" onClick={handleNextStep}>Next</button>
      </div>
    </div>
  );
};

const Step3 = ({ option, brand, dpi, sensitivity, handleBackStep, handleAddToCart }) => (
  <div className="flex flex-col mt-6 h-full">
    <label className="block text-gray-700 mb-4 text-2xl font-semibold">Step 3: Checkout</label>
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <p className="text-gray-900"><strong>Product:</strong> {option}</p>
      <p className="text-gray-900"><strong>Brand:</strong> {brand}</p>
      <p className="text-gray-900"><strong>DPI:</strong> {dpi}</p>
      <p className="text-gray-900"><strong>Sensitivity:</strong> {sensitivity}</p>
    </div>
    <div className="flex justify-between mt-4">
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300" onClick={handleBackStep}>Back</button>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </div>
);

const OrderCompleted = ({ handleCheckout, handleViewProducts, handleBack }) => (
  <div className="flex flex-col mt-6 h-full">
    <label className="block text-gray-700 mb-4 text-2xl font-semibold">Order Completed</label>
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <p className="text-gray-900">Your order has been successfully added to the cart.</p>
    </div>
    <div className="flex justify-between mt-4">
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300" onClick={handleBack}>Back</button>
      <div className="flex space-x-4">
        <button className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700" onClick={handleViewProducts}>View More Products</button>
        <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  </div>
);

const ProductDetails = ({ details, features }) => (
  <div className="border-t border-gray-200 mt-6 pt-4">
    <h2 className="text-xl font-bold text-gray-900 mb-2">INFO</h2>
    <p className="text-gray-700 mb-4">{details}</p>
    <ul className="list-disc list-inside text-gray-700">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

const ProductDescription = () => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">DESCRIPTION</h3>
    <p className="text-gray-700">Detailed description of the product goes here.</p>
  </div>
);

const ProductReviews = ({ reviews }) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">REVIEWS ({reviews})</h3>
    <p className="text-gray-700">Customer reviews will be displayed here.</p>
  </div>
);

const ProductCard = ({ productDetail, addToCart, removeFromCart }) => {
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

const ProductWarzone = ({ cartItems, addToCart, removeFromCart }) => {
  const category = "Warzone";
  const productsInCategory = productos.filter(product => product.categoria === category);

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        {productsInCategory.map(productDetail => (
          <ProductCard key={productDetail.id} productDetail={productDetail} addToCart={addToCart} removeFromCart={removeFromCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductWarzone;