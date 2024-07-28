import React, { useState } from 'react';
import { FaStar, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import wzLogo from '../assets/Categorias/wzlogo.png';
import logitechLogo from '../assets/Categorias/logitechlogo.png';
import razerLogo from '../assets/Categorias/razerlogo.png';
import weaponImage from '../assets/Categorias/1w_rotated.png';
import newWeaponImage from '../assets/Categorias/2w_rotated.png';
import uploadedImage from '../assets/Categorias/rotated_image.png';

const productos = [
  { id: 1, imagen: wzLogo, descripcion: 'COD Warzone 3 No Recoil Macro', precioOriginal: '18.99 $', precioDescuento: '14.99 $', descuento: '21%', categoria: 'Warzone', popularidad: 5, nuevo: true, reviews: 10, detalles: 'Detalles del producto', caracteristicas: ['Característica 1', 'Característica 2'] },
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
          <div className={`absolute top-0 left-0 h-2 ${s <= step ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gray-300'} rounded-full transition-all duration-700 ease-in-out`} style={{ width: '100%' }}></div>
        </div>
      ))}
    </div>
  </div>
);

const PricingCard = ({ title, price, description, features, handleOptionChange, images, popular }) => (
  <div className="rounded-lg shadow-md overflow-hidden h-full flex flex-col bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative">
    <div className="relative p-6 flex-1 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600" style={{ height: '52%' }}>
      <div className="relative z-10 w-48 h-48 rounded-md overflow-hidden shadow-md flex justify-center items-center image-container" style={{ boxShadow: 'inset 0px 0px 15px rgba(255, 255, 255, 0.5)' }}>
        {images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`${title}-${index}`} 
            className="w-full h-full object-contain" 
            style={{ marginLeft: index === 0 ? '-5%' : '-120px' }} 
          />
        ))}
      </div>
      {popular && (
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <div className="bg-red-500 text-white text-xs font-bold py-1 px-2 absolute transform rotate-45" style={{ top: '1rem', right: '-1.5rem', width: '120px', textAlign: 'center' }}>
            Popular
          </div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 flex">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
        ))}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        <ul className="text-gray-500 mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="text-3xl font-extrabold mb-4 text-gray-900">${price}</p>
      </div>
      <button
        className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 w-full flex items-center justify-center"
        onClick={() => handleOptionChange(title)}
      >
        <FaShoppingCart className="mr-2" /> Add to Cart
      </button>
    </div>
  </div>
);

