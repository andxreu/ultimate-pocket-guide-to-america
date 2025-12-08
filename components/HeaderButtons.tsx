// components/HeaderButtons.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import * as Haptics from "expo-haptics";

export function HeaderRightButton() {
  const { colors } = useTheme();

  const handlePress = () => {
    Haptics.selectionAsync();
    // Future feature: Add to Favorites, Share, etc.
    // Alert.alert("Coming Soon", "This feature is in development.");
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={16}
      accessibilityLabel="More actions"
      accessibilityRole="button"
    >
      <IconSymbol
        ios_icon_name="ellipsis"
        android_material_icon_name="more_vert"
        size={26}
        color={colors.text}
      />
    </TouchableOpacity>
  );
}

export function HeaderLeftButton() {
  const { colors } = useTheme();

  const handlePress = () => {
    Haptics.selectionAsync();
    // Future: Settings, Theme toggle, About, etc.
    // Alert.alert("Settings", "Settings screen coming soon.");
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={16}
      accessibilityLabel="Settings"
      accessibilityRole="button"
    >
      <IconSymbol
        ios_icon_name="gearshape"
        android_material_icon_name="settings"
        size={26}
        color={colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});