
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Page } from '../types';
import Spinner from '../components/Spinner';

interface LoginPageProps {
  setCurrentPage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      // On successful login, the App component will handle the redirect
    } catch (err) {
      // Error is handled in the auth context
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <button onClick={() => setCurrentPage('register')} className="font-medium text-sky-400 hover:text-sky-300">
              create a new account
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password-input" className="sr-only">Password</label>
              <input
                id="password-input"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:bg-sky-800 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner/> : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
