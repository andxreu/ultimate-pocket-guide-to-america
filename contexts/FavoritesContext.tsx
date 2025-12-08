// contexts/FavoritesContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

const FAVORITES_KEY = "favorites_v3";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearAll: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load once on mount
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(FAVORITES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setFavorites(Array.isArray(parsed) ? parsed : []);
        }
      } catch (e) {
        if (__DEV__) console.log("Favorites load error:", e);
      } finally {
        setIsLoaded(true);
      }
    };
    load();
  }, []);

  // Save with debounce + error resilience
  const saveFavorites = useCallback(async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      if (__DEV__) console.log("Favorites save error:", e);
    }
  }, []);

  const addFavorite = useCallback(
    (id: string) => {
      setFavorites(prev => {
        if (prev.includes(id)) return prev;
        const updated = [...prev, id];
        saveFavorites(updated);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return updated;
      });
    },
    [saveFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites(prev => {
        const updated = prev.filter(f => f !== id);
        saveFavorites(updated);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        return updated;
      });
    },
    [saveFavorites]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites(prev => {
        const exists = prev.includes(id);
        const updated = exists ? prev.filter(f => f !== id) : [...prev, id];
        saveFavorites(updated);
        Haptics.impactAsync(
          exists
            ? Haptics.ImpactFeedbackStyle.Medium
            : Haptics.ImpactFeedbackStyle.Heavy
        );
        return updated;
      });
    },
    [saveFavorites]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const clearAll = useCallback(() => {
    setFavorites([]);
    AsyncStorage.removeItem(FAVORITES_KEY);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  // Prevent flash of empty state
  if (!isLoaded) return null;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearAll,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}