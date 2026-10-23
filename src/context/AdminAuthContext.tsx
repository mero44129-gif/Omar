import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthConfig {
  firebaseConfigured: boolean;
  firebaseProjectId: string | null;
  hasCustomAdminPassword: boolean;
  mode: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  authConfig: AuthConfig | null;
  isLoading: boolean;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('coach_omar_admin_token');
    }
    return null;
  });
  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth-config')
      .then(res => res.json())
      .then(data => {
        setAuthConfig(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn('Could not reach auth-config endpoint:', err);
        setAuthConfig({
          firebaseConfigured: false,
          firebaseProjectId: null,
          hasCustomAdminPassword: false,
          mode: 'setup-required-or-local'
        });
        setIsLoading(false);
      });
  }, []);

  const login = async (password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setToken(data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('coach_omar_admin_token', data.token);
        }
        return { success: true };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch {
      return { success: false, error: 'Connection error while authenticating.' };
    }
  };

  const logout = () => {
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('coach_omar_admin_token');
    }
  };

  const value = {
    isAuthenticated: Boolean(token),
    token,
    authConfig,
    isLoading,
    login,
    logout
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
