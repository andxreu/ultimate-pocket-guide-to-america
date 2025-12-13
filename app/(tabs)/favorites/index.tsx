import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  RefreshControl,
} from 'react-native';
import { useRouter, Stack, useFocusEffect } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { findItemById, getItemRoute } from '@/utils/findItemById';
import { mapData } from '@/data/mapData';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

interface FavoriteItem {
  id: string;
  title: string;
  breadcrumb: string;
  snippet: string;
  type: 'content' | 'state';
}

/**
 * Favorites Screen Component
 * 
 * Displays user's saved favorite items with ability to remove and navigate.
 * Now properly integrated with FavoritesContext for real-time updates.
 * 
 * Features:
 * - Uses FavoritesContext for state management
 * - Real-time updates when favorites change
 * - Pull-to-refresh support
 * - Haptic feedback
 * - Animated list items
 * - State and content item support
 * 
 * @component
 */
export default function FavoritesScreen() {
  const { colors, shadows, isDark } = useTheme();
  const router = useRouter();
  const { favorites: favoriteIds, removeFavorite, isLoaded } = useFavorites();
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Resolve favorite IDs to full item details
   * Memoized to avoid recalculating on every render
   */
  const favorites = useMemo(() => {
    const items: FavoriteItem[] = [];

    for (const id of favoriteIds) {
      try {
        if (id.startsWith('state:')) {
          // Handle state favorites
          const stateCode = id.replace('state:', '');
          let foundState = null;
          
          for (const region of mapData) {
            if (!region || !region.states) continue;
            const state = region.states.find((s) => s && s.code === stateCode);
            if (state) {
              foundState = state;
              break;
            }
          }

          if (foundState && foundState.name && foundState.blurb) {
            const snippet = foundState.blurb.slice(0, 100) + (foundState.blurb.length > 100 ? '...' : '');
            items.push({
              id,
              title: foundState.name,
              breadcrumb: `Map › State`,
              snippet,
              type: 'state',
            });
          }
        } else {
          // Handle content favorites
          const result = findItemById(id);
          if (result && result.item && result.mainSection && result.section) {
            const snippet = result.item.content.slice(0, 100) + (result.item.content.length > 100 ? '...' : '');
            items.push({
              id,
              title: result.item.title,
              breadcrumb: `${result.mainSection.title} › ${result.section.title}`,
              snippet,
              type: 'content',
            });
          }
        }
      } catch (error) {
        if (__DEV__) {
          console.log('Error processing favorite item:', id, error);
        }
      }
    }

    // Sort alphabetically for better UX
    items.sort((a, b) => a.title.localeCompare(b.title));
    return items;
  }, [favoriteIds]);

  /**
   * Handle pull-to-refresh
   * Just triggers a re-render since context handles the data
   */
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Small delay for visual feedback
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  }, []);

  /**
   * Remove item from favorites with haptic feedback
   */
  const handleRemoveFavorite = useCallback(async (id: string) => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      await removeFavorite(id);
    } catch (error) {
      if (__DEV__) {
        console.log('Error removing favorite:', error);
      }
    }
  }, [removeFavorite]);

  /**
   * Navigate to favorite item with haptic feedback
   */
  const handleItemPress = useCallback((item: FavoriteItem) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      if (item.type === 'state') {
        const stateCode = item.id.replace('state:', '').toLowerCase();
        router.push(`/(tabs)/map/state/${stateCode}` as any);
      } else {
        const route = getItemRoute(item.id);
        router.push(route as any);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error navigating to item:', error);
      }
    }
  }, [router]);

  /**
   * Confirm before removing favorite
   */
  const confirmRemove = useCallback((id: string, title: string) => {
    if (Platform.OS === 'web') {
      if (confirm(`Remove "${title}" from favorites?`)) {
        handleRemoveFavorite(id);
      }
    } else {
      Alert.alert(
        'Remove Favorite',
        `Remove "${title}" from favorites?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Remove', 
            style: 'destructive', 
            onPress: () => handleRemoveFavorite(id) 
          },
        ]
      );
    }
  }, [handleRemoveFavorite]);

  /**
   * Render loading state
   */
  if (!isLoaded) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Favorites',
            headerShown: true,
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
            headerShadowVisible: false,
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.emptyState}>
            <Animated.View entering={FadeIn.duration(400)}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Loading favorites...
              </Text>
            </Animated.View>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Favorites',
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {favorites.length === 0 ? (
            <Animated.View 
              style={styles.emptyState}
              entering={FadeIn.duration(600)}
            >
              <IconSymbol
                ios_icon_name="star"
                android_material_icon_name="star_border"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No favorites yet
              </Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Tap the star icon on any topic or state to save it here
              </Text>
            </Animated.View>
          ) : (
            <>
              <Animated.View entering={FadeInDown.delay(50).springify()}>
                <Text style={[styles.count, { color: colors.textSecondary }]}>
                  {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
                </Text>
              </Animated.View>
              
              {favorites.map((item, index) => (
                <Animated.View 
                  key={item.id}
                  entering={FadeInDown.delay(100 + index * 50).springify()}
                >
                  <View 
                    style={[
                      styles.itemCard, 
                      { 
                        backgroundColor: colors.card, 
                        ...shadows.small 
                      }
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.itemContent}
                      onPress={() => handleItemPress(item)}
                      activeOpacity={0.7}
                      accessibilityLabel={`Open ${item.title}`}
                      accessibilityRole="button"
                      accessibilityHint={item.breadcrumb}
                    >
                      {item.type === 'state' && (
                        <View 
                          style={[
                            styles.stateBadge, 
                            { backgroundColor: colors.primary + '20' }
                          ]}
                        >
                          <Text 
                            style={[
                              styles.stateBadgeText, 
                              { color: colors.primary }
                            ]}
                          >
                            STATE
                          </Text>
                        </View>
                      )}
                      <Text 
                        style={[styles.itemTitle, { color: colors.text }]}
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                      <Text 
                        style={[styles.itemBreadcrumb, { color: colors.textSecondary }]}
                        numberOfLines={1}
                      >
                        {item.breadcrumb}
                      </Text>
                      <Text 
                        style={[styles.itemSnippet, { color: colors.textSecondary }]}
                        numberOfLines={3}
                      >
                        {item.snippet}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => confirmRemove(item.id, item.title)}
                      activeOpacity={0.6}
                      accessibilityLabel={`Remove ${item.title} from favorites`}
                      accessibilityRole="button"
                    >
                      <IconSymbol
                        ios_icon_name="trash"
                        android_material_icon_name="delete"
                        size={20}
                        color={colors.accent}
                      />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </>
          )}

          <AppFooter />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 16,
    paddingBottom: 120,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  count: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 18,
  },
  itemCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  stateBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  stateBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  itemBreadcrumb: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 18,
    opacity: 0.8,
  },
  itemSnippet: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.85,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    minWidth: 56,
    minHeight: 56,
  },
});