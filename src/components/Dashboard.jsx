import React from 'react';
import { useAuth } from '../AuthContext';
import { FaChartBar, FaUsers, FaCogs, FaFileAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform duration-500 ease-in-out">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Loading...</h2>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full text-center transition-transform transform duration-500 ease-in-out">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">User Dashboard</h2>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <FaChartBar className="text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Analytics</h3>
            <p className="text-lg">View detailed analytics</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <FaUsers className="text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Users</h3>
            <p className="text-lg">Manage user accounts</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <FaCogs className="text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Settings</h3>
            <p className="text-lg">Adjust your preferences</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
            <FaFileAlt className="text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Reports</h3>
            <p className="text-lg">Generate various reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
