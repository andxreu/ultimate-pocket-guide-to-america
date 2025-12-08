// app/map/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

export default function MapLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}
    >
      {/* Main Map Explorer */}
      <Stack.Screen
        name="index"
        options={{
          title: "Map Explorer",
        }}
      />

      {/* Region Detail – full screen, no header */}
      <Stack.Screen
        name="region/[id]"
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />

      {/* State Detail – custom header with actions */}
      <Stack.Screen
        name="state/[code]"
        options={{
          headerShown: true,
          headerBackTitle: "Map",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1a1a1a",
          },
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
    </Stack>
  );
}