import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
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

const BORDER_WIDTH = 3;
const HORIZONTAL_PADDING = 16;

const IMAGE_SIZE =
  Dimensions.get("window").width - HORIZONTAL_PADDING * 2 - BORDER_WIDTH * 2;

/**
 * RN requires static `require()` for bundled images.
 * These civic-literacy items currently store imageUrl as a filename string,
 * so we map known filenames to static requires.
 *
 * NOTE: Liberty Bell has been seen in the wild with two filename variants.
 * We support both to avoid blank/missing images.
 */
const LOCAL_IMAGE_MAP: Record<string, any> = {
  // US Flag
  "1b18cc72-3bbe-43bf-afae-225d1e78ad1d.png": require("@/assets/images/1b18cc72-3bbe-43bf-afae-225d1e78ad1d.png"),

  // Liberty Bell (support both variants; both point to the real asset)
  "2e3ae459-a1fd-4386-8e95-620659542ac1.png": require("@/assets/images/2e3ae459-a1fd-4386-8e95-620659542ac1.png"),
  "2e3ae459-a1fd-4386-8e95-6206596542ac1.png": require("@/assets/images/2e3ae459-a1fd-4386-8e95-620659542ac1.png"),

  // Great Seal
  "59caabeb-9945-4ef8-828e-e82c1be074f2.png": require("@/assets/images/59caabeb-9945-4ef8-828e-e82c1be074f2.png"),

  // Statue of Liberty
  "693ab1a5-b598-478a-b111-3556ab568104.png": require("@/assets/images/693ab1a5-b598-478a-b111-3556ab568104.png"),

  // Bald Eagle
  "806a55b5-d460-4b36-9895-d6b2a5d5e181.png": require("@/assets/images/806a55b5-d460-4b36-9895-d6b2a5d5e181.png"),
};

function resolveImageSource(imageUrl?: string) {
  const cleaned = imageUrl?.trim();
  if (!cleaned) return undefined;

  // Remote URL? Use uri.
  if (/^https?:\/\//i.test(cleaned)) {
    return { uri: cleaned };
  }

  // Local bundled image filename? Use static require map.
  return LOCAL_IMAGE_MAP[cleaned];
}

/**
 * Detail Screen Component
 * Displays detailed information about a specific topic, including founding documents
 */
export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, shadows } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const { addToHistory } = useReadingHistory();
  const textMultiplier = getTextSizeMultiplier();

  let foundItem: any = null;
  let foundSection = "";
  let foundMainSection = "";

  // Find the item in content data
  try {
    for (const main of contentData) {
      if (!main || !main.sections) continue;
      for (const sec of main.sections) {
        if (!sec || !sec.subsections) continue;
        for (const sub of sec.subsections) {
          if (sub && sub.id === id) {
            foundItem = sub;
            foundSection = sec.title || "";
            foundMainSection = main.title || "";
            break;
          }
        }
        if (foundItem) break;
      }
      if (foundItem) break;
    }
  } catch (error) {
    if (__DEV__) {
      console.log("Error finding item:", error);
    }
  }

  /**
   * Add to reading history when item is viewed
   */
  useEffect(() => {
    if (foundItem && foundMainSection) {
      addToHistory({
        id: foundItem.id,
        title: foundItem.title,
        section: foundMainSection,
      });
    }
  }, [foundItem, foundMainSection, addToHistory]);

  /**
   * Handle back button press with haptic feedback
   */
  const handleBackPress = () => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log("Haptics error:", error);
      }
    }
    router.back();
  };

  /**
   * Render error state if item not found
   */
  if (!foundItem) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Details",
            headerBackTitle: "Back",
            headerBackTitleVisible: Platform.OS === "ios",
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
              Item not found
            </Text>
            <TouchableOpacity
              onPress={handleBackPress}
              style={[
                styles.backButton,
                {
                  backgroundColor: colors.primary,
                  ...shadows.small,
                },
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

  // Parse content sections
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

  const imageSource = resolveImageSource(foundItem.imageUrl);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: foundItem.title || "Details",
          headerBackTitle: "Back",
          headerBackTitleVisible: Platform.OS === "ios",
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
                ios_icon_name="doc.text.fill"
                android_material_icon_name="description"
                size={12}
                color={colors.primary}
              />
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                Founding Document
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Hero Image */}
        {!!imageSource && (
          <Animated.View
            style={styles.heroImageContainer}
            entering={FadeInDown.delay(100).springify()}
          >
            <Image
              source={imageSource}
              style={styles.heroImage}
              resizeMode="cover"
              onError={(e) => {
                if (__DEV__) {
                  console.log(
                    "Image load failed:",
                    foundItem?.imageUrl,
                    e?.nativeEvent
                  );
                }
              }}
            />
          </Animated.View>
        )}

        {/* Content Sections */}
        {isFoundingDoc ? (
          <>
            {/* Overview */}
            <Animated.View entering={FadeInDown.delay(150).springify()}>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    ...shadows.small,
                  },
                ]}
              >
                <Text
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Overview
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    {
                      color: colors.text,
                      fontSize: 15 * textMultiplier,
                      lineHeight: 24 * textMultiplier,
                    },
                  ]}
                >
                  {fullContent}
                </Text>
              </View>
            </Animated.View>

            {/* Full Text */}
            {hasFullText && (
              <>
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: colors.secondary + "20" },
                  ]}
                />
                <Animated.View entering={FadeInDown.delay(200).springify()}>
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.card,
                        ...shadows.small,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sectionLabel,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Full Text
                    </Text>
                    <Text
                      style={[
                        styles.bodyText,
                        {
                          color: colors.text,
                          fontSize: 15 * textMultiplier,
                          lineHeight: 24 * textMultiplier,
                        },
                      ]}
                    >
                      {foundItem.fullText}
                    </Text>
                  </View>
                </Animated.View>
              </>
            )}

            {/* Historical Context */}
            {hasContext && (
              <>
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: colors.secondary + "20" },
                  ]}
                />
                <Animated.View entering={FadeInDown.delay(250).springify()}>
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.card,
                        ...shadows.small,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sectionLabel,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Historical Context
                    </Text>
                    <Text
                      style={[
                        styles.bodyText,
                        {
                          color: colors.text,
                          fontSize: 15 * textMultiplier,
                          lineHeight: 24 * textMultiplier,
                        },
                      ]}
                    >
                      {foundItem.context}
                    </Text>
                  </View>
                </Animated.View>
              </>
            )}
          </>
        ) : (
          <>
            {/* Description */}
            <Animated.View entering={FadeInDown.delay(150).springify()}>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    ...shadows.small,
                  },
                ]}
              >
                <Text
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Description
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    {
                      color: colors.text,
                      fontSize: 15 * textMultiplier,
                      lineHeight: 24 * textMultiplier,
                    },
                  ]}
                >
                  {summary}
                </Text>
              </View>
            </Animated.View>

            {/* Additional Information */}
            {hasExtra && (
              <>
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: colors.secondary + "20" },
                  ]}
                />
                <Animated.View entering={FadeInDown.delay(200).springify()}>
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.card,
                        ...shadows.small,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sectionLabel,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Additional Information
                    </Text>
                    <Text
                      style={[
                        styles.bodyText,
                        {
                          color: colors.text,
                          fontSize: 15 * textMultiplier,
                          lineHeight: 24 * textMultiplier,
                        },
                      ]}
                    >
                      {details}
                    </Text>
                  </View>
                </Animated.View>
              </>
            )}
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
  breadcrumb: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
    opacity: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
    lineHeight: 36,
    letterSpacing: 0.3,
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
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
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
    textAlign: "center",
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
