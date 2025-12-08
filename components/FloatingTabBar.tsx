// components/FloatingTabBar.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { BlurView } from "expo-blur";
import { useTheme } from "@/contexts/ThemeContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface TabBarItem {
  name: string;
  route: string;
  iosIcon: string;
  androidIcon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark } = useTheme();

  const animatedValue = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);

  const needsScroll = tabs.length > 5;
  const containerWidth = needsScroll ? SCREEN_WIDTH - 40 : Math.min(SCREEN_WIDTH - 40, tabs.length * 90);
  const tabWidth = needsScroll ? 85 : containerWidth / tabs.length;

  const activeIndex = React.useMemo(() => {
    let best = 0;
    let score = 0;
    tabs.forEach((tab, i) => {
      if (pathname === tab.route || pathname.startsWith(tab.route)) {
        if (score < 100) {
          score = 100;
          best = i;
        }
      }
    });
    return best;
  }, [pathname, tabs]);

  useEffect(() => {
    animatedValue.value = withSpring(activeIndex, {
      damping: 20,
      stiffness: 150,
      mass: 1,
    });

    if (needsScroll && scrollRef.current) {
      const targetX = activeIndex * tabWidth - containerWidth / 2 + tabWidth / 2;
      scrollRef.current.scrollTo({ x: Math.max(0, targetX), animated: true });
    }
  }, [activeIndex, animatedValue, needsScroll, tabWidth, containerWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          animatedValue.value,
          [0, tabs.length - 1],
          [tabWidth / 2, (tabs.length - 1) * tabWidth + tabWidth / 2]
        ),
      },
    ],
  }));

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <View style={[styles.container, { width: containerWidth, marginBottom }]}>
        <BlurView
          intensity={isDark ? 100 : 110}
          tint={isDark ? "dark" : "light"}
          style={styles.blur}
        >
          {/* Background glow */}
          <View style={[styles.glow, { backgroundColor: colors.primary + "18" }]} />

          {/* Active indicator */}
          <Animated.View style={[styles.indicator, indicatorStyle]} />

          {needsScroll ? (
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {tabs.map((tab, i) => (
                <TabItem
                  key={i}
                  tab={tab}
                  isActive={activeIndex === i}
                  colors={colors}
                  onPress={() => handlePress(tab.route)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.tabsRow}>
              {tabs.map((tab, i) => (
                <TabItem
                  key={i}
                  tab={tab}
                  isActive={activeIndex === i}
                  colors={colors}
                  onPress={() => handlePress(tab.route)}
                />
              ))}
            </View>
          )}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

function TabItem({
  tab,
  isActive,
  colors,
  onPress,
}: {
  tab: TabBarItem;
  isActive: boolean;
  colors: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.tab, { width: 85 }]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={tab.label}
    >
      <View style={styles.tabInner}>
        <IconSymbol
          ios_icon_name={tab.iosIcon}
          android_material_icon_name={tab.androidIcon}
          size={28}
          color={isActive ? colors.primary : colors.textSecondary}
        />
        <Text
          style={[
            styles.label,
            {
              color: isActive ? colors.primary : colors.textSecondary,
              fontWeight: isActive ? "800" : "600",
            },
          ]}
        >
          {tab.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: "center",
  },
  container: {
    alignSelf: "center",
  },
  blur: {
    borderRadius: 38,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#D4AF3730",
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 38,
  },
  indicator: {
    position: "absolute",
    top: 6,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#D4AF3720",
    borderWidth: 3,
    borderColor: "#D4AF37",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  tabsRow: {
    flexDirection: "row",
    height: 76,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    height: 76,
    justifyContent: "center",
    alignItems: "center",
  },
  tabInner: {
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 11.5,
    letterSpacing: 0.5,
  },
});