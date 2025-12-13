import React, { useMemo, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import QuickAccessGrid from "@/components/QuickAccessGrid";
import DailyInsightCard from "@/components/DailyInsightCard";
import LastReadCard from "@/components/LastReadCard";
import RecentlyViewedList from "@/components/RecentlyViewedList";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Hero image
const HERO_IMAGE = require("@/assets/images/d4ded13e-953f-43c6-b97c-4fe496414321.png");

/**
 * Icon mapping for sections - using vector icons
 * Maps content data icon names to Material icon components
 */
const getSectionIcon = (
  iconName: string
): { name: string; library: "material" | "community" } => {
  const iconMap: Record<string, { name: string; library: "material" | "community" }> =
    {
      book: { name: "book", library: "material" },
      school: { name: "school", library: "material" },
      flag: { name: "flag", library: "material" },
      balance: { name: "gavel", library: "material" },
      "balance-scale": { name: "gavel", library: "material" },
      globe: { name: "public", library: "material" },
      history: { name: "history-edu", library: "material" },
    };

  return iconMap[iconName] || { name: "help-outline", library: "material" };
};

/**
 * Home Screen Component
 * Main landing page featuring hero image, insights, and section navigation
 */
export default function HomeScreen() {
  const { colors, shadows } = useTheme();
  const router = useRouter();

  /**
   * Navigate to section with haptic feedback
   * Memoized to prevent recreation on each render
   */
  const navigateToSection = useCallback(
    (sectionId: string) => {
      try {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      } catch (error) {
        if (__DEV__) {
          console.log('Haptics error:', error);
        }
      }
      router.push(`/(tabs)/${sectionId}` as any);
    },
    [router]
  );

  /**
   * Render section cards with staggered animations
   * Memoized to prevent unnecessary re-renders
   */
  const sectionCards = useMemo(() => {
    return contentData.map((section, index) => {
      const iconConfig = getSectionIcon(section.icon);
      const IconComponent =
        iconConfig.library === "community" ? MaterialCommunityIcons : MaterialIcons;

      return (
        <Animated.View 
          key={section.id} 
          entering={FadeInDown.delay(index * 80).springify()}
        >
          <TouchableOpacity
            style={[
              styles.sectionCard,
              { 
                backgroundColor: colors.card, 
                ...shadows.medium 
              },
            ]}
            onPress={() => navigateToSection(section.id)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Navigate to ${section.title}`}
            accessibilityHint={section.description}
          >
            {/* Icon with gradient background */}
            <View 
              style={[
                styles.iconWrapper,
                { backgroundColor: colors.primary + '15' }
              ]}
            >
              <IconComponent 
                name={iconConfig.name as any} 
                size={32} 
                color={colors.primary} 
              />
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
              <Text 
                style={[styles.sectionTitle, { color: colors.text }]}
                numberOfLines={2}
              >
                {section.title}
              </Text>
              <Text
                style={[styles.sectionDescription, { color: colors.textSecondary }]}
                numberOfLines={2}
              >
                {section.description}
              </Text>
            </View>

            {/* Chevron indicator */}
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={colors.textSecondary}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    });
  }, [colors, shadows, navigateToSection]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        // Performance optimization
        removeClippedSubviews={Platform.OS === 'android'}
      >
        {/* Hero Image */}
        <Animated.View 
          entering={FadeIn.duration(600)} 
          style={styles.heroImageWrap}
        >
          <Image
            source={HERO_IMAGE}
            style={styles.heroImage}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel="American flag representing the Pocket Guide to America"
          />
        </Animated.View>

        {/* Daily Insight Card */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <DailyInsightCard />
        </Animated.View>

        {/* Last Read Card */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <LastReadCard />
        </Animated.View>

        {/* Recently Viewed List */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <RecentlyViewedList />
        </Animated.View>

        {/* Section Header */}
        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <Text style={[styles.exploreText, { color: colors.textSecondary }]}>
            EXPLORE THE GUIDE
          </Text>
        </Animated.View>

        {/* Section Cards */}
        <View style={styles.sectionsContainer}>{sectionCards}</View>

        {/* Quick Access Grid */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <QuickAccessGrid />
        </Animated.View>

        {/* Bottom spacer for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  heroImageWrap: {
    alignItems: "center",
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: 280,
  },
  exploreText: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginVertical: 20,
    marginTop: 8,
  },
  sectionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    minHeight: 88,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.85,
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.5,
  },
  bottomSpacer: {
    height: 40,
  },
});