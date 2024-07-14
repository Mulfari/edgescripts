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
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center transition-transform transform duration-500 ease-in-out">
        <div className="flex items-center justify-center mb-6">
          <FaUserCircle className="text-6xl text-gray-700 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            <p className="text-xl text-gray-700">{user.username}</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Email:</strong> {user.email}</p>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Purchase History</h3>
          <div className="mt-4">
            {/* Aquí puedes agregar el historial de compras visualmente */}
            <p className="text-gray-700">No purchases found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
