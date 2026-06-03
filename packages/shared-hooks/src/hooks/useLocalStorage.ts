import { useState, useEffect, useCallback } from 'react';

export interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  removeValue: () => void;
}

/**
 * Hook for managing localStorage state
 */
export function useLocalStorage<T = any>(key: string, defaultValue?: T): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue ?? null;
    }
  });

  const setStoredValue = useCallback(
    (newValue: T | null) => {
      try {
        setValue(newValue);
        if (newValue === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setValue(null);
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  // Listen for storage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (error) {
          console.error(`Error parsing storage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
  };
}
