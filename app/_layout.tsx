import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { TextSizeProvider } from "@/contexts/TextSizeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ReadingHistoryProvider } from "@/contexts/ReadingHistoryContext";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * Inner layout component that consumes theme context
 * Handles the actual navigation stack configuration
 */
function RootLayoutContent() {
  const { isDark, colors } = useTheme();
  
  return (
    <>
      <StatusBar 
        style={isDark ? "light" : "dark"} 
        backgroundColor="transparent"
        translucent
      />
      <ReadingHistoryProvider>
        <FavoritesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: Platform.OS === 'ios' ? 'default' : 'fade',
              // Better performance with lazy loading
              lazy: true,
              // Optimize memory by unmounting inactive screens
              unmountOnBlur: false,
            }}
          >
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
              }} 
            />
            <Stack.Screen 
              name="detail/[id]" 
              options={{ 
                headerShown: true,
                presentation: "card",
                animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerShadowVisible: false,
                headerBackTitle: "Back",
                headerBackTitleVisible: Platform.OS === 'ios',
                // Smoother transitions
                animationDuration: 300,
              }} 
            />
            <Stack.Screen 
              name="document/[id]" 
              options={{ 
                headerShown: true,
                presentation: "card",
                animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerShadowVisible: false,
                headerBackTitle: "Back",
                headerBackTitleVisible: Platform.OS === 'ios',
                animationDuration: 300,
              }} 
            />
          </Stack>
        </FavoritesProvider>
      </ReadingHistoryProvider>
    </>
  );
}

/**
 * Root layout component - Entry point for the entire application
 * Wraps the app in necessary providers for theme, text size, favorites, and reading history
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <TextSizeProvider>
          <RootLayoutContent />
        </TextSizeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});