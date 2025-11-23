
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const HERO_FLAG_URL =
  "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image.png?w=1024&ssl=1";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmerValue.value, [0, 0.5, 1], [0.95, 1, 0.95]);
    return {
      opacity,
    };
  });

  const getIconName = (icon: string) => {
    const iconMap: { [key: string]: { ios: string; android: string } } = {
      book: { ios: "book.fill", android: "book" },
      school: { ios: "graduationcap.fill", android: "school" },
      flag: { ios: "flag.fill", android: "flag" },
      "balance-scale": { ios: "scale.3d", android: "balance" },
      globe: { ios: "globe.americas.fill", android: "public" },
    };
    return iconMap[icon] || { ios: "circle.fill", android: "circle" };
  };

  const navigateToSection = (sectionId: string) => {
    router.push(`/(tabs)/${sectionId}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO CARD */}
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: HERO_FLAG_URL }}
            style={styles.heroCard}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <Animated.View style={shimmerStyle}>
                <Text
                  style={[styles.title, { color: "#FFFFFF" }]}
                  accessibilityLabel="Ultimate Pocket Guide to America"
                  accessibilityRole="header"
                >
                  Ultimate Pocket Guide to America
                </Text>
              </Animated.View>
              <Text style={[styles.subtitle, { color: "#E5E7EB" }]}>
                Your pocket guide to the principles, foundations, and story of
                the American Republic.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* SECTIONS HEADER */}
        <View style={styles.sectionsHeaderRow}>
          <Text style={[styles.sectionsHeaderText, { color: colors.textSecondary }]}>
            Explore the guide
          </Text>
        </View>

        {/* SECTIONS LIST */}
        <View style={styles.sectionsContainer}>
          {contentData.map((section, index) => {
            const icons = getIconName(section.icon);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: "rgba(255, 255, 255, 0.06)",
                  },
                ]}
                onPress={() => navigateToSection(section.id)}
                activeOpacity={0.7}
                accessibilityLabel={`Navigate to ${section.title}`}
                accessibilityRole="button"
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.highlight },
                  ]}
                >
                  <IconSymbol
                    ios_icon_name={icons.ios}
                    android_material_icon_name={icons.android}
                    size={28}
                    color={colors.primary}
                  />
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
            );
          })}
        </View>

        {/* FOOTER */}
        <AppFooter />
      </ScrollView>
    </View>
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

  /* HERO */
  header: {
    marginBottom: 20,
  },
  heroCard: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  heroImage: {
    resizeMode: "cover",
  },
  heroOverlay: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 8,
    lineHeight: 31.9,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20.3,
    textAlign: "left",
  },

  /* SECTION HEADERS */
  sectionsHeaderRow: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionsHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    opacity: 0.7,
  },

  /* SECTION CARDS */
  sectionsContainer: {
    gap: 12,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 24.65,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18.85,
  },
});
