import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, SunIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-sand-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
              <SunIcon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">Sahara Adventures</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                isActive('/') ? 'bg-primary-700' : 'hover:bg-primary-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/experiences" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                isActive('/experiences') ? 'bg-primary-700' : 'hover:bg-primary-700'
              }`}
            >
              Experiences
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                isActive('/about') ? 'bg-primary-700' : 'hover:bg-primary-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                isActive('/contact') ? 'bg-primary-700' : 'hover:bg-primary-700'
              }`}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/admin" 
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActive('/admin') ? 'bg-primary-700' : 'hover:bg-primary-700'
                  }`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-primary-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActive('/login') ? 'bg-primary-700' : 'hover:bg-primary-700'
                  }`}
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-700 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-sand-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive('/') ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                  <SunIcon className="h-5 w-5 text-white" />
                </div>
                Home
              </Link>
              <Link 
                to="/experiences" 
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive('/experiences') ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                  <SunIcon className="h-5 w-5 text-white" />
                </div>
                Experiences
              </Link>
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive('/about') ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                  <SunIcon className="h-5 w-5 text-white" />
                </div>
                About
              </Link>
              <Link 
                to="/contact" 
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive('/contact') ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                  <SunIcon className="h-5 w-5 text-white" />
                </div>
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/admin" 
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      isActive('/admin') ? 'bg-primary-700' : 'hover:bg-primary-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                      <SunIcon className="h-5 w-5 text-white" />
                    </div>
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center hover:bg-primary-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    isActive('/login') ? 'bg-primary-700' : 'hover:bg-primary-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                    <SunIcon className="h-5 w-5 text-white" />
                  </div>
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
