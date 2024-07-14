import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

const UserDashboard = () => {
  const { user, getPurchaseHistory } = useAuth();
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const history = await getPurchaseHistory(user.id);
      setPurchaseHistory(history);
    };

    if (user) {
      fetchPurchaseHistory();
    }
  }, [user, getPurchaseHistory]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">User Dashboard</h2>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">User Information</h3>
          <p className="text-gray-700 mt-2"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700 mt-2"><strong>Name:</strong> {user.name}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Purchase History</h3>
          {purchaseHistory.length > 0 ? (
            <ul className="mt-4">
              {purchaseHistory.map((purchase, index) => (
                <li key={index} className="p-4 border-b border-gray-200">
                  <p><strong>Date:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
                  <p><strong>Items:</strong> {purchase.items.join(', ')}</p>
                  <p><strong>Total:</strong> ${purchase.total.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 mt-2">No purchases found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
