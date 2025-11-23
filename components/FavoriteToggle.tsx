
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const FAVORITES_KEY = 'favorites';

interface FavoriteToggleProps {
  itemId: string;
  size?: number;
}

export function FavoriteToggle({ itemId, size = 26 }: FavoriteToggleProps) {
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [itemId]);

  const checkFavoriteStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favorites: string[] = JSON.parse(stored);
        setIsFavorite(favorites.includes(itemId));
      }
    } catch (error) {
      console.log('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let favorites: string[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favorites = favorites.filter((fid) => fid !== itemId);
      } else {
        favorites = [...new Set([...favorites, itemId])];
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // Haptic feedback
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={styles.button}
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityRole="button"
    >
      <IconSymbol
        ios_icon_name={isFavorite ? 'star.fill' : 'star'}
        android_material_icon_name={isFavorite ? 'star' : 'star_border'}
        size={size}
        color={isFavorite ? colors.primary : colors.text}
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
