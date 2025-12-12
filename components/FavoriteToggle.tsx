import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";

interface FavoriteToggleProps {
  itemId: string;
  size?: number;
}

/**
 * FavoriteToggle Component
 * Animated star button to toggle favorite status
 */
export function FavoriteToggle({ itemId, size = 24 }: FavoriteToggleProps) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Early return AFTER all hooks
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

      // Pulse animation
      scale.value = withSequence(
        withSpring(1.3, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );

      // Haptic feedback
      if (Platform.OS !== 'web') {
        try {
          Haptics.impactAsync(
            isCurrentlyFavorite 
              ? Haptics.ImpactFeedbackStyle.Light 
              : Haptics.ImpactFeedbackStyle.Medium
          );
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
    <TouchableOpacity
      onPress={toggleFavorite}
      style={styles.container}
      accessibilityLabel={
        isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"
      }
      accessibilityRole="button"
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Animated.View style={animatedStyle}>
        <MaterialIcons
          name={isCurrentlyFavorite ? "star" : "star-border"}
          size={size}
          color={isCurrentlyFavorite ? colors.primary : colors.textSecondary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});