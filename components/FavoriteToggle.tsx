
import React, { useCallback } from "react";
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
  /**
   * Unique identifier for the item to favorite
   */
  itemId: string;
  /**
   * Size of the star icon in pixels
   * @default 24
   */
  size?: number;
}

/**
 * FavoriteToggle Component
 * 
 * Animated star button to toggle favorite status with:
 * - Smooth scale animation on press
 * - Haptic feedback (medium for add, light for remove)
 * - Accessible button behavior
 * - Theme-aware colors
 * - Generous hit slop for easy tapping
 * 
 * @example
 * ```tsx
 * <FavoriteToggle itemId="constitution" />
 * 
 * <FavoriteToggle itemId="declaration" size={28} />
 * ```
 * 
 * @param itemId - Unique identifier for the item
 * @param size - Icon size in pixels (default: 24)
 */
export function FavoriteToggle({ itemId, size = 24 }: FavoriteToggleProps) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /**
   * Toggle favorite status with animation and haptic feedback
   */
  const toggleFavorite = useCallback(() => {
    // Early validation inside the callback
    if (!itemId) {
      if (__DEV__) {
        console.log('FavoriteToggle: itemId is required');
      }
      return;
    }

    try {
      const wasAlreadyFavorite = isFavorite(itemId);

      if (wasAlreadyFavorite) {
        removeFavorite(itemId);
      } else {
        addFavorite(itemId);
      }

      // Pulse animation
      scale.value = withSequence(
        withSpring(1.3, { damping: 10, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );

      // Haptic feedback
      if (Platform.OS !== 'web') {
        try {
          // Success haptic for adding, light for removing
          Haptics.notificationAsync(
            wasAlreadyFavorite 
              ? Haptics.NotificationFeedbackType.Warning  // Subtle for remove
              : Haptics.NotificationFeedbackType.Success   // Satisfying for add
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
  }, [itemId, isFavorite, addFavorite, removeFavorite, scale]);

  // Early return AFTER all hooks
  if (!itemId) {
    if (__DEV__) {
      console.log('FavoriteToggle: itemId is required');
    }
    return null;
  }

  const isCurrentlyFavorite = isFavorite(itemId);

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={styles.container}
      accessibilityLabel={
        isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"
      }
      accessibilityRole="button"
      accessibilityState={{ selected: isCurrentlyFavorite }}
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
    minWidth: 44,
    minHeight: 44,
  },
});
