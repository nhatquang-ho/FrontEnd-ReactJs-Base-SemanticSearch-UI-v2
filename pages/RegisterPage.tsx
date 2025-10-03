
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Page } from '../types';
import Spinner from '../components/Spinner';

interface RegisterPageProps {
  setCurrentPage: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const { register, loading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      // Successful registration now automatically logs in and App component will redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} className="font-medium text-sky-400 hover:text-sky-300">
              Sign in
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
          <div className="space-y-4 rounded-md shadow-sm">
            <input name="username" type="text" required placeholder="Username" value={formData.username} onChange={handleChange} className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            <input name="email" type="email" autoComplete="email" required placeholder="Email address" value={formData.email} onChange={handleChange} className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            <input name="password" type="password" autoComplete="new-password" required placeholder="Password" value={formData.password} onChange={handleChange} className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            <input name="firstName" type="text" placeholder="First Name (Optional)" value={formData.firstName} onChange={handleChange} className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            <input name="lastName" type="text" placeholder="Last Name (Optional)" value={formData.lastName} onChange={handleChange} className="relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:bg-sky-800 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner/> : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
