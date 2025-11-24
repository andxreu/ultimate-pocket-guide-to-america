import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter, usePathname, Href } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width: screenWidth } = Dimensions.get("window");

export interface TabBarItem {
  name: string;
  route: Href;
  icon: keyof typeof MaterialIcons.glyphMap;
  iosIcon?: string;
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
  bottomMargin,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark } = useTheme();

  const calculatedWidth =
    containerWidth || (tabs.length > 4 ? screenWidth - 40 : screenWidth - 40);
  const needsScroll = tabs.length > 4;
  const tabWidth = needsScroll ? 85 : (calculatedWidth - 8) / tabs.length;

  const activeTabName = React.useMemo(() => {
    let bestMatch: string | null = null;
    let bestScore = 0;

    tabs.forEach((tab) => {
      let score = 0;

      if (pathname === tab.route) {
        score = 100;
      } else if (pathname.startsWith(tab.route as string)) {
        score = 80;
      } else if (pathname.includes(tab.name)) {
        score = 60;
      } else if (
        (tab.route as string).includes("/(tabs)/") &&
        pathname.includes((tab.route as string).split("/(tabs)/")[1])
      ) {
        score = 40;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = tab.name;
      }
    });

    return bestMatch || tabs[0]?.name;
  }, [pathname, tabs]);

  const handleTabPress = (route: Href) => {
    router.push(route);
  };

  const renderTab = (tab: TabBarItem, index: number) => {
    const isActive = tab.name === activeTabName;

    return (
      <TouchableOpacity
        key={index}
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
            ios_icon_name={tab.iosIcon || tab.icon}
            size={26}
            color={isActive ? colors.primary : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: colors.textSecondary },
              isActive && { color: colors.primary, fontWeight: "700" },
            ]}
          >
            {tab.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const backgroundColor = isDark
    ? "rgba(28, 28, 30, 0.95)"
    : "rgba(255, 255, 255, 0.95)";

  const borderColor = isDark
    ? "rgba(212, 175, 55, 0.2)"
    : "rgba(212, 175, 55, 0.3)";

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View
        style={[
          styles.container,
          {
            width: calculatedWidth,
            marginBottom: bottomMargin ?? 20,
            borderRadius,
            backgroundColor,
            borderColor,
          },
        ]}
      >
        {needsScroll ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
          >
            {tabs.map(renderTab)}
          </ScrollView>
        ) : (
          <View style={styles.tabsContainer}>{tabs.map(renderTab)}</View>
        )}
      </View>
    </SafeAreaView>
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
    overflow: "hidden",
    borderWidth: 1.2,
  },
  tabsContainer: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    minHeight: 64,
  },
  tab: {
    paddingVertical: Platform.OS === "ios" ? 8 : 6,
    minHeight: 44,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
});
