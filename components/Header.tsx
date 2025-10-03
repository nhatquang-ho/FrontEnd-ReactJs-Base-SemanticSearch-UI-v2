
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      active
        ? 'bg-slate-700 text-white'
        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-sky-400 cursor-pointer" onClick={() => setCurrentPage('home')}>
                SemanticSearch
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink active={currentPage === 'home'} onClick={() => setCurrentPage('home')}>
                  Home
                </NavLink>
                {isAuthenticated && (
                  <NavLink active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')}>
                    Profile
                  </NavLink>
                )}
                {isAuthenticated && user?.roles.includes('ADMIN') && (
                  <NavLink active={currentPage === 'admin'} onClick={() => setCurrentPage('admin')}>
                    Admin
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">Welcome, {user?.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="bg-transparent border border-sky-500 text-sky-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-500 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="bg-sky-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
