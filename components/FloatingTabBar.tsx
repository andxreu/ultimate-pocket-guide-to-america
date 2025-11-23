
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export interface TabBarItem {
  name: string;
  route: Href;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth,
  borderRadius = 35,
  bottomMargin
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark } = useTheme();
  const animatedValue = useSharedValue(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Calculate dynamic width based on number of tabs
  const calculatedWidth = containerWidth || (tabs.length > 4 ? screenWidth - 40 : screenWidth / 2.5);
  const needsScroll = tabs.length > 4;
  const tabWidth = needsScroll ? 80 : (calculatedWidth - 8) / tabs.length;

  // Improved active tab detection with better path matching
  const activeTabIndex = React.useMemo(() => {
    // Find the best matching tab based on the current pathname
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;

      // Exact route match gets highest score
      if (pathname === tab.route) {
        score = 100;
      }
      // Check if pathname starts with tab route (for nested routes)
      else if (pathname.startsWith(tab.route as string)) {
        score = 80;
      }
      // Check if pathname contains the tab name
      else if (pathname.includes(tab.name)) {
        score = 60;
      }
      // Check for partial matches in the route
      else if (tab.route.includes('/(tabs)/') && pathname.includes(tab.route.split('/(tabs)/')[1])) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    // Default to first tab if no match found
    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  React.useEffect(() => {
    if (activeTabIndex >= 0) {
      animatedValue.value = withSpring(activeTabIndex, {
        damping: 20,
        stiffness: 120,
        mass: 1,
      });

      // Scroll to active tab if needed
      if (needsScroll && scrollViewRef.current) {
        const scrollX = activeTabIndex * tabWidth - (calculatedWidth / 2) + (tabWidth / 2);
        scrollViewRef.current.scrollTo({ x: Math.max(0, scrollX), animated: true });
      }
    }
  }, [activeTabIndex, animatedValue, needsScroll, tabWidth, calculatedWidth]);

  const handleTabPress = (route: Href) => {
    router.push(route);
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedValue.value,
            [0, tabs.length - 1],
            [0, tabWidth * (tabs.length - 1)]
          ),
        },
      ],
    };
  });

  // Dynamic styles based on theme
  const dynamicStyles = {
    blurContainer: {
      ...styles.blurContainer,
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.3)',
      ...Platform.select({
        ios: {
          backgroundColor: isDark
            ? 'rgba(28, 28, 30, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
        },
        android: {
          backgroundColor: isDark
            ? 'rgba(28, 28, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        },
        web: {
          backgroundColor: isDark
            ? 'rgba(28, 28, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      }),
    },
    background: {
      ...styles.background,
    },
    indicator: {
      ...styles.indicator,
      backgroundColor: isDark
        ? 'rgba(212, 175, 55, 0.15)'
        : 'rgba(212, 175, 55, 0.12)',
      width: tabWidth - 4,
    },
  };

  const TabContent = () => (
    <>
      <View style={dynamicStyles.background} />
      <Animated.View style={[dynamicStyles.indicator, indicatorStyle]} />
      <View style={[styles.tabsContainer, needsScroll && styles.scrollableContainer]}>
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[styles.tab, { width: tabWidth }]}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
                accessibilityLabel={`Navigate to ${tab.label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <View style={styles.tabContent}>
                  <IconSymbol
                    android_material_icon_name={tab.icon}
                    ios_icon_name={tab.icon}
                    size={28}
                    color={isActive ? colors.primary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: colors.textSecondary },
                      isActive && { color: colors.primary, fontWeight: '700' },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[
        styles.container,
        {
          width: calculatedWidth,
          marginBottom: bottomMargin ?? 20
        }
      ]}>
        <BlurView
          intensity={80}
          style={[dynamicStyles.blurContainer, { borderRadius }]}
        >
          {needsScroll ? (
            <>
              <View style={dynamicStyles.background} />
              <Animated.View style={[dynamicStyles.indicator, indicatorStyle]} />
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
              >
                {tabs.map((tab, index) => {
                  const isActive = activeTabIndex === index;

                  return (
                    <React.Fragment key={index}>
                      <TouchableOpacity
                        style={[styles.tab, { width: tabWidth }]}
                        onPress={() => handleTabPress(tab.route)}
                        activeOpacity={0.7}
                        accessibilityLabel={`Navigate to ${tab.label}`}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isActive }}
                      >
                        <View style={styles.tabContent}>
                          <IconSymbol
                            android_material_icon_name={tab.icon}
                            ios_icon_name={tab.icon}
                            size={28}
                            color={isActive ? colors.primary : colors.textSecondary}
                          />
                          <Text
                            style={[
                              styles.tabLabel,
                              { color: colors.textSecondary },
                              isActive && { color: colors.primary, fontWeight: '700' },
                            ]}
                          >
                            {tab.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </React.Fragment>
                  );
                })}
              </ScrollView>
            </>
          ) : (
            <TabContent />
          )}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  blurContainer: {
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    left: 2,
    bottom: 4,
    borderRadius: 27,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 68,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  scrollableContainer: {
    paddingHorizontal: 0,
  },
  scrollView: {
    height: 68,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 44,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 15.95,
  },
});
