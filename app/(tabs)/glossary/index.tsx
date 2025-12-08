import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import { FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { findItemById, getItemRoute } from '@/utils/findItemById';
import { glossaryData, GlossaryTerm } from '@/data/glossaryData';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

export default function GlossaryScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  // Fast search + grouping
  const { filteredTerms, groupedTerms, letters } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = query
      ? glossaryData.filter(
          term =>
            term.term.toLowerCase().includes(query) ||
            term.definition.toLowerCase().includes(query)
        )
      : glossaryData;

    const grouped = filtered.reduce((acc, term) => {
      const letter = term.term[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    }, {} as Record<string, GlossaryTerm[]>);

    const sortedLetters = Object.keys(grouped).sort();
    return { filteredTerms: filtered, groupedTerms: grouped, letters: sortedLetters };
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    Keyboard.dismiss();
    Haptics.selectionAsync();
  }, []);

  const handleTermPress = useCallback((term: GlossaryTerm) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTerm(term);
  }, []);

  const handleRelatedPress = useCallback((id: string) => {
    setSelectedTerm(null);
    const route = getItemRoute(id);
    router.push(route as any);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [router]);

  const closeModal = useCallback(() => {
    setSelectedTerm(null);
    Haptics.selectionAsync();
  }, []);

  const relatedTopics = selectedTerm?.relatedIds
    ? selectedTerm.relatedIds
        .map(id => {
          const result = findItemById(id);
          return result ? { id, title: result.item.title } : null;
        })
        .filter(Boolean) as { id: string; title: string }[]
    : [];

  const renderLetterSection = ({ item: letter }: { item: string }) => (
    <View style={styles.letterSection}>
      <Text style={[styles.letterHeader, { color: colors.primary }]}>{letter}</Text>
      {groupedTerms[letter].map(term => (
        <TouchableOpacity
          key={term.id}
          style={[styles.termCard, { borderColor: colors.primary + "10" }]}
          onPress={() => handleTermPress(term)}
          activeOpacity={0.7}
        >
          <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={styles.termCardInner}>
            <Text style={[styles.termTitle, { color: colors.text }]}>{term.term}</Text>
            <Text style={[styles.termDefinition, { color: colors.textSecondary }]} numberOfLines={2}>
              {term.definition}
            </Text>
          </BlurView>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Glossary',
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Search Bar */}
        <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={[styles.searchBar, { borderColor: colors.primary + "20" }]}>
          <IconSymbol ios_icon_name="magnifyingglass" android_material_icon_name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search terms..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton