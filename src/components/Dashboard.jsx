import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

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
          console.log('Purchases:', data);  // Verificar los datos aquí
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

  const handleCreateCharge = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: parseInt(amount, 10) * 100, currency, description })  // Convertir a centavos
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Charge created successfully: ${data.id}`);
        setAmount('');
        setCurrency('usd');
        setDescription('');
        // Fetch purchases again to update the list
        fetchPurchases();
      } else {
        const errorData = await response.json();
        setMessage(`Failed to create charge: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleEditClick = () => {
    navigate('/recovery-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full transition-transform transform duration-500 ease-in-out">
        <div className="flex items-center mb-8">
          <FaUserCircle className="text-6xl text-gray-700 mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome!</h2>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-8 text-left">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Email: </strong> {user.username}</p>
          <div className="flex items-center mt-2">
            <p className="text-gray-700"><strong>Password:</strong> ••••••••</p>
            <a
              onClick={handleEditClick}
              className="ml-4 text-blue-500 hover:text-blue-700 cursor-pointer underline"
              title="Change Password"
            >
              Change Password
            </a>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Purchase History</h3>
          {purchases.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-2/3 text-left">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                      <p className="text-gray-700"><strong>Product Name:</strong> {purchase.description}</p>
                      <p className="text-gray-700"><strong>Price:</strong> ${purchase.amount / 100}</p>
                      <p className="text-gray-700"><strong>Date:</strong> {new Date(purchase.created * 1000).toLocaleDateString()}</p>
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
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Create a Charge</h3>
          <form onSubmit={handleCreateCharge} className="mb-8 text-left">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount (in USD):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Currency:</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
            >
              Create Charge
            </button>
          </form>
          {message && <p className="text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
