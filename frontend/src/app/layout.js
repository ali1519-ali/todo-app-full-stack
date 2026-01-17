// frontend/src/app/layout.js
import './globals.css';
import '../components/auth/animations.css';
import Navbar from '../components/layout/Navbar';
import AuthProviderWrapper from '../components/providers/AuthProviderWrapper';

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo application with authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProviderWrapper>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Todo App. All rights reserved.
              </p>
            </div>
          </footer>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}