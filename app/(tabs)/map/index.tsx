import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { mapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
  FadeIn,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

/**
 * Map Explorer Screen Component
 * Main landing page for browsing U.S. regions and states
 * Features animated region cards with state counts
 */
export default function MapExplorerScreen() {
  const { colors, shadows } = useTheme();
  const router = useRouter();

  /**
   * Handle region press with haptic feedback
   */
  const handleRegionPress = useCallback((regionId: string) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    router.push(`/map/region/${regionId}` as any);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.delay(50).springify()}
        >
          <Text
            style={[styles.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            American Map Explorer
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Explore the diverse regions and states that make up the United
            States of America.
          </Text>
        </Animated.View>

        {/* Regions List */}
        <View style={styles.regionsContainer}>
          {mapData.map((region, index) => (
            <Animated.View
              key={region.id}
              entering={FadeInDown.delay(100 + index * 50).springify()}
            >
              <RegionCard
                region={region}
                colors={colors}
                shadows={shadows}
                onPress={() => handleRegionPress(region.id)}
              />
            </Animated.View>
          ))}
        </View>

        <AppFooter />
      </ScrollView>
    </View>
  );
}

/**
 * Region Card Component
 * Animated card displaying region information with press interaction
 */
function RegionCard({
  region,
  colors,
  shadows,
  onPress,
}: {
  region: any;
  colors: any;
  shadows: any;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Navigate to ${region.name} region`}
      accessibilityRole="button"
      accessibilityHint={`View ${region.states.length} states in this region`}
    >
      <Animated.View
        style={[
          styles.regionCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary + "10",
            ...shadows.small,
          },
          animatedStyle,
        ]}
      >
        {/* Left accent bar */}
        <View 
          style={[
            styles.accentBar, 
            { backgroundColor: colors.primary }
          ]} 
        />

        <View style={styles.regionContent}>
          {/* Region Header */}
          <View style={styles.regionHeader}>
            <Text 
              style={[styles.regionTitle, { color: colors.text }]}
              numberOfLines={1}
            >
              {region.name}
            </Text>
            <View 
              style={[
                styles.stateBadge, 
                { backgroundColor: colors.primary + '20' }
              ]}
            >
              <Text style={[styles.stateCount, { color: colors.primary }]}>
                {region.states.length}
              </Text>
            </View>
          </View>

          {/* Region Description */}
          <Text
            style={[styles.regionDescription, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {region.description}
          </Text>
        </View>

        {/* Chevron */}
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron_right"
          size={20}
          color={colors.textSecondary}
          style={styles.chevron}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 32 : 24,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    lineHeight: 40,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  regionsContainer: {
    gap: 12,
  },
  regionCard: {
    flexDirection: "row",
    padding: 16,
    paddingLeft: 20,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    minHeight: 96,
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  regionContent: {
    flex: 1,
    gap: 6,
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0.3,
    flex: 1,
  },
  stateBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  stateCount: {
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },
  regionDescription: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.85,
  },
  chevron: {
    opacity: 0.5,
  },
});