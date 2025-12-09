
import React from "react";
import { View, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

interface FavoriteToggleProps {
  itemId: string;
  size?: number;
}

export function FavoriteToggle({ itemId, size = 24 }: FavoriteToggleProps) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (!itemId) {
    if (__DEV__) {
      console.log('FavoriteToggle: itemId is required');
    }
    return null;
  }

  const isCurrentlyFavorite = isFavorite(itemId);

  const toggleFavorite = () => {
    try {
      if (isCurrentlyFavorite) {
        removeFavorite(itemId);
      } else {
        addFavorite(itemId);
      }

      if (Platform.OS === "ios") {
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (error) {
          if (__DEV__) {
            console.log('Haptics error:', error);
          }
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error toggling favorite:', error);
      }
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
        accessibilityLabel={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
