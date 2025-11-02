import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/search/SearchBar';
import ImageGrid from '../components/search/ImageGrid';
import SearchHistory from '../components/search/SearchHistory';
import axiosClient from '../utils/axiosClient';

const SearchResults = () => {
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get search term from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }, [searchTerm]);

  const performSearch = async (term) => {
    if (!user) {
      setError('Please log in to search images');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosClient.post('/api/search', { term });
      setSearchData(response.data);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen-minus-nav flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to search for images.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen-minus-nav py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Bar */}
        <div className="px-4">
          <SearchBar initialTerm={searchTerm || ''} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-red-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Searching for "{searchTerm}"...</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-3">
            {searchData && !loading && (
              <div className="px-4">
                <ImageGrid
                  images={searchData.images}
                  searchTerm={searchData.term}
                  totalResults={searchData.total}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 px-4">
            <SearchHistory />
          </div>
        </div>

        {/* Empty State */}
        {!searchData && !loading && !error && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Start searching to see results here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;