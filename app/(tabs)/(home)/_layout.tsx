// app/(tabs)/(home)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

export default function HomeLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Ultimate Pocket Guide to America",
          headerShown: false,
        }}
      />
    </Stack>
  );
}