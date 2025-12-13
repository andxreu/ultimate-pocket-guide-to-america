import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  clearAllFavorites: () => Promise<void>;
  getFavoritesCount: () => number;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Favorites Provider Component
 * 
 * Manages user's favorited items with AsyncStorage persistence.
 * 
 * Features:
 * - Persistent favorites across app sessions
 * - Add/remove/toggle favorites
 * - Check favorite status
 * - Get favorites count
 * - Clear all favorites
 * - Optimistic updates with async persistence
 * - Duplicate prevention
 * - Error handling
 * 
 * @example
 * ```tsx
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 * ```
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Load favorites on mount
   */
  useEffect(() => {
    loadFavorites();
  }, []);

  /**
   * Load favorites from AsyncStorage
   */
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);
        // Validate it's an array
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading favorites:', error);
      }
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  };

  /**
   * Save favorites to AsyncStorage
   * Centralized save function to avoid duplication
   */
  const saveFavorites = async (newFavorites: string[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving favorites:', error);
      }
      throw error;
    }
  };

  /**
   * Add item to favorites
   * 
   * @param id - Unique identifier for the item
   * @returns Promise that resolves when saved
   * 
   * Note: Prevents duplicates automatically
   */
  const addFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      // Prevent duplicates
      if (current.includes(id)) {
        return current;
      }
      
      const newFavorites = [...current, id];
      
      // Save asynchronously (optimistic update)
      saveFavorites(newFavorites).catch((error) => {
        if (__DEV__) {
          console.error('Error saving favorites:', error);
        }
      });
      
      return newFavorites;
    });
  }, []);

  /**
   * Remove item from favorites
   * 
   * @param id - Unique identifier for the item to remove
   * @returns Promise that resolves when saved
   */
  const removeFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      const newFavorites = current.filter((fav) => fav !== id);
      
      // Save asynchronously (optimistic update)
      saveFavorites(newFavorites).catch((error) => {
        if (__DEV__) {
          console.error('Error saving favorites:', error);
        }
      });
      
      return newFavorites;
    });
  }, []);

  /**
   * Toggle favorite status
   * 
   * @param id - Unique identifier for the item
   * @returns Promise that resolves when saved
   * 
   * Adds item if not favorited, removes if already favorited
   */
  const toggleFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      const newFavorites = current.includes(id)
        ? current.filter((fav) => fav !== id)
        : [...current, id];
      
      // Save asynchronously (optimistic update)
      saveFavorites(newFavorites).catch((error) => {
        if (__DEV__) {
          console.error('Error saving favorites:', error);
        }
      });
      
      return newFavorites;
    });
  }, []);

  /**
   * Check if item is favorited
   * 
   * @param id - Unique identifier for the item
   * @returns true if item is favorited, false otherwise
   */
  const isFavorite = useCallback((id: string): boolean => {
    return favorites.includes(id);
  }, [favorites]);

  /**
   * Clear all favorites
   * 
   * @returns Promise that resolves when storage is cleared
   * @throws Error if storage operation fails
   */
  const clearAllFavorites = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
      setFavorites([]);
    } catch (error) {
      if (__DEV__) {
        console.error('Error clearing favorites:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Get total count of favorites
   * 
   * @returns Number of favorited items
   */
  const getFavoritesCount = useCallback((): number => {
    return favorites.length;
  }, [favorites]);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearAllFavorites,
      getFavoritesCount,
      isLoaded,
    }),
    [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearAllFavorites, getFavoritesCount, isLoaded]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to access favorites context
 * 
 * @returns FavoritesContextType object with favorites state and methods
 * @throws Error if used outside FavoritesProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { favorites, addFavorite, isFavorite } = useFavorites();
 *   
 *   return (
 *     <Button onPress={() => addFavorite('constitution')}>
 *       {isFavorite('constitution') ? 'Unfavorite' : 'Favorite'}
 *     </Button>
 *   );
 * }
 * ```
 */
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  
  return context;
}