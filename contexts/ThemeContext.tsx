import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { colors, darkColors, animations, shadows, glassmorphism } from '@/styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  toggleTheme: () => Promise<void>;
  colors: typeof colors;
  isDark: boolean;
  animations: typeof animations;
  shadows: typeof shadows;
  glassmorphism: typeof glassmorphism;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = 'app_theme_preference';

/**
 * Theme Provider Component
 * Manages app-wide theme state with persistence
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load saved theme preference on mount
   */
  useEffect(() => {
    loadThemePreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Load theme preference from AsyncStorage
   */
  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        // Use system preference if no saved theme
        const defaultTheme = systemColorScheme === 'light' ? 'light' : 'dark';
        setThemeState(defaultTheme);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading theme preference:', error);
      }
      // Fallback to system preference on error
      setThemeState(systemColorScheme === 'light' ? 'light' : 'dark');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update theme and persist to storage
   */
  const setTheme = async (newTheme: Theme): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving theme preference:', error);
      }
      // Still update UI even if save fails
      setThemeState(newTheme);
      throw error; // Re-throw so caller knows save failed
    }
  };

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = async (): Promise<void> => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await setTheme(newTheme);
  };

  /**
   * Memoized values for performance
   */
  const isDark = theme === 'dark';
  const currentColors = isDark ? darkColors : colors;

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      colors: currentColors,
      isDark,
      animations,
      shadows,
      glassmorphism,
    }),
    [theme, currentColors, isDark, setTheme, toggleTheme]
  );

  // Show nothing while theme loads (prevents flash)
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}