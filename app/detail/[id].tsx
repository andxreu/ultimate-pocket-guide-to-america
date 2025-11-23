
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the item in contentData
  let foundItem: any = null;
  let foundSection = "";
  let foundMainSection = "";

  for (const mainSection of contentData) {
    for (const section of mainSection.sections) {
      for (const subsection of section.subsections) {
        if (subsection.id === id) {
          foundItem = subsection;
          foundSection = section.title;
          foundMainSection = mainSection.title;
          break;
        }
      }
      if (foundItem) break;
    }
    if (foundItem) break;
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

  if (!foundItem) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Not Found",
            headerShown: true,
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
            headerBackTitle: "Back",
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
              Item not found
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

  // Base content
  const fullContent: string = foundItem.content ?? "";
  let summary = fullContent;
  let details = "";

  const firstPeriodIndex = fullContent.indexOf(".");
  if (firstPeriodIndex !== -1) {
    summary = fullContent.slice(0, firstPeriodIndex + 1).trim();
    details = fullContent.slice(firstPeriodIndex + 1).trim();
  }

  const hasExtraDetails =
    details.length > 0 && details.trim() !== summary.trim();

  const hasFullText =
    typeof foundItem.fullText === "string" &&
    foundItem.fullText.trim().length > 0;

  const hasContext =
    typeof foundItem.context === "string" &&
    foundItem.context.trim().length > 0;

  const isFoundingDoc = hasFullText || hasContext;

  return (
    <>
      <Stack.Screen
        options={{
          title: foundItem.title,
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
          <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>
            {foundMainSection} › {foundSection}
          </Text>
          <Text
            style={[styles.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            {foundItem.title}
          </Text>

          {isFoundingDoc && (
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
              <Text
                style={[
                  styles.badgeText,
                  { color: colors.primary },
                ]}
              >
                Founding Document
              </Text>
            </View>
          )}
        </View>

        {/* HERO IMAGE */}
        {foundItem.imageUrl && (
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: foundItem.imageUrl }}
              style={[
                styles.heroImage,
                {
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                },
              ]}
              resizeMode="cover"
            />
          </View>
        )}

        {/* FOUNDING DOCUMENT LAYOUT */}
        {isFoundingDoc ? (
          <>
            {/* Overview */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Overview
              </Text>
              <Text style={[styles.bodyText, { color: colors.text }]}>
                {fullContent}
              </Text>
            </View>

            {/* Divider */}
            {hasFullText && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: colors.textSecondary + "20" },
                ]}
              />
            )}

            {/* Full Text */}
            {hasFullText && (
              <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
                <Text
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Full Document Text
                </Text>
                <Text style={[styles.bodyText, { color: colors.text }]}>
                  {foundItem.fullText}
                </Text>
              </View>
            )}

            {/* Divider */}
            {hasContext && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: colors.textSecondary + "20" },
                ]}
              />
            )}

            {/* Historical Context */}
            {hasContext && (
              <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
                <Text
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Historical Context
                </Text>
                <Text style={[styles.bodyText, { color: colors.text }]}>
                  {foundItem.context}
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Description */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Description
              </Text>
              <Text style={[styles.description, { color: colors.text }]}>
                {summary}
              </Text>
            </View>

            {/* Divider */}
            {hasExtraDetails && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: colors.textSecondary + "20" },
                ]}
              />
            )}

            {/* Additional Information */}
            {hasExtraDetails && (
              <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.primary + "15" }]}>
                <Text
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Additional Information
                </Text>
                <Text style={[styles.bodyText, { color: colors.text }]}>
                  {details}
                </Text>
              </View>
            )}
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
  breadcrumb: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18.85,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 40.6,
  },
  favoriteButton: {
    padding: 8,
    marginRight: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageContainer: {
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    alignSelf: "center",
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
  bodyText: {
    fontSize: 16,
    lineHeight: 23.2,
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    gap: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    lineHeight: 14.5,
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
