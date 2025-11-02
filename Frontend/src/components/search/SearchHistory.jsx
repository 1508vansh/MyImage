import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axiosClient from '../../utils/axiosClient';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSearchHistory();
    }
  }, [user]);

  const fetchSearchHistory = async () => {
    try {
      const response = await axiosClient.get('/api/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch search history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Search History</h3>
        <div className="text-gray-500 text-center py-4">
          Please log in to view your search history
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Search History</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse-custom flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Search History</h3>
        {history.length > 0 && (
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {history.length} searches
          </span>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          <div className="text-4xl mb-2">🔍</div>
          <p>Your search history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg smooth-transition"
            >
              <span className="font-medium text-gray-700 capitalize pr-5">{item.term}</span>
              <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;