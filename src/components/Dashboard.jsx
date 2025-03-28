import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/purchases`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Purchases:', data);
          setPurchases(data);
        } else {
          console.error('Failed to fetch purchases');
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    if (user) {
      fetchPurchases();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <div className="flex items-center mb-8">
          <FaUserCircle className="text-6xl text-gray-700 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.username.split('@')[0]}!</h2>
            <p className="text-gray-600">Here is your account information and purchase history.</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-8 text-left">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Email: </strong> {user.username}</p>
          <div className="flex items-center mt-2">
            <strong className="text-gray-700">Password: </strong> 
            <span className="ml-2 text-black">******</span>
            <FaEdit 
              className="ml-2 text-blue-500 cursor-pointer"
              onClick={() => navigate('/change-password')}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Purchase History</h3>
          {purchases.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-2/3 text-left">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
                  {purchases.map((purchase) => (
                    <div key={purchase._id} className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                      <p className="text-gray-700"><strong>Product Name:</strong> {purchase.name}</p>
                      <p className="text-gray-700"><strong>Date Added:</strong> {new Date(purchase.addedAt).toLocaleDateString()}</p>
                      <p className="text-gray-700"><strong>Brand:</strong> {purchase.brand || 'N/A'}</p>
                      <p className="text-gray-700"><strong>DPI:</strong> {purchase.dpi || 'N/A'}</p>
                      <p className="text-gray-700"><strong>Sensitivity:</strong> {purchase.sensitivity || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-1/3 text-center mt-4 lg:mt-0 lg:ml-8">
              <p className="text-gray-700">No purchases found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
