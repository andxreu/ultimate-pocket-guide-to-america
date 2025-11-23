
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { AppFooter } from '@/components/AppFooter';
import { glossaryData, GlossaryTerm } from '@/data/glossaryData';
import { findItemById } from '@/utils/findItemById';

export default function GlossaryScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  // Filter terms based on search
  const filteredTerms = searchQuery.trim()
    ? glossaryData.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : glossaryData;

  // Group terms by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const letters = Object.keys(groupedTerms).sort();

  const handleTermPress = (term: GlossaryTerm) => {
    setSelectedTerm(term);
  };

  const handleRelatedPress = (id: string, title: string) => {
    setSelectedTerm(null);
    const result = findItemById(id);
    if (result) {
      const route = result.item.id.match(/^(declaration|articles|constitution|bill-of-rights|federalist-papers)$/)
        ? `/document/${id}`
        : `/detail/${id}`;
      router.push(route as any);
    } else {
      console.log('Item not found:', id);
    }
  };

  const handleCloseModal = () => {
    setSelectedTerm(null);
  };

  // Get related topics with their titles
  const getRelatedTopics = (relatedIds?: string[]) => {
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
  };

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
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.primary + "20" }]}>
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
            accessibilityLabel="Search glossary terms"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
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
        >
          {letters.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                ios_icon_name="book.closed"
                android_material_icon_name="menu_book"
                size={64}
                color={colors.textSecondary}
              />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No terms found
              </Text>
            </View>
          ) : (
            <>
              {letters.map((letter) => (
                <React.Fragment key={letter}>
                  <View style={styles.letterSection}>
                    <Text style={[styles.letterHeader, { color: colors.primary }]}>
                      {letter}
                    </Text>
                    {groupedTerms[letter].map((term, index) => (
                      <React.Fragment key={index}>
                        <TouchableOpacity
                          style={[styles.termCard, { backgroundColor: colors.card, borderColor: colors.primary + "10" }]}
                          onPress={() => handleTermPress(term)}
                          accessibilityLabel={`View definition of ${term.term}`}
                          accessibilityRole="button"
                        >
                          <Text style={[styles.termTitle, { color: colors.text }]}>
                            {term.term}
                          </Text>
                          <Text
                            style={[styles.termDefinition, { color: colors.textSecondary }]}
                            numberOfLines={2}
                          >
                            {term.definition}
                          </Text>
                        </TouchableOpacity>
                      </React.Fragment>
                    ))}
                  </View>
                </React.Fragment>
              ))}
            </>
          )}

          <AppFooter />
        </ScrollView>

        {/* Term Detail Modal */}
        {selectedTerm && (
          <View style={[styles.modal, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {selectedTerm.term}
                </Text>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButton}
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

              <ScrollView style={styles.modalScroll}>
                <Text style={[styles.modalDefinition, { color: colors.text }]}>
                  {selectedTerm.definition}
                </Text>

                {(() => {
                  const relatedTopics = getRelatedTopics(selectedTerm.relatedIds);
                  if (relatedTopics.length > 0) {
                    return (
                      <View style={styles.relatedSection}>
                        <Text style={[styles.relatedTitle, { color: colors.textSecondary }]}>
                          Related Topics
                        </Text>
                        {relatedTopics.map((topic, index) => (
                          <React.Fragment key={index}>
                            <TouchableOpacity
                              style={[styles.relatedButton, { borderColor: colors.primary, backgroundColor: colors.highlight }]}
                              onPress={() => handleRelatedPress(topic.id, topic.title)}
                              accessibilityLabel={`View ${topic.title}`}
                              accessibilityRole="button"
                            >
                              <Text style={[styles.relatedButtonText, { color: colors.primary }]}>
                                {topic.title}
                              </Text>
                              <IconSymbol
                                ios_icon_name="arrow.right"
                                android_material_icon_name="arrow_forward"
                                size={16}
                                color={colors.primary}
                              />
                            </TouchableOpacity>
                          </React.Fragment>
                        ))}
                      </View>
                    );
                  }
                  return null;
                })()}
              </ScrollView>
            </View>
          </View>
        )}
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
  letterSection: {
    marginBottom: 24,
  },
  letterHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 34.8,
  },
  termCard: {
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
  termTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 24.65,
  },
  termDefinition: {
    fontSize: 14,
    lineHeight: 20.3,
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
    lineHeight: 23.2,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    lineHeight: 31.9,
  },
  closeButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalDefinition: {
    fontSize: 16,
    lineHeight: 23.2,
    marginBottom: 20,
  },
  relatedSection: {
    marginTop: 8,
  },
  relatedTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    lineHeight: 18.85,
  },
  relatedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    minHeight: 44,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  relatedButtonText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21.75,
    flex: 1,
  },
});