const Step1 = ({ handleOptionChange }) => {
  const plans = [
    {
      title: '1 weapon',
      price: '14.99',
      description: 'Perfect for casual gamers or those just starting out.',
      features: ['Access to all game servers'],
      images: [weaponImage]
    },
    {
      title: '2 weapons',
      price: '24.99',
      description: 'For serious gamers who demand the best performance.',
      features: ['Access to all game servers'],
      images: [newWeaponImage, weaponImage],
      popular: true // Marcamos este plan como popular
    },
    {
      title: 'Custom',
      price: '39.99',
      description: 'For the ultimate gaming experience.',
      features: ['Access to all game servers'],
      images: [newWeaponImage, uploadedImage, weaponImage]
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
  const [brandError, setBrandError] = useState('');
  const [dpiError, setDpiError] = useState('');
  const [sensitivityError, setSensitivityError] = useState('');

  const handleBrandSelection = (brand) => {
    setSelectedBrand(brand);
    handleBrandChange(brand);
    setBrandError(''); // Clear brand error message when a brand is selected
  };

  const handleDpiInput = (event) => {
    let value = event.target.value;
    if (value > 9999) {
      value = 9999;
      setDpiError('Maximum DPI is 9999.');
    } else {
      setDpiError('');
    }
    setDpi(value);
    handleDpiChange(value);
  };

  const handleSensitivityInput = (event) => {
    let value = event.target.value;
    if (value > 200) {
      value = 200;
      setSensitivityError('Maximum sensitivity is 200.');
    } else {
      setSensitivityError('');
    }
    setSensitivity(value);
    handleSensitivityChange(value);
  };

  const handleNext = () => {
    let hasError = false;
    if (!selectedBrand) {
      setBrandError('Brand is required to proceed.');
      hasError = true;
    }
    if (!dpi || dpi < 1 || dpi > 9999) {
      setDpiError('DPI is required to proceed.');
      hasError = true;
    }
    if (!sensitivity || sensitivity < 1 || sensitivity > 200) {
      setSensitivityError('Sensitivity is required to proceed.');
      hasError = true;
    }
    if (!hasError) {
      handleNextStep();
    }
  };

  return (
    <div className="flex flex-col mt-6 h-full">
      <label className="block text-gray-700 mb-4 text-2xl font-semibold">Step 2: Choose your device</label>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <label className="block text-gray-700 text-lg font-medium mr-4">Select brand:</label>
          <div className="flex space-x-4">
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
          {brandError && <p className="text-red-500 ml-4">{brandError}</p>}
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <label className="block text-gray-700 text-lg font-medium">Select DPI:</label>
        <input
          type="number"
          className="block w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={dpi}
          onChange={handleDpiInput}
          min="1"
          max="9999"
          placeholder="Enter DPI"
        />
        {dpiError && <p className="text-red-500 ml-4">{dpiError}</p>}
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <label className="block text-gray-700 text-lg font-medium">Sensitivity:</label>
        <input
          type="number"
          className="block w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={sensitivity}
          onChange={handleSensitivityInput}
          min="1"
          max="200"
          placeholder="Enter Sensitivity"
        />
        {sensitivityError && <p className="text-red-500 ml-4">{sensitivityError}</p>}
      </div>
      <div className="flex justify-between mt-16">
        <button style={{ width: '25%' }} className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleBackStep}>
          Back
        </button>
        <button
          style={{ width: '25%' }}
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ml-4"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};



const Step3 = ({ option, brand, dpi, sensitivity, handleBackStep, handleAddToCart }) => (
  <div className="flex flex-col mt-6 h-full">
    <label className="block text-gray-700 mb-4 text-2xl font-semibold">Step 3: Checkout</label>
    <div className="p-4 border border-gray-300 rounded-md mb-8">
      <p className="text-gray-900 text-lg font-medium"><strong>Product:</strong> {option}</p>
      <p className="text-gray-900 text-lg font-medium"><strong>Brand:</strong> {brand}</p>
      <p className="text-gray-900 text-lg font-medium"><strong>DPI:</strong> {dpi}</p>
      <p className="text-gray-900 text-lg font-medium"><strong>Sensitivity:</strong> {sensitivity}</p>
    </div>
    <div className="flex justify-between mt-16">
      <button style={{ width: '25%' }} className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleBackStep}>
        Back
      </button>
      <button style={{ width: '25%' }} className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ml-4" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  </div>
);

const OrderCompleted = ({ handleCheckout, handleBack }) => (
  <div className="flex flex-col mt-6 h-full">
    <label className="block text-gray-700 mb-4 text-2xl font-semibold">Order Completed</label>
    <div className="p-4 border border-gray-300 rounded-md mb-8">
      <p className="text-gray-900 text-lg font-medium">Your order has been successfully added to the cart.</p>
    </div>
    <div className="flex justify-between mt-16">
      <button style={{ width: '25%' }} className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleBack}>
        Back
      </button>
      <button
        style={{ width: '25%' }}
        className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ml-4"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
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

const ReviewSection = () => (
  <div className="mt-4 bg-gray-100 p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos M." className="w-16 h-16 rounded-full mr-4" />
      <div>
        <div className="flex items-center">
          <h3 className="text-xl font-semibold text-gray-800">Carlos M.</h3>
          <div className="ml-2 flex">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500 ml-1" />
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm">15/6/2023</p>
        <p className="text-gray-500 text-xs">Most Recent Review</p>
      </div>
    </div>
    <div className="flex items-center mb-2">
      <span className="text-lg font-medium text-blue-600">Product: Warzone</span>
      <img src={wzLogo} alt="Warzone" className="w-6 h-6 ml-2" />
    </div>
    <p className="text-gray-600 mb-4 italic">"¡Este sitio me ha ayudado a mejorar mis habilidades en juegos de una manera increíble! Los scripts son muy fáciles de usar y efectivos."</p>
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
    setStep(4);
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
  };

  const handleViewProducts = () => {
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition-all duration-500 min-h-[650px] relative">
      {notification && (
        <div className="fixed bottom-4 right-4 bg-white text-black border border-black p-4 rounded-lg shadow-lg flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" />
          <span>Product added to cart!</span>
        </div>
      )}
      <div className="flex flex-col lg:flex-row min-h-[650px]">
        <div className="flex-shrink-0 relative w-full lg:w-1/3">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{productDetail.descripcion}</h1>
          <div className="relative">
            <img src={productDetail.imagen} alt={productDetail.descripcion} className="relative z-10 w-full h-64 object-cover rounded-md shadow-lg" />
            <div className="absolute bottom-2 right-2 flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < productDetail.popularidad ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-gray-600">{productDetail.reviews} customer reviews</span>
            <ReviewSection />
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

const ProductWarzone = ({ addToCart, removeFromCart }) => {
  const category = "Warzone";
  const productsInCategory = productos.filter(product => product.categoria === category);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen py-6 pt-24">
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
