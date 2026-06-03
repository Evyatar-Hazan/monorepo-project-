import { useState, useCallback, useEffect } from 'react';
import { User, AuthToken } from '@monorepo/shared-types';

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  token: AuthToken | null;
  login: (user: User, token: AuthToken) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

/**
 * Hook for managing authentication state
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<AuthToken | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    const savedToken = localStorage.getItem('auth_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(JSON.parse(savedToken));
      } catch (err) {
        console.error('Failed to restore auth state:', err);
      }
    }
  }, []);

  const login = useCallback((newUser: User, newToken: AuthToken) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', JSON.stringify(newToken));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('auth_user', JSON.stringify(updated));
    }
  }, [user]);

  return {
    user,
    isAuthenticated: !!user && !!token,
    token,
    login,
    logout,
    updateUser,
  };
}
