// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <StatusBar style="auto" backgroundColor="transparent" translucent />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="detail/[id]"
            options={{
              headerShown: true,
              presentation: "card",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="document/[id]"
            options={{
              headerShown: true,
              presentation: "card",
              headerBackTitle: "Back",
            }}
          />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}