import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { mapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

/**
 * Region Detail Screen Component
 * Displays a region's information and list of states within that region
 */
export default function RegionDetailScreen() {
  const { colors, shadows } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const region = mapData.find((r) => r.id === id);

  /**
   * Handle state card press with haptic feedback
   */
  const handleStatePress = useCallback((stateCode: string) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    router.push(`/map/state/${stateCode.toLowerCase()}` as any);
  }, [router]);

  /**
   * Render error state if region not found
   */
  if (!region) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Region",
            headerShown: true,
            headerBackTitle: "Back",
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
              Region not found
            </Text>
            <TouchableOpacity
              style={[
                styles.backButton, 
                { 
                  backgroundColor: colors.primary,
                  ...shadows.small 
                }
              ]}
              onPress={() => router.back()}
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

  return (
    <>
      <Stack.Screen
        options={{
          title: region.name,
          headerShown: true,
          headerBackTitle: "Map",
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
          headerShadowVisible: false,
        }}
      />
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
              {region.name}
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {region.description}
            </Text>
          </Animated.View>

          {/* Section Title */}
          <Animated.View 
            style={styles.sectionHeader}
            entering={FadeInDown.delay(100).springify()}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              States in this region
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
          </Animated.View>

          {/* States List */}
          <View style={styles.statesContainer}>
            {region.states.map((state, index) => (
              <Animated.View
                key={state.code}
                entering={FadeInDown.delay(150 + index * 50).springify()}
              >
                <StateCard
                  state={state}
                  colors={colors}
                  shadows={shadows}
                  onPress={() => handleStatePress(state.code)}
                />
              </Animated.View>
            ))}
          </View>

          <AppFooter />
        </ScrollView>
      </View>
    </>
  );
}

/**
 * State Card Component
 * Animated card for individual state with press interaction
 */
function StateCard({
  state,
  colors,
  shadows,
  onPress,
}: {
  state: any;
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
      accessibilityLabel={`Navigate to ${state.name}`}
      accessibilityRole="button"
      accessibilityHint={`View details about ${state.name}`}
    >
      <Animated.View
        style={[
          styles.stateCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary + "10",
            ...shadows.small,
          },
          animatedStyle,
        ]}
      >
        {/* State Code Badge */}
        <View
          style={[
            styles.stateCodeBadge, 
            { backgroundColor: colors.primary + '20' }
          ]}
        >
          <Text style={[styles.stateCode, { color: colors.primary }]}>
            {state.code}
          </Text>
        </View>

        {/* State Name */}
        <View style={styles.stateContent}>
          <Text 
            style={[styles.stateName, { color: colors.text }]}
            numberOfLines={1}
          >
            {state.name}
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
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginTop: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  stateBadge: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  stateCount: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  statesContainer: {
    gap: 12,
  },
  stateCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    minHeight: 72,
    gap: 14,
  },
  stateCodeBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  stateCode: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  stateContent: {
    flex: 1,
  },
  stateName: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  chevron: {
    opacity: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 20,
    lineHeight: 26,
    textAlign: 'center',
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
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});