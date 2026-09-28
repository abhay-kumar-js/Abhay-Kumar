import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('abhay_auth_token');
        if (token) {
          const res = await api.auth.getMe();
          if (res.success && res.data) {
            setUser(res.data);
          } else {
            localStorage.removeItem('abhay_auth_token');
            setUser(null);
          }
        }
      } catch (err) {
        localStorage.removeItem('abhay_auth_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.auth.login({ email, password });
    if (res.success && res.data) {
      if (res.data.token) {
        localStorage.setItem('abhay_auth_token', res.data.token);
      }
      setUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      });
      return res.data;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      console.warn('Logout warning:', err.message);
    } finally {
      localStorage.removeItem('abhay_auth_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
