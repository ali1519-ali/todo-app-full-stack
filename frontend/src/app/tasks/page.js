// frontend/src/app/tasks/page.js
'use client'; // This is a client-side component

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import Link from 'next/link';

export default function TasksPage() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="text-center animate-pulse">
          <div className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 h-16 w-16 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p className="mt-4 text-lg text-indigo-600 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50 animate-fade-in-up">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
              Authentication Required
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              You need to be signed in to access your tasks.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/login"
                className="inline-flex items-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform transition-all duration-300 hover:scale-[1.02]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the token directly when needed
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || '';
    }
    return '';
  };

  const authToken = getToken();

  const refreshTasks = () => {
    // This function would trigger a re-fetch of tasks
    // In a real implementation, this might use a state management solution
    // or a more sophisticated data fetching mechanism
    window.location.reload(); // Simple refresh for now
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in-down">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Your Tasks
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-indigo-700 hidden md:block bg-white/80 px-4 py-2 rounded-full shadow-sm">
                Welcome, {user?.email?.split('@')[0]}
              </span>
              <Link
                href="/auth/logout"
                className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transform transition-all duration-300 hover:scale-[1.02]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          </div>

          {user && authToken ? (
            <div className="space-y-8 animate-fade-in-up delay-100">
              <TaskForm
                userId={user.id}
                authToken={authToken}
                onCreate={refreshTasks}
              />
              <TaskList
                userId={user.id}
                authToken={authToken}
              />
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">Loading user information...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}