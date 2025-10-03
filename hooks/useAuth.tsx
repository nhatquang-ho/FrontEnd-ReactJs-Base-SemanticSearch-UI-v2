
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { UserDto, LoginResponse } from '../types';
import * as api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDto | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuthSuccess = useCallback((data: LoginResponse, profile: UserDto) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(profile);
    setError(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const profile = await api.getProfile();
        setUser(profile);
      } catch (e) {
        console.error('Failed to fetch profile, logging out.', e);
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.login(credentials);
      // We need to set the token before fetching the profile
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      const profile = await api.getProfile();
      handleAuthSuccess(response, profile);
    } catch (e: any) {
      setError(e.message || 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      await api.register(data);
      // After registration, log the user in automatically
      await login({ username: data.username, password: data.password });
    } catch (e: any) {
      setError(e.message || 'Registration failed');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };
  
  const logout = () => {
    api.logout().catch(err => console.error("Logout API call failed, clearing client-side session anyway.", err))
    .finally(() => {
      handleLogout();
    });
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    register,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
