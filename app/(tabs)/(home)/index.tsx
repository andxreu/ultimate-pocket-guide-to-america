
import React, { useMemo, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
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

const HERO_FLAG_URL =
  "https://thehumanconservative.com/wp-content/uploads/2025/12/app-logo-2.0.png";

const HISTORY_ICON_URL =
  "https://thehumanconservative.com/wp-content/uploads/2025/11/Land-and-Life1.png";

const getIconName = (icon: string) => {
  const iconMap: { [key: string]: { ios: string; android: string } } = {
    book: { ios: "book.fill", android: "book" },
    school: { ios: "graduationcap.fill", android: "school" },
    flag: { ios: "flag.fill", android: "flag" },
    balance: { ios: "scale.3d", android: "balance" },
    globe: { ios: "globe.americas.fill", android: "public" },
    "balance-scale": { ios: "scale.3d", android: "balance" },
    history: { ios: "clock.fill", android: "history" },
  };

  return iconMap[icon] || { ios: "questionmark.circle", android: "help" };
};

export default function HomeScreen() {
  const { colors, shadows, animations } = useTheme();
  const router = useRouter();

  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [glowOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const navigateToSection = useCallback(
    (sectionId: string) => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        if (__DEV__) {
          console.log('Haptics error:', error);
        }
      }
      router.push(`/(tabs)/${sectionId}` as any);
    },
    [router]
  );

  // ✅ FIX: Use contentData directly - it already includes historyData
  const sectionCards = useMemo(() => {
    return contentData.map((section, index) => {
      const icons = getIconName(section.icon);
      const isHistory = section.id === 'history';
      
      return (
        <Animated.View
          key={section.id}
          entering={FadeInDown.delay(index * 100).springify()}
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
            <LinearGradient
              colors={[colors.borderGlow, colors.primary + '00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradientBorder}
            />
            
            <View
              style={[
                styles.iconContainer,
                { 
                  backgroundColor: colors.highlight,
                  ...shadows.small,
                },
              ]}
            >
              {isHistory ? (
                <Image
                  source={{ uri: HISTORY_ICON_URL }}
                  style={styles.historyIcon}
                  resizeMode="contain"
                />
              ) : (
                <IconSymbol
                  ios_icon_name={icons.ios}
                  android_material_icon_name={icons.android}
                  size={32}
                  color={colors.primary}
                  animated
                />
              )}
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {section.title}
              </Text>
              <Text
                style={[
                  styles.sectionDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {section.description}
              </Text>
            </View>
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
        <Animated.View style={styles.header} entering={FadeIn.duration(800)}>
          <View style={[styles.heroWrapper, { ...shadows.large }]}>
            <Animated.View style={[styles.glowLayer, glowStyle]}>
              <LinearGradient
                colors={[
                  colors.primary + '30',
                  colors.primary + '20',
                  colors.primary + '30',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 24 }]}
              />
            </Animated.View>

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
                source={{ uri: HERO_FLAG_URL }}
                style={styles.heroCard}
                imageStyle={styles.heroImage}
                resizeMode="contain"
              >
                <View
                  style={[
                    styles.heroOverlay,
                    { backgroundColor: colors.heroOverlay },
                  ]}
                />
              </ImageBackground>
            </LinearGradient>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <DailyInsightCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <LastReadCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(175).springify()}>
          <RecentlyViewedList />
        </Animated.View>

        <Animated.View
          style={styles.sectionsHeaderRow}
          entering={FadeInDown.delay(300).springify()}
        >
          <View style={styles.sectionHeaderLine}>
            <LinearGradient
              colors={[
                colors.primary + '00',
                colors.primary + '60',
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
                colors.primary + '60',
                colors.primary + '00',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.headerGradient}
            />
          </View>
        </Animated.View>

        <View style={styles.sectionsContainer}>{sectionCards}</View>

        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <QuickAccessGrid />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? 48 : 32,
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
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 24,
    zIndex: -1,
  },
  flagBorder: {
    borderRadius: 20,
    padding: 2.5,
  },
  heroCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 17.5,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: '#1A1A1A',
  },
  heroImage: {
    borderRadius: 17.5,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 17.5,
  },
  sectionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
  },
  headerGradient: {
    width: '100%',
    height: '100%',
  },
  sectionsHeaderText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    lineHeight: 16,
  },
  sectionsContainer: {
    gap: 14,
    marginBottom: 32,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    position: 'relative',
    overflow: 'hidden',
  },
  cardGradientBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  historyIcon: {
    width: 36,
    height: 36,
    tintColor: '#D4AF37',
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.85,
  },
});
