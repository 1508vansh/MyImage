import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/search/SearchBar';
import SearchHistory from '../components/search/SearchHistory';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { user } = useAuth();

  return (
    <>
    <div className="min-h-screen-minus-nav">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Discover Amazing{' '}
            <span className="bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Images
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search through millions of high-quality images from Unsplash. 
            {!user && ' Login to save your search history and access personalized features.'}
          </p>
          
          <div className="pt-6">
            <SearchBar />
          </div>

          {!user && (
            <div className="pt-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-yellow-800 mb-2">🔐 Authentication Required</h3>
                <p className="text-yellow-700">
                  Please log in with Google, Facebook, or GitHub to search images and access all features.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features and History Section */}
      {user && (
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              <div className="bg-linear-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore?</h2>
                <p className="text-gray-600 mb-6">
                  Start searching for images above or check out the trending searches in the banner. 
                  Your recent searches are saved automatically.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>💡</span>
                  <span>Use the multi-select feature to choose multiple images</span>
                </div>
              </div>
            </div>

            {/* Search History Sidebar */}
            <div className="lg:col-span-1">
              <SearchHistory />
            </div>
          </div>
        </section>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Home;