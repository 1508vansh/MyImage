import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchBar = ({ initialTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for amazing images..."
          className="w-full px-6 py-4 sm:text-lg text-sm border border-gray-300 rounded-2xl text-gray-600 shadow-sm outline-none smooth-transition"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-black px-6 py-2 rounded-xl smooth-transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;