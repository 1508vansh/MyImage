import React, { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient';

const TopSearchesBanner = () => {
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSearches();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await axiosClient.get('/api/top-searches');
      setTopSearches(response.data);
    } catch (error) {
      console.error('Failed to fetch top searches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="border-b py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
            <div className="text-gray-700">•</div>
            <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (topSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary-50 border-b py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="font-semibold text-primary">Trending Searches:</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {topSearches.map((search, index) => (
              <div key={search.term} className="flex items-center space-x-1">
                <span className="bg-white px-2 py-1 rounded border text-primary font-medium">
                  #{search.term}
                </span>
                {index < topSearches.length - 1 && (
                  <span className="text-primary">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSearchesBanner;