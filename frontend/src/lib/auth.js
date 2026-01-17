// frontend/src/lib/auth.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Auth context for frontend
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for stored token and fetch user profile
        const token = localStorage.getItem('token');
        if (token) {
          // Attempt to get user profile from backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token invalid/expired, clear it
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear any stored auth data if there's an error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token } = data; // Note: backend returns access_token, not user data

        // First, get user profile using the token
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();

          // Store token and user data
          localStorage.setItem('token', access_token);
          localStorage.setItem('user', JSON.stringify(userData));

          setUser(userData);
          setIsAuthenticated(true);

          return { success: true, user: userData };
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } else {
        const errorData = await response.json();

        // Handle validation errors that might come as arrays
        let errorMessage = 'Login failed';
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // If it's a validation error array, extract the first error message
            errorMessage = errorData.detail[0]?.msg || errorData.detail[0] || 'Validation error occurred';
          } else if (typeof errorData.detail === 'object' && errorData.detail.msg) {
            // If it's a single validation error object
            errorMessage = errorData.detail.msg;
          } else {
            // Otherwise use the detail as string
            errorMessage = errorData.detail;
          }
        }

        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // For the signup->login->tasks flow, just return success
        // without automatically logging the user in
        return { success: true, user: data };
      } else {
        const errorData = await response.json();

        // Handle validation errors that might come as arrays
        let errorMessage = 'Signup failed';
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // If it's a validation error array, extract the first error message
            errorMessage = errorData.detail[0]?.msg || errorData.detail[0] || 'Validation error occurred';
          } else if (typeof errorData.detail === 'object' && errorData.detail.msg) {
            // If it's a single validation error object
            errorMessage = errorData.detail.msg;
          } else {
            // Otherwise use the detail as string
            errorMessage = errorData.detail;
          }
        }

        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint (if available)
      const token = localStorage.getItem('token');
      if (token) {
        // Note: Backend has signout but may not require API call
        // Just clear local storage
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear stored data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    register: signup, // Alias signup as register for compatibility
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component to protect routes
export const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        // Redirect to login if not authenticated
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    }, [isAuthenticated, loading, router, pathname]);

    if (loading) {
      // Show loading state while checking auth status
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      // Don't render the component if not authenticated
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};