import React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import * as Haptics from "expo-haptics";

interface FavoriteToggleProps {
  itemId: string;
  size?: number; // icon size, not button size
}

export function FavoriteToggle({ itemId, size = 22 }: FavoriteToggleProps) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(itemId);

  const toggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }

    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      hitSlop={8}
      style={styles.button}
      accessibilityLabel={
        isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"
      }
      accessibilityRole="button"
    >
      <IconSymbol
        ios_icon_name={isCurrentlyFavorite ? "star.fill" : "star"}
        android_material_icon_name={isCurrentlyFavorite ? "star" : "star_border"}
        size={size}
        color={isCurrentlyFavorite ? colors.primary : colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,              // fixed square touch target
    height: 32,
    borderRadius: 16,       // perfect circle
    alignItems: "center",
    justifyContent: "center",
    // IMPORTANT:
    // no padding, no marginRight here
    // spacing from the screen edge will be handled by headerRight wrapper
  },
});
