import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Home Layout Component
 * Handles the navigation stack for the home section
 * Integrates with theme context for consistent styling
 */
export default function HomeLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { 
          backgroundColor: colors.background 
        },
        animation: 'fade',
        animationDuration: 200,
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: "Home",
          // Optimize performance
          lazy: true,
        }}
      />
    </Stack>
  );
}