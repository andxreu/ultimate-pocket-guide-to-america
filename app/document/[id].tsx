
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { contentData } from "@/data/contentData";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

const FAVORITES_KEY = 'favorites';

// Define which subsections are founding documents
const FOUNDING_DOCUMENTS = [
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
];

export default function DocumentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the document in contentData
  let foundDocument: any = null;
  let foundSection = "";
  let foundMainSection = "";

  for (const mainSection of contentData) {
    for (const section of mainSection.sections) {
      for (const subsection of section.subsections) {
        if (
          subsection.id === id &&
          FOUNDING_DOCUMENTS.includes(subsection.id)
        ) {
          foundDocument = subsection;
          foundSection = section.title;
          foundMainSection = mainSection.title;
          break;
        }
      }
      if (foundDocument) break;
    }
    if (foundDocument) break;
  }

  useEffect(() => {
    checkFavoriteStatus();
  }, [id]);

  const checkFavoriteStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favorites: string[] = JSON.parse(stored);
        setIsFavorite(favorites.includes(id));
      }
    } catch (error) {
      console.log('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let favorites: string[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favorites = favorites.filter((fid) => fid !== id);
      } else {
        favorites = [...new Set([...favorites, id])];
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // Haptic feedback on iOS
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };

  if (!foundDocument) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Not Found",
            headerShown: true,
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol
              ios_icon_name="exclamationmark.triangle.fill"
              android_material_icon_name="error"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.errorText, { color: colors.text }]}>
              Document not found
            </Text>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.primary }]}
              onPress={() => router.back()}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  const isConstitution = id === "constitution";

  const hasFullText =
    typeof foundDocument.fullText === "string" &&
    foundDocument.fullText.trim().length > 0;
  const hasContext =
    typeof foundDocument.context === "string" &&
    foundDocument.context.trim().length > 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: foundDocument.title,
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerBackTitle: "Back",
          headerRight: () => (
            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.favoriteButton}
              accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
              accessibilityRole="button"
            >
              <IconSymbol
                ios_icon_name={isFavorite ? "star.fill" : "star"}
                android_material_icon_name={isFavorite ? "star" : "star_border"}
                size={24}
                color={isFavorite ? colors.primary : colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.primary + "15",
                borderColor: colors.primary + "30",
              },
            ]}
          >
            <IconSymbol
              ios_icon_name="doc.text.fill"
              android_material_icon_name="description"
              size={12}
              color={colors.primary}
            />
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              Founding Document
            </Text>
          </View>
          <Text
            style={[styles.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            {foundDocument.title}
          </Text>
          <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>
            {foundMainSection} › {foundSection}
          </Text>
        </View>

        {/* OVERVIEW */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
          <Text
            style={[styles.sectionLabel, { color: colors.textSecondary }]}
          >
            Overview
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {foundDocument.content}
          </Text>
        </View>

        {/* CONSTITUTION STRUCTURE */}
        {isConstitution && (
          <>
            <View
              style={[
                styles.divider,
                { backgroundColor: colors.textSecondary + "20" },
              ]}
            />
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Document Structure
              </Text>
              <View style={styles.structureSection}>
                <Text style={[styles.structureTitle, { color: colors.text }]}>
                  Articles
                </Text>
                <Text
                  style={[styles.structureText, { color: colors.textSecondary }]}
                >
                  • Article I - Legislative Branch{"\n"}
                  • Article II - Executive Branch{"\n"}
                  • Article III - Judicial Branch{"\n"}
                  • Article IV - States&apos; Relations{"\n"}
                  • Article V - Amendment Process{"\n"}
                  • Article VI - Federal Power{"\n"}
                  • Article VII - Ratification
                </Text>
              </View>
              <View style={styles.structureSection}>
                <Text style={[styles.structureTitle, { color: colors.text }]}>
                  Amendments
                </Text>
                <Text
                  style={[styles.structureText, { color: colors.textSecondary }]}
                >
                  • Amendments 1–10: Bill of Rights{"\n"}
                  • Amendments 11–27: Additional Amendments
                </Text>
              </View>
            </View>
          </>
        )}

        {/* FULL TEXT (IF PRESENT) */}
        {hasFullText && (
          <>
            <View
              style={[
                styles.divider,
                { backgroundColor: colors.textSecondary + "20" },
              ]}
            />
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Full Document Text
              </Text>
              <Text style={[styles.documentText, { color: colors.text }]}>
                {foundDocument.fullText}
              </Text>
            </View>
          </>
        )}

        {/* HISTORICAL CONTEXT (IF PRESENT) */}
        {hasContext && (
          <>
            <View
              style={[
                styles.divider,
                { backgroundColor: colors.textSecondary + "20" },
              ]}
            />
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Historical Context
              </Text>
              <Text style={[styles.bodyText, { color: colors.text }]}>
                {foundDocument.context}
              </Text>
            </View>
          </>
        )}

        {/* FOOTER */}
        <AppFooter />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
    gap: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    lineHeight: 14.5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 40.6,
    marginBottom: 8,
  },
  breadcrumb: {
    fontSize: 13,
    lineHeight: 18.85,
  },
  favoriteButton: {
    padding: 8,
    marginRight: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 16,
    lineHeight: 15.95,
  },
  description: {
    fontSize: 16,
    lineHeight: 23.2,
  },
  structureSection: {
    marginBottom: 16,
  },
  structureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 23.2,
  },
  structureText: {
    fontSize: 14,
    lineHeight: 20.3,
  },
  documentText: {
    fontSize: 15,
    lineHeight: 21.75,
    fontFamily: "SpaceMono",
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 23.2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 29,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23.2,
  },
});
