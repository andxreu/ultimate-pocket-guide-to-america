
import React, { useMemo, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import QuickAccessGrid from "@/components/QuickAccessGrid";
import DailyInsightCard from "@/components/DailyInsightCard";
import LastReadCard from "@/components/LastReadCard";
import RecentlyViewedList from "@/components/RecentlyViewedList";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Updated hero image to use the uploaded asset
const HERO_IMAGE = require("@/assets/images/d4ded13e-953f-43c6-b97c-4fe496414321.png");

/**
 * Icon mapping for sections - using vector icons
 */
const getSectionIcon = (iconName: string): { name: string; library: 'material' | 'community' } => {
  const iconMap: Record<string, { name: string; library: 'material' | 'community' }> = {
    'book': { name: 'book', library: 'material' },
    'school': { name: 'school', library: 'material' },
    'flag': { name: 'flag', library: 'material' },
    'balance': { name: 'gavel', library: 'material' },
    'balance-scale': { name: 'gavel', library: 'material' },
    'globe': { name: 'public', library: 'material' },
    'history': { name: 'history-edu', library: 'material' },
  };

  return iconMap[iconName] || { name: 'help-outline', library: 'material' };
};

export default function HomeScreen() {
  const { colors, shadows, animations, isDark } = useTheme();
  const router = useRouter();

  // Glow animation for hero card
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [glowOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  /**
   * Navigate to section with haptic feedback
   */
  const navigateToSection = useCallback(
    (sectionId: string) => {
      try {
        if (Platform.OS !== 'web') {
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
   * Render section cards with beautiful design
   */
  const sectionCards = useMemo(() => {
    return contentData.map((section, index) => {
      const iconConfig = getSectionIcon(section.icon);
      const IconComponent = iconConfig.library === 'community' 
        ? MaterialCommunityIcons 
        : MaterialIcons;
      
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
                ...shadows.medium,
              },
            ]}
            onPress={() => navigateToSection(section.id)}
            activeOpacity={0.85}
            accessibilityLabel={`Navigate to ${section.title}`}
            accessibilityRole="button"
          >
            {/* Left accent border */}
            <LinearGradient
              colors={[
                colors.primary + 'E6',
                colors.goldGradientEnd + 'CC',
                colors.primary + '00',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.cardAccent}
            />
            
            {/* Icon container with gradient background */}
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={[
                  colors.primary + '20',
                  colors.highlight,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.iconContainer,
                  shadows.small,
                ]}
              >
                <IconComponent
                  name={iconConfig.name as any}
                  size={32}
                  color={colors.primary}
                />
              </LinearGradient>
            </View>
            
            {/* Content */}
            <View style={styles.cardContent}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {section.title}
              </Text>
              <Text
                style={[
                  styles.sectionDescription,
                  { color: colors.textSecondary },
                ]}
                numberOfLines={2}
              >
                {section.description}
              </Text>
            </View>

            {/* Chevron */}
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
      >
        {/* Hero Section */}
        <Animated.View style={styles.header} entering={FadeIn.duration(800)}>
          <View style={[styles.heroWrapper, shadows.large]}>
            {/* Animated glow layer */}
            <Animated.View style={[styles.glowLayer, glowStyle]}>
              <LinearGradient
                colors={[
                  colors.primary + '35',
                  colors.goldGradientStart + '25',
                  colors.primary + '35',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 24 }]}
              />
            </Animated.View>

            {/* Gold gradient border */}
            <LinearGradient
              colors={[
                colors.goldGradientStart,
                colors.primary,
                colors.goldGradientEnd,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.flagBorder}
            >
              <ImageBackground
                source={HERO_IMAGE}
                style={styles.heroCard}
                imageStyle={styles.heroImage}
                resizeMode="contain"
              >
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0)',
                    colors.heroOverlay,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.heroGradient}
                />
              </ImageBackground>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Daily Insight */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <DailyInsightCard />
        </Animated.View>

        {/* Last Read */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <LastReadCard />
        </Animated.View>

        {/* Recently Viewed */}
        <Animated.View entering={FadeInDown.delay(175).springify()}>
          <RecentlyViewedList />
        </Animated.View>

        {/* Section Header */}
        <Animated.View
          style={styles.sectionsHeaderRow}
          entering={FadeInDown.delay(250).springify()}
        >
          <View style={styles.sectionHeaderLine}>
            <LinearGradient
              colors={[
                colors.primary + '00',
                colors.primary + '80',
                colors.primary + '00',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.headerGradient}
            />
          </View>
          <Text
            style={[
              styles.sectionsHeaderText,
              { color: colors.textSecondary },
            ]}
          >
            EXPLORE THE GUIDE
          </Text>
          <View style={styles.sectionHeaderLine}>
            <LinearGradient
              colors={[
                colors.primary + '00',
                colors.primary + '80',
                colors.primary + '00',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.headerGradient}
            />
          </View>
        </Animated.View>

        {/* Section Cards */}
        <View style={styles.sectionsContainer}>{sectionCards}</View>

        {/* Quick Access Grid */}
        <Animated.View entering={FadeInDown.delay(600).springify()}>
          <QuickAccessGrid />
        </Animated.View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  heroWrapper: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'visible',
  },
  glowLayer: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 26,
    zIndex: -1,
  },
  flagBorder: {
    borderRadius: 20,
    padding: 3,
  },
  heroCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 17,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    borderRadius: 17,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 17,
  },
  sectionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
    gap: 12,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  headerGradient: {
    width: '100%',
    height: '100%',
  },
  sectionsHeaderText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    lineHeight: 16,
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
    position: 'relative',
    overflow: 'hidden',
    minHeight: 88,
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  iconWrapper: {
    marginRight: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
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
    height: 20,
  },
});
