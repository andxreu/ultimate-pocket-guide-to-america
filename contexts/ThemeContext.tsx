import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { colors, darkColors, animations, shadows, glassmorphism } from '@/styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Available theme options
 */
export type Theme = 'light' | 'dark';

/**
 * Theme context type
 */
interface ThemeContextType {
  /** Current theme setting */
  theme: Theme;
  /** Update theme and persist to storage */
  setTheme: (theme: Theme) => Promise<void>;
  /** Toggle between light and dark themes */
  toggleTheme: () => Promise<void>;
  /** Current theme colors */
  colors: typeof colors;
  /** Whether dark theme is active */
  isDark: boolean;
  /** Animation configurations */
  animations: typeof animations;
  /** Shadow styles */
  shadows: typeof shadows;
  /** Glassmorphism styles */
  glassmorphism: typeof glassmorphism;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const THEME_STORAGE_KEY = 'app_theme_preference';

// ============================================================================
// CONTEXT
// ============================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Component
 * 
 * Manages app-wide theme state with AsyncStorage persistence.
 * 
 * Features:
 * - Light and dark theme support
 * - Persistent theme preference
 * - System theme detection as fallback
 * - Optimistic updates
 * - Prevents flash while loading
 * - Toggle functionality
 * - Complete style system (colors, shadows, animations, glassmorphism)
 * 
 * Default Behavior:
 * - Uses saved preference if available
 * - Falls back to system color scheme
 * - Defaults to dark theme if system unavailable
 * 
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
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
   * Falls back to system preference if no saved theme
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
   * 
   * @param newTheme - Theme to apply ('light' or 'dark')
   * @returns Promise that resolves when saved
   * @throws Error if storage operation fails
   * 
   * Note: Updates UI optimistically even if save fails
   */
  const setTheme = useCallback(async (newTheme: Theme): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving theme preference:', error);
      }
      // Still update UI even if save fails (optimistic update)
      setThemeState(newTheme);
      throw error; // Re-throw so caller knows save failed
    }
  }, []);

  /**
   * Toggle between light and dark themes
   * 
   * @returns Promise that resolves when saved
   * 
   * @example
   * ```tsx
   * <Button onPress={toggleTheme}>
   *   {isDark ? '☀️ Light' : '🌙 Dark'}
   * </Button>
   * ```
   */
  const toggleTheme = useCallback(async (): Promise<void> => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await setTheme(newTheme);
  }, [theme, setTheme]);

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
    [theme, setTheme, toggleTheme, currentColors, isDark]
  );

  // Show nothing while theme loads (prevents flash of wrong theme)
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
 * 
 * @returns ThemeContextType object with theme state and style system
 * @throws Error if used outside ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { colors, isDark, toggleTheme } = useTheme();
 *   
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.text }}>
 *         Current theme: {isDark ? 'Dark' : 'Light'}
 *       </Text>
 *       <Button onPress={toggleTheme}>Toggle Theme</Button>
 *     </View>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function StyledCard() {
 *   const { colors, shadows, animations } = useTheme();
 *   
 *   return (
 *     <Animated.View
 *       entering={FadeIn.duration(animations.duration.normal)}
 *       style={[
 *         { backgroundColor: colors.card },
 *         shadows.medium
 *       ]}
 *     >
 *       <Text style={{ color: colors.text }}>Content</Text>
 *     </Animated.View>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}