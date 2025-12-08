import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, Stack, useFocusEffect } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { findItemById, getItemRoute } from '@/utils/findItemById';
import { loadMapData } from '@/data/mapData';
import { loadContentData } from '@/data/contentData';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

interface FavoriteItem {
  id: string;
  title: string;
  breadcrumb: string;
  snippet: string;
  type: 'content' | 'state';
}

export default function FavoritesScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const { favorites: favoriteIds, removeFavorite } = useFavorites();
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setIsLoading(true);
    const contentData = await loadContentData();
    const mapData = await loadMapData();

    const favoriteItems: FavoriteItem[] = [];

    for (const id of favoriteIds) {
      if (id.startsWith('state:')) {
        const stateCode = id.replace('state:', '');
        let foundState = null;
        for (const region of mapData) {
          const state = region.states.find(s => s.code === stateCode);
          if (state) {
            foundState = state;
            break;
          }
        }
        if (foundState) {
          const snippet = foundState.blurb.slice(0, 120) + (foundState.blurb.length > 120 ? '...' : '');
          favoriteItems.push({
            id,
            title: foundState.name,
            breadcrumb: 'Map › State',
            snippet,
            type: 'state',
          });
        }
      } else {
        const result = findItemById(id);
        if (result) {
          const snippet = result.item.content.slice(0, 120) + (result.item.content.length > 120 ? '...' : '');
          favoriteItems.push({
            id,
            title: result.item.title,
            breadcrumb: `${result.mainSection.title} › ${result.section.title}`,
            snippet,
            type: 'content',
          });
        }
      }
    }

    favoriteItems.sort((a, b) => a.title.localeCompare(b.title));
    setItems(favoriteItems);
    setIsLoading(false);
  }, [favoriteIds]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleItemPress = useCallback((item: FavoriteItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (item.type === 'state') {
      const code = item.id.replace('state:', '').toLowerCase();
      router.push(`/map/state/${code}` as any);
    } else {
      const route = getItemRoute(item.id);
      router.push(route as any);
    }
  }, [router]);

  const confirmRemove = useCallback((id: string, title: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (Platform.OS === 'web') {
      if (confirm(`Remove "${title}" from favorites?`)) {
        removeFavorite(id);
      }
    } else {
      Alert.alert(
        'Remove Favorite',
        `Remove "${title}" from favorites?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => removeFavorite(id) },
        ]
      );
    }
  }, [removeFavorite]);

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Favorites', headerShown: true, headerStyle: { backgroundColor: '#1a1a1a' }, headerTintColor: '#FFFFFF' }} />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Loading favorites…</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Favorites', headerShown: true, headerStyle: { backgroundColor: '#1a1a1a' }, headerTintColor: '#FFFFFF' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <IconSymbol ios_icon_name="star" android_material_icon_name="star_border" size={64} color={colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No favorites yet</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Tap the star icon on any topic or state to save it here
              </Text>
            </View>
          }
          ListHeaderComponent={
            items.length > 0 && (
              <Text style={[styles.count, { color: colors.textSecondary }]}>
                {items.length} {items.length === 1 ? 'favorite' : 'favorites'}
              </Text>
            )
          }
          renderItem={({ item }) => (
            <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={[styles.itemCard, { overflow: 'hidden' }]}>
              <TouchableOpacity style={styles.itemContent} onPress={() => handleItemPress(item)} activeOpacity={0.7}>
                {item.type === 'state' && (
                  <View style={[styles.stateBadge, { backgroundColor: colors.highlight }]}>
                    <Text style={[styles.stateBadgeText, { color: colors.primary }]}>STATE</Text>
                  </View>
                )}
                <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.itemBreadcrumb, { color: colors.textSecondary }]}>{item.breadcrumb}</Text>
                <Text style={[styles.itemSnippet, { color: colors.textSecondary }]}>{item.snippet}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => confirmRemove(item.id, item.title)}
                activeOpacity={0.7}
              >
                <IconSymbol ios_icon_name="trash" android_material_icon_name="delete" size={20} color={colors.accent} />
              </TouchableOpacity>
            </BlurView>
          )}
          ListFooterComponent={<AppFooter />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  emptyTitle: { fontSize: 20, fontWeight: '600', marginTop: 16, marginBottom: 8, lineHeight: 29 },
  emptyText: { fontSize: 16, textAlign: 'center', lineHeight: 23.2 },
  count: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    lineHeight: 18.85,
  },
  itemCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  itemContent: { flex: 1, padding: 16 },
  stateBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  stateBadgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  itemTitle: { fontSize: 17, fontWeight: '600', marginBottom: 6, lineHeight: 24.65 },
  itemBreadcrumb: { fontSize: 13, marginBottom: 8, lineHeight: 18.85 },
  itemSnippet: { fontSize: 14, lineHeight: 20.3 },
  removeButton: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, minWidth: 44, minHeight: 44 },
});