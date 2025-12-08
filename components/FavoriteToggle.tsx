
import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import * as Haptics from "expo-haptics";

interface FavoriteToggleProps {
  itemId: string;
  size?: number; // icon size, not button size
}

export function FavoriteToggle({ itemId, size = 24 }: FavoriteToggleProps) {
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
    <View style={styles.container}>
      <IconSymbol
        ios_icon_name={isCurrentlyFavorite ? "star.fill" : "star"}
        android_material_icon_name={
          isCurrentlyFavorite ? "star" : "star_border"
        }
        size={size}
        color={isCurrentlyFavorite ? colors.primary : colors.text}
        onPress={toggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
