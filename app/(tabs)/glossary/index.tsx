import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useTextSize } from '@/contexts/TextSizeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { glossaryData, GlossaryTerm } from '@/data/glossaryData';
import { findItemById } from '@/utils/findItemById';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

/**
 * Glossary Screen Component
 * Searchable dictionary of civic terms with definitions and related topics
 */
export default function GlossaryScreen() {
  const { colors, shadows } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const router = useRouter();
  const textMultiplier = getTextSizeMultiplier();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  /**
   * Filter terms based on search query
   * Memoized for performance
   */
  const filteredTerms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return glossaryData;
    
    return glossaryData.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  /**
   * Group terms alphabetically
   * Memoized for performance
   */
  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, GlossaryTerm[]>);
  }, [filteredTerms]);

  const letters = useMemo(() => Object.keys(groupedTerms).sort(), [groupedTerms]);

  /**
   * Handle term press with haptic feedback
   */
  const handleTermPress = useCallback((term: GlossaryTerm) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    Keyboard.dismiss();
    setSelectedTerm(term);
  }, []);

  /**
   * Navigate to related topic
   */
  const handleRelatedPress = useCallback((id: string, title: string) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    setSelectedTerm(null);
    const result = findItemById(id);
    if (result) {
      const route = result.item.id.match(/^(declaration|articles|constitution|bill-of-rights|federalist-papers)$/)
        ? `/document/${id}`
        : `/detail/${id}`;
      router.push(route as any);
    } else {
      if (__DEV__) {
        console.log('Item not found:', id);
      }
    }
  }, [router]);

  /**
   * Close modal with haptic feedback
   */
  const handleCloseModal = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    setSelectedTerm(null);
  }, []);

  /**
   * Clear search with haptic feedback
   */
  const handleClearSearch = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    setSearchQuery('');
  }, []);

  /**
   * Get related topics with error handling
   */
  const getRelatedTopics = useCallback((relatedIds?: string[]) => {
    if (!relatedIds || relatedIds.length === 0) return [];
    
    return relatedIds
      .map(id => {
        const result = findItemById(id);
        if (result) {
          return {
            id,
            title: result.item.title,
          };
        }
        return null;
      })
      .filter(Boolean) as { id: string; title: string }[];
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Glossary',
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Search Bar */}
        <Animated.View 
          entering={FadeInDown.delay(50).springify()}
          style={[
            styles.searchBar, 
            { 
              backgroundColor: colors.card, 
              borderColor: colors.primary + "20",
              ...shadows.small 
            }
          ]}
        >
          <IconSymbol
            ios_icon_name="magnifyingglass"
            android_material_icon_name="search"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search terms..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="never"
            accessibilityLabel="Search glossary terms"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
              activeOpacity={0.6}
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
        </Animated.View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {letters.length === 0 ? (
            <Animated.View 
              style={styles.emptyState}
              entering={FadeIn.duration(400)}
            >
              <IconSymbol
                ios_icon_name="book.closed"
                android_material_icon_name="menu_book"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={[styles.emptyText, { color: colors.textSecondary, fontSize: 16 * textMultiplier }]}>
                No terms match your search. Try a different word or clear the search box.
              </Text>
            </Animated.View>
          ) : (
            <>
              {letters.map((letter, letterIndex) => (
                <Animated.View 
                  key={letter}
                  entering={FadeInDown.delay(100 + letterIndex * 30).springify()}
                >
                  <View style={styles.letterSection}>
                    <Text style={[styles.letterHeader, { color: colors.primary }]}>
                      {letter}
                    </Text>
                    {groupedTerms[letter].map((term, index) => (
                      <TouchableOpacity
                        key={`${letter}-${index}`}
                        style={[
                          styles.termCard, 
                          { 
                            backgroundColor: colors.card, 
                            borderColor: colors.primary + "10",
                            ...shadows.small 
                          }
                        ]}
                        onPress={() => handleTermPress(term)}
                        activeOpacity={0.7}
                        accessibilityLabel={`View definition of ${term.term}`}
                        accessibilityRole="button"
                        accessibilityHint="Double tap to view full definition"
                      >
                        <Text style={[styles.termTitle, { color: colors.text, fontSize: 17 * textMultiplier }]}>
                          {term.term}
                        </Text>
                        <Text
                          style={[styles.termDefinition, { color: colors.textSecondary, fontSize: 14 * textMultiplier }]}
                          numberOfLines={2}
                        >
                          {term.definition}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Animated.View>
              ))}
            </>
          )}

          <AppFooter />
        </ScrollView>

        {/* Term Detail Modal */}
        <Modal
          visible={selectedTerm !== null}
          transparent
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={[styles.modal, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
            <Animated.View 
              entering={SlideInUp.duration(300).springify()}
              style={[
                styles.modalContent, 
                { 
                  backgroundColor: colors.card,
                  ...shadows.large 
                }
              ]}
            >
              <View style={styles.modalHeader}>
                <Text 
                  style={[
                    styles.modalTitle, 
                    { color: colors.text, fontSize: 22 * textMultiplier }
                  ]}
                  numberOfLines={2}
                >
                  {selectedTerm?.term}
                </Text>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButton}
                  activeOpacity={0.6}
                  accessibilityLabel="Close"
                  accessibilityRole="button"
                >
                  <IconSymbol
                    ios_icon_name="xmark"
                    android_material_icon_name="close"
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
              >
                <Text style={[styles.modalDefinition, { color: colors.text, fontSize: 16 * textMultiplier }]}>
                  {selectedTerm?.definition}
                </Text>

                {(() => {
                  if (!selectedTerm) return null;
                  const relatedTopics = getRelatedTopics(selectedTerm.relatedIds);
                  if (relatedTopics.length === 0) return null;

                  return (
                    <View style={styles.relatedSection}>
                      <Text style={[styles.relatedTitle, { color: colors.textSecondary }]}>
                        Related Topics
                      </Text>
                      {relatedTopics.map((topic, index) => (
                        <TouchableOpacity
                          key={topic.id}
                          style={[
                            styles.relatedButton, 
                            { 
                              borderColor: colors.primary, 
                              backgroundColor: colors.primary + '10' 
                            }
                          ]}
                          onPress={() => handleRelatedPress(topic.id, topic.title)}
                          activeOpacity={0.7}
                          accessibilityLabel={`View ${topic.title}`}
                          accessibilityRole="button"
                        >
                          <Text style={[styles.relatedButtonText, { color: colors.primary, fontSize: 15 * textMultiplier }]}>
                            {topic.title}
                          </Text>
                          <IconSymbol
                            ios_icon_name="arrow.right"
                            android_material_icon_name="arrow_forward"
                            size={16}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                })()}
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
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
  letterSection: {
    marginBottom: 24,
  },
  letterHeader: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    lineHeight: 36,
    letterSpacing: 0.5,
  },
  termCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  termTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  termDefinition: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.85,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 20,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    flex: 1,
    lineHeight: 30,
    letterSpacing: 0.3,
  },
  closeButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
    marginRight: -8,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalDefinition: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  relatedSection: {
    marginTop: 8,
  },
  relatedTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    lineHeight: 18,
  },
  relatedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
    minHeight: 56,
  },
  relatedButtonText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    flex: 1,
    letterSpacing: 0.2,
  },
});