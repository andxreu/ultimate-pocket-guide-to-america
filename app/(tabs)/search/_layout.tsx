
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

export default function SearchLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { 
          backgroundColor: colors.background 
        },
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: "Search",
        }}
      />
    </Stack>
  );
}
