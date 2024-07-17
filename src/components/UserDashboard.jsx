import React from 'react';
import { useAuth } from '../AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">User Dashboard</h2>
        {user ? (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Welcome, {user.name || user.email}!</h3>
            <div className="mt-4">
              <h4 className="text-xl font-medium text-gray-700">User Information</h4>
              <p className="text-gray-700 mt-2"><strong>Email:</strong> {user.email}</p>
              {user.name && <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>}
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mt-2">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
