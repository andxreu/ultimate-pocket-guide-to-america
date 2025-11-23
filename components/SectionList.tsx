
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { MainSection } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";

interface SectionListProps {
  mainSection: MainSection;
}

export function SectionList({ mainSection }: SectionListProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const navigateToSection = (sectionId: string) => {
    router.push(`/(tabs)/${mainSection.id}/${sectionId}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {mainSection.title}
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {mainSection.description}
          </Text>
        </View>

        <View style={styles.sectionsContainer}>
          {mainSection.sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sectionCard, { backgroundColor: colors.card }]}
              onPress={() => navigateToSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {section.title}
                </Text>
                <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                  {section.description}
                </Text>
                <View style={styles.subsectionCount}>
                  <IconSymbol
                    ios_icon_name="doc.text.fill"
                    android_material_icon_name="description"
                    size={16}
                    color={colors.textSecondary}
                  />
                  <Text style={[styles.countText, { color: colors.textSecondary }]}>
                    {section.subsections.length} {section.subsections.length === 1 ? 'topic' : 'topics'}
                  </Text>
                </View>
              </View>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  subsectionCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countText: {
    fontSize: 12,
  },
});
