import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Platform } from "react-native";

/**
 * Map Layout Component
 * Handles the navigation stack for the map section
 * Includes region and state detail screens
 */
export default function MapLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { 
          backgroundColor: colors.background 
        },
        animation: Platform.OS === 'ios' ? 'default' : 'fade',
        animationDuration: 250,
      }}
    >
      {/* Main Map Screen */}
      <Stack.Screen 
        name="index"
        options={{
          title: "Map",
          headerShown: false,
        }}
      />
      
      {/* Region Detail Screen */}
      <Stack.Screen 
        name="region/[id]" 
        options={{
          headerShown: true,
          headerBackTitle: "Map",
          headerBackTitleVisible: Platform.OS === 'ios',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          presentation: "card",
          animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
        }}
      />
      
      {/* State Detail Screen */}
      <Stack.Screen 
        name="state/[code]" 
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerBackTitle: "Back",
          headerBackTitleVisible: Platform.OS === 'ios',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          presentation: "card",
          animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
        }}
      />
    </Stack>
  );
}