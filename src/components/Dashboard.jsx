import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Redirigir al login si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Dashboard</h2>
        <p className="text-xl text-gray-700">Welcome, {user.username}!</p>
      </div>
    </div>
  );
};

export default Dashboard;
