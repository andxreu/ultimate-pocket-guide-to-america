
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface QuickButton {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

/**
 * Quick Access Grid Component
 * Displays a grid of quick action buttons with beautiful animations
 */
export default function QuickAccessGrid() {
  const { colors, shadows } = useTheme();
  const router = useRouter();

  const buttons: QuickButton[] = [
    { 
      id: "map", 
      label: "Map", 
      icon: "map", 
      route: "/(tabs)/map"
    },
    { 
      id: "quiz", 
      label: "Quiz", 
      icon: "quiz", 
      route: "/(tabs)/quiz"
    },
    { 
      id: "search", 
      label: "Search", 
      icon: "search", 
      route: "/(tabs)/search"
    },
    { 
      id: "glossary", 
      label: "Glossary", 
      icon: "menu-book", 
      route: "/(tabs)/glossary"
    },
    { 
      id: "favorites", 
      label: "Favorites", 
      icon: "star", 
      route: "/(tabs)/favorites"
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: "settings", 
      route: "/(tabs)/settings"
    },
  ];

  const handlePress = (button: QuickButton) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      console.log('Quick Access navigating to:', button.route);
      router.push(button.route as any);
    } catch (error) {
      console.error(`Navigation error for ${button.label}:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {buttons.map((button, index) => (
          <QuickButtonItem
            key={`quick-${button.id}-${index}`}
            button={button}
            index={index}
            colors={colors}
            shadows={shadows}
            onPress={() => handlePress(button)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * Individual Quick Button Component with micro-interactions
 */
function QuickButtonItem({
  button,
  index,
  colors,
  shadows,
  onPress,
}: {
  button: QuickButton;
  index: number;
  colors: any;
  shadows: any;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleIn = () => {
    scale.value = withSpring(0.92, { damping: 12, stiffness: 300 });
  };
  
  const handleOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
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
      accessibilityHint={`Navigate to ${button.label}`}
    >
      <Animated.View 
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            ...shadows.medium,
          },
          animatedStyle
        ]}
      >
        {/* Top gradient accent */}
        <LinearGradient
          colors={[
            colors.primary + '30',
            colors.primary + '10',
            colors.primary + '00',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientAccent}
        />

        {/* Icon container with gradient background */}
        <View style={styles.iconWrapper}>
          <LinearGradient
            colors={[
              colors.primary + '20',
              colors.highlight,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconBackground}
          >
            <MaterialIcons
              name={button.icon}
              size={32}
              color={colors.primary}
            />
          </LinearGradient>
        </View>

        <Text 
          style={[styles.label, { color: colors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {button.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    columnGap: 12,
  },
  touchable: {
    width: "30%", // 3 columns: (100% - 2 gaps) / 3
  },
  button: {
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  iconWrapper: {
    marginBottom: 8,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
    lineHeight: 16,
  },
});
