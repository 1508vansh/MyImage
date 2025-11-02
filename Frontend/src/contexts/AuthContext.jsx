import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const AuthContext = createContext();

export const useAuth = () => {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get('/api/auth/user');
      setUser(response?.data?.user);
    } catch (error) {
      // User is not authenticated, which is fine
      console.log('User not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const login = (provider) => {
    // Redirect to OAuth provider
    console.log("redirecting to the provider");
    window.location.href = `https://myimage-production-b39f.up.railway.app/api/auth/${provider}`;
    console.log("done");
  };

  const logout = async () => {
    try {
      await axiosClient.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};