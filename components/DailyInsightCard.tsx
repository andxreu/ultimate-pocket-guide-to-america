import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getInsightOfTheDay, getRandomInsight, DailyInsight } from '@/data/insightsData';
import * as Haptics from 'expo-haptics';
import Animated, { 
  FadeIn, 
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Daily Insight Card Component
 * 
 * Displays a random American civics insight with:
 * - Daily rotation (same insight per day)
 * - Manual refresh capability with animation
 * - Haptic feedback on interaction
 * - Smooth fade transitions
 * - Rotating refresh icon
 * - Gradient accents
 * 
 * @example
 * ```tsx
 * <DailyInsightCard />
 * ```
 */
export default function DailyInsightCard() {
  const { colors, shadows } = useTheme();
  const [insight, setInsight] = useState<DailyInsight>(() => getInsightOfTheDay());
  const [key, setKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  /**
   * Handle refresh with haptic feedback and animations
   */
  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    // Rotate animation for icon
    rotateValue.value = withSequence(
      withSpring(360, { damping: 12, stiffness: 100 }),
      withTiming(0, { duration: 0 })
    );

    // Scale animation for button press
    scaleValue.value = withSequence(
      withSpring(0.9, { damping: 12 }),
      withSpring(1, { damping: 12 })
    );

    // Update insight after a brief delay for animation
    setTimeout(() => {
      setInsight(getRandomInsight());
      setKey(prev => prev + 1);
      setIsRefreshing(false);
    }, 100);
  }, [isRefreshing, rotateValue, scaleValue]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          ...shadows.medium,
        },
      ]}
    >
      {/* Top gradient accent */}
      <LinearGradient
        colors={[
          colors.primary + '40',
          colors.primary + '20',
          colors.primary + '00',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topGradient}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <LinearGradient
            colors={[
              colors.primary + '25',
              colors.highlight,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons
              name="bulb"
              size={20}
              color={colors.primary}
            />
          </LinearGradient>
          <Text 
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            Daily American Insight
          </Text>
        </View>
        
        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity
            onPress={handleRefresh}
            disabled={isRefreshing}
            style={[
              styles.refreshButton,
              { backgroundColor: colors.highlight },
            ]}
            accessibilityLabel="Get a new insight"
            accessibilityRole="button"
            accessibilityHint="Double tap to load a different insight"
            accessibilityState={{ busy: isRefreshing }}
            activeOpacity={0.7}
          >
            <Animated.View style={animatedIconStyle}>
              <MaterialIcons
                name="refresh"
                size={20}
                color={colors.primary}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Insight Text */}
      <Animated.View
        key={key}
        entering={FadeIn.duration(400).delay(100)}
        exiting={FadeOut.duration(200)}
      >
        <Text style={[styles.insightText, { color: colors.text }]}>
          {insight.text}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 12,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightText: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});