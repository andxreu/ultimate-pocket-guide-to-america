import React, { useEffect } from "react";
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
import { useTextSize } from "@/contexts/TextSizeContext";
import { useReadingHistory } from "@/contexts/ReadingHistoryContext";
import { IconSymbol } from "@/components/IconSymbol";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const FOUNDING_DOCUMENTS = [
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
];

/**
 * Document Screen Component
 * Displays founding documents with full text and historical context
 */
export default function DocumentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, shadows } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const { addToHistory } = useReadingHistory();
  const textMultiplier = getTextSizeMultiplier();

  let foundDocument: any = null;
  let foundSection = "";
  let foundMainSection = "";

  // Find document in content data
  for (const main of contentData) {
    for (const sec of main.sections) {
      for (const sub of sec.subsections) {
        if (sub.id === id && FOUNDING_DOCUMENTS.includes(sub.id)) {
          foundDocument = sub;
          foundSection = sec.title;
          foundMainSection = main.title;
        }
      }
    }
  }

  /**
   * Add to reading history when document is viewed
   */
  useEffect(() => {
    if (foundDocument && foundMainSection) {
      addToHistory({
        id: foundDocument.id,
        title: foundDocument.title,
        section: foundMainSection,
      });
    }
  }, [foundDocument, foundMainSection, addToHistory]);

  /**
   * Handle back button press with haptic feedback
   */
  const handleBackPress = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    router.back();
  };

  /**
   * Render error state if document not found
   */
  if (!foundDocument) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Document",
            headerBackTitle: "Back",
            headerBackTitleVisible: Platform.OS === 'ios',
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.card },
            headerShadowVisible: false,
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <Animated.View 
            style={styles.errorContainer}
            entering={FadeIn.duration(400)}
          >
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
              onPress={handleBackPress}
              style={[
                styles.backButton, 
                { 
                  backgroundColor: colors.primary,
                  ...shadows.small,
                }
              ]}
              activeOpacity={0.8}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </>
    );
  }

  const hasFullText = foundDocument.fullText?.trim()?.length > 0;
  const hasContext = foundDocument.context?.trim()?.length > 0;
  const isConstitution = id === "constitution";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: foundDocument.title,
          headerBackTitle: "Back",
          headerBackTitleVisible: Platform.OS === 'ios',
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
          headerShadowVisible: false,
          headerRight: () => (
            <View style={styles.headerRight}>
              <FavoriteToggle itemId={id} size={22} />
            </View>
          ),
        }}
      />

      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.delay(50).springify()}
        >
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

          <Text style={[styles.title, { color: colors.text }]}>
            {foundDocument.title}
          </Text>

          <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>
            {foundMainSection} › {foundSection}
          </Text>
        </Animated.View>

        {/* Overview */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View 
            style={[
              styles.card, 
              { 
                backgroundColor: colors.card,
                ...shadows.small,
              }
            ]}
          >
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              Overview
            </Text>
            <Text 
              style={[
                styles.bodyText, 
                { 
                  color: colors.text, 
                  fontSize: 15 * textMultiplier, 
                  lineHeight: 24 * textMultiplier 
                }
              ]}
            >
              {foundDocument.content}
            </Text>
          </View>
        </Animated.View>

        {/* Constitution Structure */}
        {isConstitution && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.secondary + '20' }]} />

            <Animated.View entering={FadeInDown.delay(150).springify()}>
              <View 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: colors.card,
                    ...shadows.small,
                  }
                ]}
              >
                <Text
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Document Structure
                </Text>

                <Text 
                  style={[
                    styles.bodyText, 
                    { 
                      color: colors.text, 
                      fontSize: 15 * textMultiplier, 
                      lineHeight: 24 * textMultiplier 
                    }
                  ]}
                >
                  • Article I — Legislative{"\n"}
                  • Article II — Executive{"\n"}
                  • Article III — Judicial{"\n"}
                  • Article IV — States{"\n"}
                  • Article V — Amendments{"\n"}
                  • Article VI — Federal Power{"\n"}
                  • Article VII — Ratification{"\n"}
                  {"\n"}
                  Bill of Rights (1–10){"\n"}
                  Amendments 11–27
                </Text>
              </View>
            </Animated.View>
          </>
        )}

        {/* Full Text */}
        {hasFullText && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.secondary + '20' }]} />
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <View 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: colors.card,
                    ...shadows.small,
                  }
                ]}
              >
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                  Full Text
                </Text>
                <Text 
                  style={[
                    styles.bodyText, 
                    { 
                      color: colors.text, 
                      fontSize: 15 * textMultiplier, 
                      lineHeight: 24 * textMultiplier 
                    }
                  ]}
                >
                  {foundDocument.fullText}
                </Text>
              </View>
            </Animated.View>
          </>
        )}

        {/* Historical Context */}
        {hasContext && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.secondary + '20' }]} />
            <Animated.View entering={FadeInDown.delay(250).springify()}>
              <View 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: colors.card,
                    ...shadows.small,
                  }
                ]}
              >
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                  Historical Context
                </Text>
                <Text 
                  style={[
                    styles.bodyText, 
                    { 
                      color: colors.text, 
                      fontSize: 15 * textMultiplier, 
                      lineHeight: 24 * textMultiplier 
                    }
                  ]}
                >
                  {foundDocument.context}
                </Text>
              </View>
            </Animated.View>
          </>
        )}
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
    lineHeight: 36,
    letterSpacing: 0.3,
  },
  breadcrumb: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: '700',
    opacity: 0.8,
  },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  headerRight: {
    marginRight: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minHeight: 48,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});