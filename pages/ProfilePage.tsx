
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <p className="text-center text-gray-400">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : user.username}</h1>
            <p className="text-sky-400">{user.username}</p>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-400">Email</dt>
                    <dd className="mt-1 text-sm text-white">{user.email}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-400">Roles</dt>
                    <dd className="mt-1 text-sm text-white">{user.roles.join(', ')}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-400">Status</dt>
                    <dd className={`mt-1 text-sm font-semibold ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>{user.isActive ? 'Active' : 'Inactive'}</dd>
                </div>
                 <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-400">Member Since</dt>
                    <dd className="mt-1 text-sm text-white">{new Date(user.createdAt).toLocaleDateString()}</dd>
                </div>
            </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
