import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Reading history item
 */
export interface ReadingItem {
  /** Unique identifier for the item */
  id: string;
  /** Display title of the item */
  title: string;
  /** Section/category the item belongs to */
  section: string;
  /** Unix timestamp when item was accessed */
  timestamp: number;
}

/**
 * Reading history context type
 */
interface ReadingHistoryContextType {
  /** Last item user read/viewed */
  lastReadItem: ReadingItem | null;
  /** Recently viewed items (most recent first) */
  recentlyViewed: ReadingItem[];
  /** Add item to reading history */
  addToHistory: (item: Omit<ReadingItem, 'timestamp'>) => Promise<void>;
  /** Clear all reading history */
  clearHistory: () => Promise<void>;
  /** Remove specific item from history */
  removeFromHistory: (id: string) => Promise<void>;
  /** Whether history has loaded from storage */
  isLoaded: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const LAST_READ_KEY = 'app_last_read_item';
const RECENTLY_VIEWED_KEY = 'app_recently_viewed';

/**
 * Maximum number of items to keep in recently viewed history
 * @constant
 */
export const MAX_RECENT_ITEMS = 10;

// ============================================================================
// CONTEXT
// ============================================================================

const ReadingHistoryContext = createContext<ReadingHistoryContextType | undefined>(undefined);

/**
 * Reading History Provider Component
 * 
 * Manages user's reading history with AsyncStorage persistence.
 * 
 * Features:
 * - Tracks last read item for "Continue Reading"
 * - Maintains recently viewed list (max 10 items)
 * - Automatic deduplication
 * - Most recent items appear first
 * - Persistent across app sessions
 * - Optimistic updates
 * - Error handling
 * 
 * @example
 * ```tsx
 * <ReadingHistoryProvider>
 *   <App />
 * </ReadingHistoryProvider>
 * ```
 */
export function ReadingHistoryProvider({ children }: { children: ReactNode }) {
  const [lastReadItem, setLastReadItem] = useState<ReadingItem | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<ReadingItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Load history on mount
   */
  useEffect(() => {
    loadHistory();
  }, []);

  /**
   * Load reading history from AsyncStorage
   */
  const loadHistory = async () => {
    try {
      const [lastReadData, recentlyViewedData] = await Promise.all([
        AsyncStorage.getItem(LAST_READ_KEY),
        AsyncStorage.getItem(RECENTLY_VIEWED_KEY),
      ]);

      // Parse last read item
      if (lastReadData) {
        try {
          const parsed = JSON.parse(lastReadData);
          setLastReadItem(parsed);
        } catch (parseError) {
          if (__DEV__) {
            console.error('Error parsing last read item:', parseError);
          }
        }
      }

      // Parse recently viewed items
      if (recentlyViewedData) {
        try {
          const parsed = JSON.parse(recentlyViewedData);
          // Validate it's an array
          setRecentlyViewed(Array.isArray(parsed) ? parsed : []);
        } catch (parseError) {
          if (__DEV__) {
            console.error('Error parsing recently viewed:', parseError);
          }
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading reading history:', error);
      }
    } finally {
      setIsLoaded(true);
    }
  };

  /**
   * Add item to reading history
   * 
   * @param item - Item to add (timestamp will be added automatically)
   * @returns Promise that resolves when saved
   * 
   * Behavior:
   * - Sets as last read item
   * - Adds to front of recently viewed list
   * - Removes existing entry if present (deduplication)
   * - Limits recently viewed to MAX_RECENT_ITEMS
   */
  const addToHistory = useCallback(async (item: Omit<ReadingItem, 'timestamp'>): Promise<void> => {
    try {
      const newItem: ReadingItem = {
        ...item,
        timestamp: Date.now(),
      };

      // Update last read item
      setLastReadItem(newItem);
      await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(newItem));

      // Update recently viewed list
      setRecentlyViewed((prev) => {
        // Remove existing entry if present (deduplication)
        const filtered = prev.filter((i) => i.id !== item.id);
        
        // Add to front and limit size
        const updated = [newItem, ...filtered].slice(0, MAX_RECENT_ITEMS);
        
        // Save asynchronously (optimistic update)
        AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated)).catch((error) => {
          if (__DEV__) {
            console.error('Error saving recently viewed:', error);
          }
        });
        
        return updated;
      });
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving reading history:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Clear all reading history
   * 
   * @returns Promise that resolves when storage is cleared
   * @throws Error if storage operation fails
   * 
   * Removes both last read item and recently viewed list
   */
  const clearHistory = useCallback(async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(LAST_READ_KEY),
        AsyncStorage.removeItem(RECENTLY_VIEWED_KEY),
      ]);
      
      setLastReadItem(null);
      setRecentlyViewed([]);
    } catch (error) {
      if (__DEV__) {
        console.error('Error clearing reading history:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Remove specific item from history
   * 
   * @param id - Unique identifier of item to remove
   * @returns Promise that resolves when saved
   * @throws Error if storage operation fails
   * 
   * If item is the last read item, also clears that
   */
  const removeFromHistory = useCallback(async (id: string): Promise<void> => {
    try {
      // Remove from recently viewed
      setRecentlyViewed((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        
        // Save asynchronously (optimistic update)
        AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated)).catch((error) => {
          if (__DEV__) {
            console.error('Error saving recently viewed:', error);
          }
        });
        
        return updated;
      });

      // If removed item was last read, clear it
      if (lastReadItem?.id === id) {
        setLastReadItem(null);
        await AsyncStorage.removeItem(LAST_READ_KEY);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error removing from history:', error);
      }
      throw error;
    }
  }, [lastReadItem]);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      lastReadItem,
      recentlyViewed,
      addToHistory,
      clearHistory,
      removeFromHistory,
      isLoaded,
    }),
    [lastReadItem, recentlyViewed, addToHistory, clearHistory, removeFromHistory, isLoaded]
  );

  return (
    <ReadingHistoryContext.Provider value={contextValue}>
      {children}
    </ReadingHistoryContext.Provider>
  );
}

/**
 * Hook to access reading history context
 * 
 * @returns ReadingHistoryContextType object with history state and methods
 * @throws Error if used outside ReadingHistoryProvider
 * 
 * @example
 * ```tsx
 * function DocumentScreen({ id, title, section }) {
 *   const { addToHistory } = useReadingHistory();
 *   
 *   useEffect(() => {
 *     addToHistory({ id, title, section });
 *   }, [id]);
 *   
 *   return <View>...</View>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function HomeScreen() {
 *   const { lastReadItem, recentlyViewed } = useReadingHistory();
 *   
 *   return (
 *     <View>
 *       {lastReadItem && <LastReadCard />}
 *       {recentlyViewed.length > 0 && <RecentlyViewedList />}
 *     </View>
 *   );
 * }
 * ```
 */
export function useReadingHistory(): ReadingHistoryContextType {
  const context = useContext(ReadingHistoryContext);
  
  if (!context) {
    throw new Error('useReadingHistory must be used within ReadingHistoryProvider');
  }
  
  return context;
}