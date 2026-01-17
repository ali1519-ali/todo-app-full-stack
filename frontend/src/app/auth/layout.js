// frontend/src/app/auth/layout.js
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <header>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="logo">Todo App</Link>
          </div>
        </nav>
      </header>
      
      <main className="auth-main">
        {children}
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
}