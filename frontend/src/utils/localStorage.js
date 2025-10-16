const STORAGE_KEY = 'symptomHistory';
const MAX_HISTORY_ITEMS = 50;

const isLocalStorageAvailable = () => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveToHistory = (data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    const history = getHistory();
    
    const newEntry = {
      id: generateUniqueId(),
      timestamp: data.timestamp || new Date().toISOString(),
      patientData: data.patientData,
      analysis: data.analysis
    };

    const updatedHistory = [newEntry, ...history];

    if (updatedHistory.length > MAX_HISTORY_ITEMS) {
      updatedHistory.splice(MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
      clearOldestHistory();
      return saveToHistory(data);
    }
    console.error('Error saving to localStorage:', e);
    return false;
  }
};

export const getHistory = () => {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return [];
  }
};

export const getHistoryById = (id) => {
  try {
    const history = getHistory();
    return history.find(item => item.id === id) || null;
  } catch (e) {
    console.error('Error getting history item:', e);
    return null;
  }
};

export const clearHistory = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Error clearing localStorage:', e);
    return false;
  }
};

export const deleteHistoryItem = (id) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (e) {
    console.error('Error deleting history item:', e);
    return false;
  }
};

const clearOldestHistory = () => {
  try {
    const history = getHistory();
    if (history.length > 0) {
      history.pop();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (e) {
    console.error('Error clearing oldest history:', e);
  }
};

const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getStorageSize = () => {
  if (!isLocalStorageAvailable()) {
    return 0;
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Blob([data]).size : 0;
  } catch (e) {
    console.error('Error calculating storage size:', e);
    return 0;
  }
};
