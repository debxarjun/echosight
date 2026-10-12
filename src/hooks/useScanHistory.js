import { useState, useEffect, useCallback } from 'react';

const HISTORY_STORAGE_KEY = 'echosight-history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Generate a unique ID using crypto.randomUUID with fallback.
 */
function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'scan-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

/**
 * Custom hook for scan history persistence and management.
 */
export function useScanHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, MAX_HISTORY_ITEMS);
        }
      }
    } catch (e) {
      console.warn('Unable to load scan history from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Unable to persist scan history to localStorage:', e);
    }
  }, [history]);

  const addScan = useCallback((mode, description, imageData) => {
    const newEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      mode: mode || 'general',
      description: description || '',
      imageData: imageData || null
    };

    setHistory((prevHistory) => [newEntry, ...prevHistory].slice(0, MAX_HISTORY_ITEMS));
    return newEntry;
  }, []);

  const deleteScan = useCallback((id) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.warn('Unable to clear scan history from localStorage:', e);
    }
  }, []);

  return {
    history,
    addScan,
    deleteScan,
    clearHistory
  };
}

export default useScanHistory;
