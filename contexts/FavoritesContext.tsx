
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      }
      setIsLoaded(true);
    } catch (error) {
      if (__DEV__) {
        console.log('Error loading favorites:', error);
      }
      setFavorites([]);
      setIsLoaded(true);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      if (__DEV__) {
        console.log('Error saving favorites:', error);
      }
    }
  };

  const addFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      if (current.includes(id)) {
        return current;
      }
      const newFavorites = [...current, id];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites)).catch((error) => {
        if (__DEV__) {
          console.log('Error saving favorites:', error);
        }
      });
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const newFavorites = current.filter((fav) => fav !== id);
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites)).catch((error) => {
        if (__DEV__) {
          console.log('Error saving favorites:', error);
        }
      });
      return newFavorites;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const newFavorites = current.includes(id)
        ? current.filter((fav) => fav !== id)
        : [...current, id];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites)).catch((error) => {
        if (__DEV__) {
          console.log('Error saving favorites:', error);
        }
      });
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
