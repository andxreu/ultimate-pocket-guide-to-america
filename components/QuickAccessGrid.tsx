// components/QuickAccessGrid.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface QuickButton {
  id: string;
  label: string;
  iosIcon: string;
  androidIcon: string;
  route?: string;
  action?: () => void;
}

export default function QuickAccessGrid() {
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const buttons: QuickButton[] = [
    { id: "map", label: "Map", iosIcon: "map.fill", androidIcon: "map", route: "/(tabs)/map" },
    { id: "quiz", label: "Quiz", iosIcon: "brain", androidIcon: "quiz", route: "/(tabs)/quiz" },
    { id: "search", label: "Search", iosIcon: "magnifyingglass", androidIcon: "search", route: "/(tabs)/search" },
    { id: "glossary", label: "Glossary", iosIcon: "book.fill", androidIcon: "menu_book", route: "/(tabs)/glossary" },
    { id: "favorites", label: "Favorites", iosIcon: "star.fill", androidIcon: "star", route: "/(tabs)/favorites" },
    { id: "theme", label: "Theme", iosIcon: "lightbulb.fill", androidIcon: "lightbulb", action: toggleTheme },
  ];

  const handlePress = (button: QuickButton) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (button.route) {
      router.push(button.route as any);
    } else if (button.action) {
      button.action();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {buttons.map((button) => (
          <QuickButtonItem key={button.id} button={button} colors={colors} isDark={isDark} onPress={() => handlePress(button)} />
        ))}
      </View>
    </View>
  );
}

function QuickButtonItem({
  button,
  colors,
  isDark,
  onPress,
}: {
  button: QuickButton;
  colors: any;
  isDark: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleIn = () => {
    scale.value = withSpring(0.94, { damping: 14, stiffness: 300 });
  };

  const handleOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handleIn}
      onPressOut={handleOut}
      activeOpacity={1}
      style={styles.touchable}
      accessibilityLabel={button.label}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary + "20",
            shadowColor: isDark ? "#000" : "#D4AF37",
            shadowOpacity: isDark ? 0.4 : 0.25,
          },
          animatedStyle,
        ]}
      >
        <IconSymbol
          ios_icon_name={button.iosIcon}
          android_material_icon_name={button.androidIcon}
          size={34}
          color={colors.primary}
        />
        <Text style={[styles.label, { color: colors.text }]}>{button.label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  touchable: {
    width: "30.8%",
  },
  button: {
    aspectRatio: 1,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});