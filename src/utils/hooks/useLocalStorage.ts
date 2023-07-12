import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (!data) {
      return initialValue;
    }

    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
