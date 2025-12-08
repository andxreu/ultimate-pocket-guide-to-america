// app/(tabs)/search/index.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Keyboard,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { loadContentData } from '@/data/contentData';
import { getItemRoute } from '@/utils/findItemById';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const RECENT_SEARCHES_KEY = 'recent_searches_v2';
const MAX_RECENT_SEARCHES = 6;
const DEBOUNCE_MS = 180;

interface SearchResult {
  id: string;
  title: string;
  breadcrumb: string;
  snippet: string;
  relevance: number;
}

export default function SearchScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load recent searches once
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) setRecent(JSON.parse(saved));
      } catch (e) {
        if (__DEV__) console.log('Recent searches load error:', e);
      }
    })();
  }, []);

  // Debounced search
  const debounced = useMemo(() => {
    const timer = setTimeout(() => {
      if (query.trim()) performSearch(query.trim());
      else setResults([]);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => debounced, [debounced]);

  const performSearch = useCallback(async (q: string) => {
    setIsSearching(true);
    const lower = q.toLowerCase();
    const data = await loadContentData();

    const hits: SearchResult[] = [];

    for (const main of data) {
      for (const sec of main.sections) {
        for (const sub of sec.subsections) {
          const title = sub.title.toLowerCase();
          const content = (sub.content + ' ' + (sub.fullText || '') + ' ' + (sub.context || '')).toLowerCase();

          let score = 0;
          if (title === lower) score = 10000;
          else if (title.startsWith(lower)) score = 5000;
          else if (title.includes(` ${lower} `)) score = 3000;
          else if (title.includes(lower)) score = 1500;
          else if (content.includes(` ${lower} `)) score = 800;
          else if (content.includes(lower)) score = 200;

          if (score > 0) {
            const snippetStart = Math.max(0, content.indexOf(lower) - 60);
            const snippetEnd = Math.min(content.length, snippetStart + 160);
            const snippet = '...' + content.slice(snippetStart, snippetEnd) + '...';

            hits.push({
              id: sub.id,
              title: sub.title,
              breadcrumb: `${main.title} → ${sec.title}`,
              snippet,
              relevance: score,
            });
          }
        }
      }
    }

    hits.sort((a, b) => b.relevance - a.relevance);
    setResults(hits.slice(0, 50));
    setIsSearching(false);
  }, []);

  const saveRecent = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recent.filter(r => r !== trimmed)].slice(0, MAX_RECENT_SEARCHES);
    setRecent(updated);
    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      if (__DEV__) console.log('Save recent error:', e);
    }
  }, [recent]);

  const clearRecent = useCallback(async () => {
    setRecent([]);
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      if (__DEV__) console.log('Clear recent error:', e);
    }
  }, []);

  const goToResult = useCallback((id: string) => {
    if (query.trim()) saveRecent(query.trim());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(getItemRoute(id) as any);
  }, [query, router]);

  const selectRecent = useCallback((q: string) => {
    setQuery(q);
    Keyboard.dismiss();
    Haptics.selectionAsync();
  }, []);

  const clearInput = useCallback(() => {
    setQuery('');
    setResults([]);
    Keyboard.dismiss();
    Haptics.selectionAsync();
  }, []);

  const showRecent = !query.trim() && recent.length > 0;
  const showEmpty = !query.trim() && recent.length === 0;
  const showNoResults = query.trim() && !isSearching && results.length === 0;

  return (
    <>
      <Stack.Screen options={{ title: "Search", headerShown: true, headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Search Bar */}
        <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={[styles.searchBar, { borderColor: colors.primary + "25" }]}>
          <IconSymbol ios_icon_name="magnifyingglass" android_material_icon_name="search" size={22} color={colors.textSecondary} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search Constitution, Federalism, Founders..."
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoFocus={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={styles.clearBtn}>
              <IconSymbol ios_icon_name="xmark.circle.fill" android_material_icon_name="cancel" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </BlurView>

        {/* Content */}
        <FlatList
          data={showRecent ? recent : results}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {showRecent && (
                <View style={styles.recentHeader}>
                  <Text style={[styles.recentTitle, { color: colors.text }]}>Recent Searches</Text>
                  <TouchableOpacity onPress={clearRecent}>
                    <Text style={[styles.clearText, { color: colors.primary }]}>Clear</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showEmpty && (
                <View style={styles.empty}>
                  <IconSymbol ios_icon_name="magnifyingglass" android_material_icon_name="search" size={80} color={colors.textSecondary + "60"} />
                  <Text style={[styles.emptyTitle, { color: colors.text }]}>Search the Guide</Text>
                  <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>
                    Try "Bill of Rights", "Federalism", or "Founders"
                  </Text>
                </View>
              )}
              {showNoResults && (
                <View style={styles.empty}>
                  <IconSymbol ios_icon_name="exclamationmark.triangle" android_material_icon_name="error_outline" size={64} color={colors.accent} />
                  <Text style={[styles.emptyTitle, { color: colors.text }]}>No results found</Text>
                  <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>Try a different word or phrase</Text>
                </View>
              )}
              {isSearching && (
                <View style={styles.loading}>
                  <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Searching...</Text>
                </View>
              )}
            </>
          }
          renderItem={({ item }) => {
            if (typeof item === 'string') {
              // Recent search
              return (
                <TouchableOpacity style={[styles.recentItem, { backgroundColor: colors.card }]} onPress={() => selectRecent(item)}>
                  <IconSymbol ios_icon_name="clock" android_material_icon_name="history" size={18} color={colors.textSecondary} />
                  <Text style={[styles.recentText, { color: colors.text }]}>{item}</Text>
                </TouchableOpacity>
              );
            }
            // Search result
            return (
              <TouchableOpacity style={[styles.result, { backgroundColor: colors.card }]} onPress={() => goToResult(item.id)} activeOpacity={0.7}>
                <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={styles.resultInner}>
                  <Text style={[styles.resultTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.resultBreadcrumb, { color: colors.textSecondary }]}>{item.breadcrumb}</Text>
                  <Text style={[styles.resultSnippet, { color: colors.textSecondary }]}>{item.snippet}</Text>
                </BlurView>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<AppFooter />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginTop: Platform.OS === 'android' ? 24 : 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 14,
    overflow: 'hidden',
  },
  input: { flex: 1, fontSize: 17, fontWeight: '500' },
  clearBtn: { padding: 4 },
  content: { paddingHorizontal: 16, paddingBottom: 120 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 8 },
  recentTitle: { fontSize: 18, fontWeight: '700' },
  clearText: { fontSize: 15, fontWeight: '600' },
  recentItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 14 },
  recentText: { fontSize: 16.5, flex: 1 },
  result: { marginBottom: 14, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#D4AF37' + '18' },
  resultInner: { padding: 20 },
  resultTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  resultBreadcrumb: { fontSize: 13, marginBottom: 8, opacity: 0.8 },
  resultSnippet: { fontSize: 15, lineHeight: 23 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 24, fontWeight: '800', marginTop: 20, textAlign: 'center' },
  emptyHint: { fontSize: 16, textAlign: 'center', marginTop: 12, opacity: 0.8 },
  loading: { alignItems: 'center', paddingVertical: 40 },
  loadingText: { fontSize: 17, fontWeight: '600' },
});