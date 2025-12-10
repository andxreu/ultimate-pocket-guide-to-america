
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_READ_KEY = 'last_read_item';
const RECENTLY_VIEWED_KEY = 'recently_viewed_items';
const MAX_RECENT_ITEMS = 5;

export interface ReadingHistoryItem {
  id: string;
  title: string;
  section: string;
  timestamp: number;
}

interface ReadingHistoryContextType {
  lastReadItem: ReadingHistoryItem | null;
  recentlyViewed: ReadingHistoryItem[];
  saveReadingHistory: (item: Omit<ReadingHistoryItem, 'timestamp'>) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const ReadingHistoryContext = createContext<ReadingHistoryContextType | undefined>(undefined);

export function ReadingHistoryProvider({ children }: { children: ReactNode }) {
  const [lastReadItem, setLastReadItem] = useState<ReadingHistoryItem | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<ReadingHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const [lastReadData, recentData] = await Promise.all([
        AsyncStorage.getItem(LAST_READ_KEY),
        AsyncStorage.getItem(RECENTLY_VIEWED_KEY),
      ]);

      if (lastReadData) {
        setLastReadItem(JSON.parse(lastReadData));
      }

      if (recentData) {
        setRecentlyViewed(JSON.parse(recentData));
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error loading reading history:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveReadingHistory = async (item: Omit<ReadingHistoryItem, 'timestamp'>) => {
    try {
      const historyItem: ReadingHistoryItem = {
        ...item,
        timestamp: Date.now(),
      };

      // Save as last read
      await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(historyItem));
      setLastReadItem(historyItem);

      // Update recently viewed (remove duplicates and add to front)
      const filtered = recentlyViewed.filter(i => i.id !== item.id);
      const updated = [historyItem, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      setRecentlyViewed(updated);
    } catch (error) {
      if (__DEV__) {
        console.log('Error saving reading history:', error);
      }
    }
  };

  const clearHistory = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(LAST_READ_KEY),
        AsyncStorage.removeItem(RECENTLY_VIEWED_KEY),
      ]);
      setLastReadItem(null);
      setRecentlyViewed([]);
    } catch (error) {
      if (__DEV__) {
        console.log('Error clearing history:', error);
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <ReadingHistoryContext.Provider
      value={{
        lastReadItem,
        recentlyViewed,
        saveReadingHistory,
        clearHistory,
      }}
    >
      {children}
    </ReadingHistoryContext.Provider>
  );
}

export function useReadingHistory() {
  const context = useContext(ReadingHistoryContext);
  if (!context) {
    throw new Error('useReadingHistory must be used within ReadingHistoryProvider');
  }
  return context;
}
