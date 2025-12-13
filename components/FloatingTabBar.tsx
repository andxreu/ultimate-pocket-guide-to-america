import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

export interface TabBarItem {
  name: string;
  route: Href;
  icon: keyof typeof MaterialIcons.glyphMap;
  iosIcon?: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
}

/**
 * Premium Floating Tab Bar Component
 * 
 * A beautiful glassmorphic tab bar with:
 * - Smooth animated indicator that follows active tab
 * - Haptic feedback on tab press
 * - Theme-aware glassmorphism effect
 * - Gradient accents and polish
 * - Smart tab matching algorithm
 * - Micro-interactions on press
 * - Accessibility support
 * - **FIXED: Home button always works, even from nested screens**
 * 
 * @example
 * ```tsx
 * <FloatingTabBar
 *   tabs={[
 *     { name: 'home', route: '/', icon: 'home', label: 'Home' },
 *     { name: 'search', route: '/search', icon: 'search', label: 'Search' },
 *   ]}
 * />
 * ```
 */
export default function FloatingTabBar({ tabs }: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark, shadows } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const animatedIndex = useSharedValue(0);

  /**
   * Determine active tab index with smart matching
   * Uses scoring system to find best matching tab for current route
   */
  const activeTabIndex = useMemo(() => {
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;

      // Exact match (highest priority)
      if (pathname === tab.route) {
        score = 100;
      } 
      // Route starts with tab route
      else if (pathname.startsWith(tab.route as string)) {
        score = 80;
      } 
      // Pathname includes tab name
      else if (pathname.includes(tab.name)) {
        score = 60;
      } 
      // Nested tab route match
      else if (tab.route.includes('/(tabs)/') && pathname.includes(tab.route.split('/(tabs)/')[1])) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  /**
   * Animate indicator on tab change
   */
  React.useEffect(() => {
    animatedIndex.value = withSpring(activeTabIndex, {
      damping: 20,
      stiffness: 120,
      mass: 0.5,
    });
  }, [activeTabIndex, animatedIndex]);

  /**
   * Handle tab press with haptic feedback
   * 
   * FIXED: Home button now always navigates home, even if already on home section.
   * This ensures users can return to home from any nested screen (like detail pages).
   * 
   * Other tabs skip navigation if already active to prevent unnecessary re-renders.
   */
  const handleTabPress = useCallback((route: Href, index: number, tabName: string) => {
    // Special handling for home button - ALWAYS navigate home
    // This allows users to return to home from nested screens
    const isHomeTab = tabName === 'home';
    
    // For non-home tabs, skip if already on this tab
    if (!isHomeTab && index === activeTabIndex) {
      return;
    }

    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    // Use replace for home to clear navigation stack
    // Use push for other tabs to maintain history
    if (isHomeTab) {
      router.replace(route);
    } else {
      router.push(route);
    }
  }, [router, activeTabIndex]);

  // Calculate tab dimensions
  const tabCount = tabs.length;
  const tabWidth = screenWidth / tabCount;
  const indicatorWidth = tabWidth * 0.9; // 90% of tab width
  const indicatorOffset = (tabWidth - indicatorWidth) / 2;

  /**
   * Animated indicator style with pixel-based positioning
   */
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animatedIndex.value * tabWidth + indicatorOffset,
        },
      ],
    };
  });

  /**
   * Get icon color based on active state
   */
  const getIconColor = useCallback((isActive: boolean) => {
    return isActive ? colors.primary : colors.textSecondary;
  }, [colors.primary, colors.textSecondary]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {/* Glassmorphism container */}
      <BlurView
        intensity={isDark ? 80 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={styles.blurContainer}
      >
        <LinearGradient
          colors={
            isDark
              ? ['rgba(26, 26, 26, 0.95)', 'rgba(10, 10, 10, 0.98)']
              : ['rgba(250, 250, 250, 0.95)', 'rgba(255, 255, 255, 0.98)']
          }
          style={styles.gradientContainer}
        >
          {/* Top border with gradient */}
          <LinearGradient
            colors={[
              colors.primary + '00',
              colors.primary + '40',
              colors.primary + '00',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topBorder}
          />

          {/* Animated indicator - pill shape */}
          <Animated.View
            style={[
              styles.indicatorPill,
              indicatorStyle,
              { 
                width: indicatorWidth,
              },
            ]}
          >
            <LinearGradient
              colors={[
                colors.primary + 'E6',
                colors.primary,
                colors.goldGradientEnd,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pillGradient}
            />
          </Animated.View>

          {/* Tabs container */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <TabButton
                  key={`tab-${tab.name}-${index}`}
                  tab={tab}
                  isActive={isActive}
                  width={tabWidth}
                  iconColor={getIconColor(isActive)}
                  onPress={() => handleTabPress(tab.route, index, tab.name)}
                />
              );
            })}
          </View>
        </LinearGradient>
      </BlurView>
    </SafeAreaView>
  );
}

/**
 * Individual tab button component with micro-interactions
 * Memoized for performance - only re-renders when props change
 */
interface TabButtonProps {
  tab: TabBarItem;
  isActive: boolean;
  width: number;
  iconColor: string;
  onPress: () => void;
}

const TabButton = React.memo(({ tab, isActive, width, iconColor, onPress }: TabButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.85, { duration: 100 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 200,
    });
  }, [scale]);

  return (
    <TouchableOpacity
      style={[styles.tab, { width }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityLabel={`Navigate to ${tab.label}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityHint={isActive ? 'Currently selected' : 'Double tap to navigate'}
    >
      <Animated.View style={[styles.tabContent, animatedStyle]}>
        <MaterialIcons
          name={tab.icon}
          size={24}
          color={iconColor}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: iconColor,
              fontWeight: isActive ? '700' : '500',
            },
          ]}
          numberOfLines={1}
        >
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
});

TabButton.displayName = 'TabButton';

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  blurContainer: {
    overflow: 'hidden',
  },
  gradientContainer: {
    width: '100%',
    position: 'relative',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    zIndex: 2,
  },
  indicatorPill: {
    position: 'absolute',
    top: 8,
    left: 0,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
    overflow: 'hidden',
  },
  pillGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    paddingTop: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 64,
    zIndex: 2,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
});