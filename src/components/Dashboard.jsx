import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full transition-transform transform duration-500 ease-in-out">
        <div className="flex items-center mb-6">
          <FaUserCircle className="text-6xl text-gray-700 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            <p className="text-xl text-gray-700">John Doe</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-6 text-left">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Username:</strong> {user.username}</p>
          <p className="text-gray-700 mt-2"><strong>Email:</strong> {user.email}</p>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center">Purchase History</h3>
          <div className="mt-4 flex justify-between">
            <div className="w-1/2 text-left">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Products</h4>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <p className="text-gray-700"><strong>Product Name:</strong> Example Product</p>
                <p className="text-gray-700"><strong>Price:</strong> $49.99</p>
                <p className="text-gray-700"><strong>Date:</strong> 2023-01-01</p>
              </div>
              {/* Agrega más productos aquí si es necesario */}
            </div>
            <div className="w-1/2 text-center">
              <p className="text-gray-700">No purchases found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
