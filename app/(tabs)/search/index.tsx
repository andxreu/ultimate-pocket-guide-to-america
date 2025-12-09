
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { contentData } from '@/data/contentData';
import { getItemRoute } from '@/utils/findItemById';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 5;
const DEBOUNCE_MS = 200;

interface SearchResult {
  id: string;
  title: string;
  breadcrumb: string;
  snippet: string;
  relevanceScore: number;
}

export default function SearchScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = useCallback((query: string) => {
    setIsSearching(true);
    const lowerQuery = query.toLowerCase().trim();
    const foundResults: SearchResult[] = [];
    const seenIds = new Set<string>();

    for (const mainSection of contentData) {
      for (const section of mainSection.sections) {
        for (const subsection of section.subsections) {
          if (seenIds.has(subsection.id)) continue;

          const title = subsection.title.toLowerCase();
          const sectionName = section.title.toLowerCase();
          const mainSectionName = mainSection.title.toLowerCase();
          const content = subsection.content.toLowerCase();
          const fullText = subsection.fullText?.toLowerCase() || '';

          let relevanceScore = 0;

          if (title === lowerQuery) {
            relevanceScore = 10000;
          } else if (title.startsWith(lowerQuery)) {
            relevanceScore = 5000;
          } else if (title.includes(` ${lowerQuery}`) || title.includes(`${lowerQuery} `)) {
            relevanceScore = 3000;
          } else if (title.includes(lowerQuery)) {
            relevanceScore = 1500;
          } else if (sectionName === lowerQuery || mainSectionName === lowerQuery) {
            relevanceScore = 1000;
          } else if (sectionName.includes(lowerQuery) || mainSectionName.includes(lowerQuery)) {
            relevanceScore = 500;
          } else if (content.startsWith(lowerQuery)) {
            relevanceScore = 200;
          } else if (content.includes(` ${lowerQuery}`) || content.includes(`${lowerQuery} `)) {
            relevanceScore = 100;
          } else if (content.includes(lowerQuery)) {
            relevanceScore = 50;
          } else if (fullText.includes(lowerQuery)) {
            relevanceScore = 25;
          }

          if (relevanceScore > 0) {
            let snippet = '';
            const matchIndex = content.indexOf(lowerQuery);

            if (matchIndex !== -1) {
              const start = Math.max(0, matchIndex - 40);
              const end = Math.min(subsection.content.length, matchIndex + lowerQuery.length + 40);
              snippet = (start > 0 ? '...' : '') + subsection.content.slice(start, end) + (end < subsection.content.length ? '...' : '');
            } else {
              snippet = subsection.content.slice(0, 100) + (subsection.content.length > 100 ? '...' : '');
            }

            foundResults.push({
              id: subsection.id,
              title: subsection.title,
              breadcrumb: `${mainSection.title} › ${section.title}`,
              snippet,
              relevanceScore,
            });

            seenIds.add(subsection.id);
          }
        }
      }
    }

    foundResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    setResults(foundResults);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedQuery, performSearch]);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error loading recent searches:', error);
      }
    }
  };

  const saveRecentSearch = async (query: string) => {
    try {
      const trimmed = query.trim();
      if (!trimmed) return;

      let updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)];
      updated = updated.slice(0, MAX_RECENT_SEARCHES);

      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (error) {
      if (__DEV__) {
        console.log('Error saving recent search:', error);
      }
    }
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (error) {
      if (__DEV__) {
        console.log('Error clearing recent searches:', error);
      }
    }
  };

  const handleResultPress = (id: string) => {
    saveRecentSearch(searchQuery);
    const route = getItemRoute(id);
    router.push(route as any);
  };

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearInput = () => {
    setSearchQuery('');
    setResults([]);
  };

  const showRecentSearches = !searchQuery.trim() && recentSearches.length > 0;
  const showEmptyState = !searchQuery.trim() && recentSearches.length === 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Search',
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.primary + "20" }]}>
          <IconSymbol
            ios_icon_name="magnifyingglass"
            android_material_icon_name="search"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search topics, branches, documents…"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Search input"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearInput}
              style={styles.clearButton}
              accessibilityLabel="Clear search"
              accessibilityRole="button"
            >
              <IconSymbol
                ios_icon_name="xmark.circle.fill"
                android_material_icon_name="cancel"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {showRecentSearches && (
            <View style={styles.recentContainer}>
              <View style={styles.recentHeader}>
                <Text style={[styles.recentTitle, { color: colors.text }]}>
                  Recent Searches
                </Text>
                <TouchableOpacity
                  onPress={clearRecentSearches}
                  accessibilityLabel="Clear recent searches"
                  accessibilityRole="button"
                >
                  <Text style={[styles.clearText, { color: colors.primary }]}>
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
              {recentSearches.map((query, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[styles.recentItem, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}
                    onPress={() => handleRecentSearchPress(query)}
                    accessibilityLabel={`Search for ${query}`}
                    accessibilityRole="button"
                  >
                    <IconSymbol
                      ios_icon_name="clock"
                      android_material_icon_name="history"
                      size={18}
                      color={colors.textSecondary}
                    />
                    <Text style={[styles.recentText, { color: colors.text }]}>
                      {query}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          )}

          {showEmptyState && (
            <View style={styles.emptyState}>
              <IconSymbol
                ios_icon_name="magnifyingglass"
                android_material_icon_name="search"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                Search the Guide
              </Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Try searching for &apos;Constitution&apos;, &apos;federalism&apos;, or &apos;founders&apos;
              </Text>
            </View>
          )}

          {!isSearching && debouncedQuery.length > 0 && results.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                No results found. Try another word or phrase.
              </Text>
            </View>
          )}

          {results.length > 0 && (
            <View style={styles.resultsContainer}>
              <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </Text>
              {results.map((result, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}
                    onPress={() => handleResultPress(result.id)}
                    accessibilityLabel={`Open ${result.title}`}
                    accessibilityRole="button"
                  >
                    <Text style={[styles.resultTitle, { color: colors.text }]}>
                      {result.title}
                    </Text>
                    <Text style={[styles.resultBreadcrumb, { color: colors.textSecondary }]}>
                      {result.breadcrumb}
                    </Text>
                    <Text style={[styles.resultSnippet, { color: colors.textSecondary }]}>
                      {result.snippet}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginTop: Platform.OS === 'android' ? 24 : 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23.2,
  },
  clearButton: {
    padding: 4,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  recentContainer: {
    marginBottom: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24.65,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20.3,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  recentText: {
    fontSize: 16,
    lineHeight: 23.2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20.3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 29,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 23.2,
  },
  resultsContainer: {
    marginTop: 8,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    lineHeight: 18.85,
  },
  resultCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 24.65,
  },
  resultBreadcrumb: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18.85,
  },
  resultSnippet: {
    fontSize: 14,
    lineHeight: 20.3,
  },
});
