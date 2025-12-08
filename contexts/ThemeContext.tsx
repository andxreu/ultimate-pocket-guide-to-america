// contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useColorScheme, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors as lightColors, darkColors } from "@/styles/commonStyles";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  isDark: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_KEY = "app_theme_preference_v2";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>("system");

  // Load saved preference on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setThemeState(saved);
        }
      } catch (e) {
        if (__DEV__) console.log("Theme load error:", e);
      }
    })();
  }, []);

  const setTheme = useCallback(async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
      if (__DEV__) console.log("Theme save error:", e);
    }
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const effectiveTheme = theme === "system" ? (systemTheme || "light") : theme;
  const isDark = effectiveTheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  const value = {
    theme,
    effectiveTheme,
    isDark,
    colors,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}