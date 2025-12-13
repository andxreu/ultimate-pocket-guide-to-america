
import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/contexts/ThemeContext";
import * as Haptics from "expo-haptics";

interface HeaderButtonProps {
  /**
   * Material icon name to display
   */
  icon?: keyof typeof MaterialIcons.glyphMap;
  /**
   * Custom onPress handler
   */
  onPress?: () => void;
  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number;
}

/**
 * Generic Header Button Component
 * Reusable button for header with haptic feedback and proper touch handling
 * 
 * @example
 * ```tsx
 * <HeaderButton 
 *   icon="add" 
 *   onPress={handleAdd}
 *   accessibilityLabel="Add new item"
 * />
 * ```
 */
export function HeaderButton({ 
  icon = "more-vert", 
  onPress, 
  accessibilityLabel,
  size = 24 
}: HeaderButtonProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    if (onPress) {
      onPress();
    } else {
      Alert.alert(
        "Not Implemented",
        "This feature is not implemented yet"
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.headerButtonContainer}
      accessibilityLabel={accessibilityLabel || `${icon} button`}
      accessibilityRole="button"
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <MaterialIcons
        name={icon}
        color={colors.primary}
        size={size}
      />
    </TouchableOpacity>
  );
}

/**
 * Header Right Button Component
 * Displays an add button in the header (right side)
 * 
 * @example
 * ```tsx
 * <Stack.Screen
 *   options={{
 *     headerRight: () => <HeaderRightButton onPress={handleAdd} />
 *   }}
 * />
 * ```
 */
export function HeaderRightButton({ onPress }: { onPress?: () => void }) {
  return (
    <HeaderButton 
      icon="add" 
      onPress={onPress}
      accessibilityLabel="Add item"
    />
  );
}

/**
 * Header Left Button Component
 * Displays a settings button in the header (left side)
 * 
 * @example
 * ```tsx
 * <Stack.Screen
 *   options={{
 *     headerLeft: () => <HeaderLeftButton onPress={handleSettings} />
 *   }}
 * />
 * ```
 */
export function HeaderLeftButton({ onPress }: { onPress?: () => void }) {
  return (
    <HeaderButton 
      icon="settings" 
      onPress={onPress}
      accessibilityLabel="Open settings"
    />
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
});
