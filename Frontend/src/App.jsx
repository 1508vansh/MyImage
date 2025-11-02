import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import TopSearchesBanner from './components/search/TopSearchesBanner';
import Home from './pages/Home';
import {useAuth} from './contexts/AuthContext';
import SearchResults from './pages/SearchResults';
import LoginPage from './pages/LoginPage';
import Footer from './components/layout/Footer';

function App() {
  const {user,checkAuthStatus} = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);
  return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <TopSearchesBanner />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path='/Login' element={<LoginPage/>}/>
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
