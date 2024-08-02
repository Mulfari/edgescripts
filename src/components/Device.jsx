import React, { useState } from 'react';
import logitechLogo from '../assets/Categorias/logitechlogo.png';
import razerLogo from '../assets/Categorias/razerlogo.png';

const Device = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [dpi, setDpi] = useState('');
  const [sensitivity, setSensitivity] = useState('');
  const [brandError, setBrandError] = useState('');
  const [dpiError, setDpiError] = useState('');
  const [sensitivityError, setSensitivityError] = useState('');

  const handleBrandSelection = (brand) => {
    setSelectedBrand(brand);
    setBrandError('');
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
  };

  const updateUserData = async () => {
    try {
      const response = await fetch('https://www.edgescripts.com/update-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: selectedBrand,
          dpi,
          sensitivity,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User updated successfully:', data);
      } else {
        console.error('Error updating user:', data);
      }
    } catch (error) {
      console.error('An error occurred while updating the user:', error);
    }
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
      updateUserData();
    }
  };

  const handleBackStep = () => {
    // Implement your back step logic here
    console.log('Back button clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Step 2: Choose your device</h2>
        {brandError && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{brandError}</p>}
        {dpiError && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{dpiError}</p>}
        {sensitivityError && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{sensitivityError}</p>}
        
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Select brand:</label>
          <div className="flex space-x-4">
            {[
              { id: 'logitech', src: logitechLogo, alt: 'Logitech' },
              { id: 'razer', src: razerLogo, alt: 'Razer' },
            ].map((brand) => (
              <button
                key={brand.id}
                type="button"
                className={`p-2 border rounded-md focus:outline-none transition-colors duration-300 ${
                  selectedBrand === brand.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => handleBrandSelection(brand.id)}
              >
                <img src={brand.src} alt={brand.alt} className="h-10 w-auto" />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Select DPI:</label>
          <input
            type="number"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={dpi}
            onChange={handleDpiInput}
            min="1"
            max="9999"
            placeholder="Enter DPI"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Sensitivity:</label>
          <input
            type="number"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={sensitivity}
            onChange={handleSensitivityInput}
            min="1"
            max="200"
            placeholder="Enter Sensitivity"
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="w-1/3 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
            onClick={handleBackStep}
          >
            Back
          </button>
          <button
            type="button"
            className="w-1/3 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Device;
