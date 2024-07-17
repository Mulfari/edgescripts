import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleEditClick = () => {
    navigate('/recovery-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full transition-transform transform duration-500 ease-in-out">
        <div className="flex items-center mb-8">
          <FaUserCircle className="text-6xl text-gray-700 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-8 text-left">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Email:</strong> {user.username}</p>
          <div className="flex items-center mt-2">
            <p className="text-gray-700"><strong>Password:</strong> ••••••••</p>
            <a
              onClick={handleEditClick}
              className="ml-4 text-blue-500 hover:text-blue-700 cursor-pointer"
              title="Change Password"
            >
              Change Password
            </a>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Purchase History</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-2/3 text-left">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Products</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                  <p className="text-gray-700"><strong>Product Name:</strong> Example Product</p>
                  <p className="text-gray-700"><strong>Price:</strong> $49.99</p>
                  <p className="text-gray-700"><strong>Date:</strong> 2023-01-01</p>
                </div>
                {/* Add more products here if needed */}
              </div>
            </div>
            <div className="w-full lg:w-1/3 text-center mt-4 lg:mt-0 lg:ml-8">
              <p className="text-gray-700">No purchases found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
