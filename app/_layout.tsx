
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { StatusBar } from "expo-status-bar";

function RootLayoutContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <FavoritesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="detail/[id]" 
            options={{ 
              headerShown: true,
              presentation: "card",
            }} 
          />
          <Stack.Screen 
            name="document/[id]" 
            options={{ 
              headerShown: true,
              presentation: "card",
            }} 
          />
        </Stack>
      </FavoritesProvider>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
