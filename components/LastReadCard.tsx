import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useReadingHistory } from '@/contexts/ReadingHistoryContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getItemRoute } from '@/utils/findItemById';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

/**
 * Last Read Card Component
 * 
 * Displays the last item the user was reading with a "Continue" action.
 * 
 * Features:
 * - Shows last read item from reading history
 * - One-tap navigation to continue reading
 * - Animated press feedback
 * - Haptic feedback
 * - Gradient accents
 * - Theme-aware styling
 * 
 * @example
 * ```tsx
 * <LastReadCard />
 * ```
 * 
 * Note: Returns null if no reading history exists
 */
export default function LastReadCard() {
  const { colors, shadows } = useTheme();
  const { lastReadItem } = useReadingHistory();
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /**
   * Handle press-in with scale animation
   */
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, { damping: 12, stiffness: 200 });
  }, [scale]);

  /**
   * Handle press-out with scale return
   */
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  }, [scale]);

  /**
   * Handle press with haptic feedback and navigation
   */
  const handlePress = useCallback(() => {
    if (!lastReadItem) return;

    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      const route = getItemRoute(lastReadItem.id);
      router.push(route as any);
    } catch (error) {
      if (__DEV__) {
        console.log('Error navigating to last read item:', error);
      }
    }
  }, [lastReadItem, router]);

  // Early return after all hooks are called
  if (!lastReadItem) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityLabel={`Continue reading ${lastReadItem.title}`}
      accessibilityRole="button"
      accessibilityHint="Double tap to continue where you left off"
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            ...shadows.medium,
          },
          animatedStyle,
        ]}
      >
        {/* Top gradient accent */}
        <LinearGradient
          colors={[
            colors.primary + '40',
            colors.goldGradientEnd + '30',
            colors.primary + '00',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topGradient}
        />

        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[
              colors.primary + '25',
              colors.highlight,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <MaterialIcons
              name="menu-book"
              size={20}
              color={colors.primary}
            />
          </LinearGradient>
          <Text style={[styles.headerText, { color: colors.textSecondary }]}>
            CONTINUE WHERE YOU LEFT OFF
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text 
            style={[styles.title, { color: colors.text }]} 
            numberOfLines={2}
          >
            {lastReadItem.title}
          </Text>
          <Text 
            style={[styles.section, { color: colors.textSecondary }]} 
            numberOfLines={1}
          >
            {lastReadItem.section}
          </Text>
        </View>

        {/* Footer with arrow */}
        <View style={styles.footer}>
          <View style={styles.continueButton}>
            <Text style={[styles.continueText, { color: colors.primary }]}>
              Continue Reading
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={18}
              color={colors.primary}
            />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
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
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  content: {
    marginBottom: 12,
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  section: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'flex-end',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});