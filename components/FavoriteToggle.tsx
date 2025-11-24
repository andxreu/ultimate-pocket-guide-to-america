
import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import * as Haptics from 'expo-haptics';

interface FavoriteToggleProps {
  itemId: string;
  size?: number;
}

export function FavoriteToggle({ itemId, size = 26 }: FavoriteToggleProps) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(itemId);

  const toggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }

    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={styles.button}
      accessibilityLabel={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityRole="button"
    >
      <IconSymbol
        ios_icon_name={isCurrentlyFavorite ? 'star.fill' : 'star'}
        android_material_icon_name={isCurrentlyFavorite ? 'star' : 'star_border'}
        size={size}
        color={isCurrentlyFavorite ? colors.primary : colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
