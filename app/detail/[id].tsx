import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { contentData } from "@/data/contentData";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import { FavoriteToggle } from "@/components/FavoriteToggle";

const BORDER_WIDTH = 3;
const HORIZONTAL_PADDING = 16;

const IMAGE_SIZE =
  Dimensions.get("window").width - HORIZONTAL_PADDING * 2 - BORDER_WIDTH * 2;

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  // Locate subsection
  let foundItem: any = null;
  let foundSection = "";
  let foundMainSection = "";

  for (const main of contentData) {
    for (const sec of main.sections) {
      for (const sub of sec.subsections) {
        if (sub.id === id) {
          foundItem = sub;
          foundSection = sec.title;
          foundMainSection = main.title;
        }
      }
    }
  }

  // If item not found
  if (!foundItem) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Details",
            headerBackTitle: "Back",
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.card },
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol
              android_material_icon_name="error"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.errorText, { color: colors.text }]}>
              Item not found
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.backButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  // Split summary + details
  const fullContent = foundItem.content || "";
  const firstPeriod = fullContent.indexOf(".");
  const summary =
    firstPeriod !== -1
      ? fullContent.slice(0, firstPeriod + 1).trim()
      : fullContent;
  const details =
    firstPeriod !== -1 ? fullContent.slice(firstPeriod + 1).trim() : "";
  const hasExtra = details.length > 0;

  const hasFullText = foundItem.fullText?.trim()?.length > 0;
  const hasContext = foundItem.context?.trim()?.length > 0;
  const isFoundingDoc = hasFullText || hasContext;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: foundItem.title,
          headerBackTitle: "Back",
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
          headerRight: () => <FavoriteToggle itemId={id} />,
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
          <Text style={[styles.title, { color: colors.text }]}>
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
                android_material_icon_name="description"
                size={12}
                color={colors.primary}
              />
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                Founding Document
              </Text>
            </View>
          )}
        </View>

        {/* IMAGE */}
        {foundItem.imageUrl && (
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: foundItem.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* CONTENT */}
        {isFoundingDoc ? (
          <>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Overview
              </Text>
              <Text style={[styles.bodyText, { color: colors.text }]}>
                {fullContent}
              </Text>
            </View>

            {hasFullText && (
              <>
                <View style={[styles.divider]} />
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Full Text
                  </Text>
                  <Text style={[styles.bodyText, { color: colors.text }]}>
                    {foundItem.fullText}
                  </Text>
                </View>
              </>
            )}

            {hasContext && (
              <>
                <View style={[styles.divider]} />
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Historical Context
                  </Text>
                  <Text style={[styles.bodyText, { color: colors.text }]}>
                    {foundItem.context}
                  </Text>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Description
              </Text>
              <Text style={[styles.bodyText, { color: colors.text }]}>
                {summary}
              </Text>
            </View>

            {hasExtra && (
              <>
                <View style={styles.divider} />
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Additional Information
                  </Text>
                  <Text style={[styles.bodyText, { color: colors.text }]}>
                    {details}
                  </Text>
                </View>
              </>
            )}
          </>
        )}

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
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  breadcrumb: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 36,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    gap: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Square hero image with gold border, flush with cards
  heroImageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#D4AF37",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 4,
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },

  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
  },
});
