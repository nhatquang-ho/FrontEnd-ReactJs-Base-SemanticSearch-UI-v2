
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import { useAuth } from './hooks/useAuth';
import { Page } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAuthenticated, user } = useAuth();

  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === 'login') return <LoginPage setCurrentPage={setCurrentPage} />;
      if (currentPage === 'register') return <RegisterPage setCurrentPage={setCurrentPage} />;
      return <HomePage />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        if (user?.roles.includes('ADMIN')) {
          return <AdminPage />;
        }
        setCurrentPage('home'); // Redirect if not admin
        return <HomePage />;
      case 'login':
      case 'register':
         // If authenticated, redirect from login/register to home
        setCurrentPage('home');
        return <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
