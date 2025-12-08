// components/FavoriteToggle.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface FavoriteToggleProps {
  itemId: string;
  size?: number;
}

export function FavoriteToggle({ itemId, size = 28 }: FavoriteToggleProps) {
  const { colors, isDark } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = isFavorite(itemId);

  const scale = useSharedValue(isFavorited ? 1.15 : 1);
  const opacity = useSharedValue(isFavorited ? 1 : 0.7);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const toggle = () => {
    if (isFavorited) {
      removeFavorite(itemId);
      scale.value = withSpring(1, { damping: 10, stiffness: 300 });
      opacity.value = withTiming(0.7, { duration: 200 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      addFavorite(itemId);
      scale.value = withSpring(1.3, { damping: 10, stiffness: 400 });
      opacity.value = withTiming(1, { duration: 200 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggle}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={isFavorited ? "Remove from favorites" : "Add to favorites"}
      accessibilityState={{ selected: isFavorited }}
    >
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <IconSymbol
          ios_icon_name={isFavorited ? "star.fill" : "star"}
          android_material_icon_name={isFavorited ? "star" : "star_border"}
          size={size}
          color={isFavorited ? colors.primary : colors.textSecondary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});