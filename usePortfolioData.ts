import { useState, useEffect, useCallback } from 'react';
import type { PortfolioData, ActivityLog } from '@/admin/types';
import { defaultPortfolioData } from '@/admin/data/defaultData';

const STORAGE_KEY = 'ms_portfolio_data';
const SESSION_KEY = 'ms_admin_session';

interface Session {
  loggedIn: boolean;
  timestamp: string;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({ ...defaultPortfolioData, ...parsed });
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateData = useCallback((updates: Partial<PortfolioData>) => {
    setData(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const addActivity = useCallback((action: string) => {
    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      activityLog: [newActivity, ...prev.activityLog.slice(0, 49)],
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `ms-portfolio-data-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addActivity('Exported all data as JSON');
  }, [data, addActivity]);

  const importData = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setData({ ...defaultPortfolioData, ...parsed });
      addActivity('Imported data from JSON');
      return true;
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  }, [addActivity]);

  const resetToDefaults = useCallback(() => {
    setData(defaultPortfolioData);
    addActivity('Reset all content to defaults');
  }, [addActivity]);

  return {
    data,
    isLoaded,
    updateData,
    addActivity,
    exportData,
    importData,
    resetToDefaults,
  };
}

export function useAdminSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const parsed: Session = JSON.parse(session);
        const sessionAge = Date.now() - new Date(parsed.timestamp).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        if (parsed.loggedIn && sessionAge < maxAge) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsSessionChecked(true);
  }, []);

  const login = useCallback(() => {
    const session: Session = {
      loggedIn: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isSessionChecked,
    login,
    logout,
  };
}

export function usePIN() {
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [pin, setPIN] = useState('1234');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.settings?.pin) {
          setPIN(parsed.settings.pin);
        }
      } catch (e) {
        console.error('Failed to load PIN:', e);
      }
    }
  }, []);

  const verifyPIN = useCallback((input: string): boolean => {
    if (lockedUntil && Date.now() < lockedUntil) {
      return false;
    }

    if (input === pin) {
      setAttempts(0);
      setLockedUntil(null);
      return true;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 3) {
      setLockedUntil(Date.now() + 60 * 1000); // 60 seconds
      setAttempts(0);
    }

    return false;
  }, [pin, attempts, lockedUntil]);

  const updatePIN = useCallback((newPIN: string) => {
    setPIN(newPIN);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        parsed.settings = { ...parsed.settings, pin: newPIN };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      } catch (e) {
        console.error('Failed to update PIN:', e);
      }
    }
  }, []);

  const getLockoutTimeRemaining = useCallback(() => {
    if (!lockedUntil) return 0;
    const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  }, [lockedUntil]);

  return {
    verifyPIN,
    updatePIN,
    attempts,
    lockedUntil,
    getLockoutTimeRemaining,
  };
}
