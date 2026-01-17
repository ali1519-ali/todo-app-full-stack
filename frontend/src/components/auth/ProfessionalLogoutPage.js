// frontend/src/components/auth/ProfessionalLogoutPage.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth';
import './animations.css';

const ProfessionalLogoutPage = () => {
  const { logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown from 5 seconds
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer;
    if (isLoggingOut && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isLoggingOut && countdown === 0) {
      // After countdown, redirect to login
      router.push('/auth/login');
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoggingOut, countdown, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  const handleCancel = () => {
    router.push('/tasks'); // Redirect back to tasks
  };

  if (isLoggingOut) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50 text-center transform transition-all duration-500 hover:shadow-3xl animate-fade-in-up">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
            You've been logged out
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            You will be redirected to the login page in <span className="font-bold text-indigo-600">{countdown}</span> seconds...
          </p>

          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50 transform transition-all duration-500 hover:shadow-3xl animate-fade-in-up">
        <div className="text-center animate-fade-in-down">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
            Sign out
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Are you sure you want to sign out of your account?
          </p>
        </div>

        <div className="mt-8 animate-fade-in-up delay-100">
          <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-bold text-gray-900">Signed in as</p>
            <p className="text-base text-indigo-700 font-medium truncate">{user?.email || 'Unknown User'}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 animate-fade-in-up delay-200">
          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white shadow-lg bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transform transition-all duration-300 hover:scale-[1.02]"
          >
            Sign out
          </button>

          <button
            onClick={handleCancel}
            className="w-full flex justify-center py-3.5 px-4 border border-gray-300 text-base font-bold rounded-xl text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transform transition-all duration-300 hover:scale-[1.02]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLogoutPage;