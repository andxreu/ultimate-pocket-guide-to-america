
import React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { MainSection } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface SectionListProps {
  mainSection: MainSection;
}

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
    if (FOUNDING_DOCUMENTS.includes(subsectionId)) {
      router.push(`/document/${subsectionId}` as any);
    } else {
      router.push(`/detail/${subsectionId}` as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Custom Header with Back Button */}
      <View style={[styles.customHeader, { backgroundColor: colors.background, borderBottomColor: colors.card }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {mainSection.title}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

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
                    <SubsectionCard
                      key={subsectionIndex}
                      subsection={subsection}
                      isDocument={isDocument}
                      colors={colors}
                      onPress={() => navigateToItem(subsection.id)}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <AppFooter />
      </ScrollView>
    </View>
  );
}

function SubsectionCard({
  subsection,
  isDocument,
  colors,
  onPress,
}: {
  subsection: any;
  isDocument: boolean;
  colors: any;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(0.8, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Navigate to ${subsection.title}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.subsectionCard,
          {
            backgroundColor: colors.card,
            borderColor: "rgba(255, 255, 255, 0.06)",
          },
          animatedStyle,
        ]}
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
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  headerSpacer: {
    width: 44,
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
