import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg"></div>
            <Link to={()=>navigate('/')} className="text-xl font-bold text-gray-800">MyImage</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.name}</span>
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <button
                  onClick={logout}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg smooth-transition"
                >
                  Logout
                </button>
              </>
            ) : (
               <button
                  onClick={() => navigate('/Login')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg smooth-transition"
                >
                  Login
                </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {user.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg smooth-transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => login('google')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg smooth-transition"
                >
                  Login with Google
                </button>
                <button
                  onClick={() => login('facebook')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg smooth-transition"
                >
                  Login with Facebook
                </button>
                <button
                  onClick={() => login('github')}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg smooth-transition"
                >
                  Login with GitHub
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;