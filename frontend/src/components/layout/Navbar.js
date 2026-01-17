// frontend/src/components/layout/Navbar.js
'use client';

import { useAuth } from '../../lib/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // This is to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render nothing on the server, prevent mismatch
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-lg shadow-indigo-100/50 backdrop-blur-lg border-b border-white/20">
      <nav className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center transform transition-transform duration-300 hover:scale-105">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="ml-3 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Todo App
                </span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-2">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-white/50 transition-all duration-300"
                >
                  Home
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/tasks"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-white/50 transition-all duration-300"
                  >
                    Tasks
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-6">
                  <div className="hidden md:block bg-white/80 px-4 py-2 rounded-full shadow-sm border border-indigo-100">
                    <span className="text-sm font-bold text-indigo-700">
                      Welcome, {user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <Link
                    href="/auth/logout"
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white shadow-lg bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-sm font-bold rounded-xl text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;