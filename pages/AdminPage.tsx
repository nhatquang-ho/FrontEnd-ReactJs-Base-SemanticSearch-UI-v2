
import React, { useState, useEffect, useCallback } from 'react';
import { UserDto } from '../types';
import * as api from '../services/api';
import Spinner from '../components/Spinner';

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleUserStatus = async (user: UserDto) => {
    try {
      if (user.isActive) {
        await api.deactivateUser(user.id);
      } else {
        await api.activateUser(user.id);
      }
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to update user status.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard - User Management</h1>
      {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
      {isLoading ? <Spinner /> : (
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Roles</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.roles.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold text-white transition-colors ${user.isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
