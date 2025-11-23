
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { MainSection } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";

interface SectionListProps {
  mainSection: MainSection;
}

// Define which subsections are founding documents
const FOUNDING_DOCUMENTS = [
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
];

export function SectionList({ mainSection }: SectionListProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const navigateToItem = (subsectionId: string) => {
    // Check if this is a founding document
    if (FOUNDING_DOCUMENTS.includes(subsectionId)) {
      router.push(`/document/${subsectionId}` as any);
    } else {
      router.push(`/detail/${subsectionId}` as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            {mainSection.title}
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {mainSection.description}
          </Text>
        </View>

        <View style={styles.sectionsContainer}>
          {mainSection.sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionGroup}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {section.title}
                </Text>
                <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                  {section.description}
                </Text>
              </View>

              <View style={styles.subsectionsContainer}>
                {section.subsections.map((subsection, subsectionIndex) => {
                  const isDocument = FOUNDING_DOCUMENTS.includes(subsection.id);
                  return (
                    <TouchableOpacity
                      key={subsectionIndex}
                      style={[
                        styles.subsectionCard,
                        {
                          backgroundColor: colors.card,
                          borderColor: "rgba(255, 255, 255, 0.06)",
                        },
                      ]}
                      onPress={() => navigateToItem(subsection.id)}
                      activeOpacity={0.7}
                      accessibilityLabel={`Navigate to ${subsection.title}`}
                      accessibilityRole="button"
                    >
                      <View style={styles.subsectionContent}>
                        {isDocument && (
                          <View
                            style={[
                              styles.documentBadge,
                              { backgroundColor: colors.primary + "20" },
                            ]}
                          >
                            <IconSymbol
                              ios_icon_name="doc.text.fill"
                              android_material_icon_name="description"
                              size={12}
                              color={colors.primary}
                            />
                          </View>
                        )}
                        <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                          {subsection.title}
                        </Text>
                      </View>
                      <IconSymbol
                        ios_icon_name="chevron.right"
                        android_material_icon_name="chevron_right"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <AppFooter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 43.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 21.75,
  },
  sectionsContainer: {
    gap: 28,
  },
  sectionGroup: {
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 6,
    lineHeight: 27.55,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18.85,
  },
  subsectionsContainer: {
    gap: 12,
  },
  subsectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 44,
  },
  subsectionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  documentBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    lineHeight: 23.2,
  },
});
