import React from "react";
import { View, ViewStyle, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface IconCircleProps {
  /**
   * Emoji character to display
   */
  emoji: string;
  /**
   * Background color (overrides theme)
   */
  backgroundColor?: string;
  /**
   * Size of the circle in pixels
   * @default 48
   */
  size?: number;
  /**
   * Custom style overrides
   */
  style?: ViewStyle;
  /**
   * Use theme colors for background
   * @default true
   */
  useTheme?: boolean;
}

/**
 * IconCircle Component
 * 
 * Displays an emoji in a rounded square container with theme-aware styling.
 * 
 * Features:
 * - Automatic emoji scaling based on container size
 * - Theme-aware background colors
 * - Customizable size and colors
 * - Proper emoji centering
 * 
 * @example
 * ```tsx
 * <IconCircle emoji="🏛️" />
 * 
 * <IconCircle 
 *   emoji="📜" 
 *   size={64}
 *   backgroundColor="#FFD700"
 * />
 * 
 * <IconCircle 
 *   emoji="⚖️" 
 *   useTheme={false}
 *   backgroundColor="lightblue"
 * />
 * ```
 */
export function IconCircle({
  emoji,
  backgroundColor,
  size = 48,
  style,
  useTheme = true,
}: IconCircleProps) {
  const { colors } = useTheme();

  // Calculate emoji size based on container size (approximately 45% of container)
  const emojiSize = Math.round(size * 0.45);

  // Determine background color
  const bgColor = backgroundColor || (useTheme ? colors.highlight : 'lightblue');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          width: size,
          height: size,
          borderRadius: size * 0.25, // 25% of size for rounded corners
        },
        style,
      ]}
    >
      <Text style={[styles.emoji, { fontSize: emojiSize }]}>
        {emoji}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    textAlign: 'center',
    // Ensure emoji is properly centered
    includeFontPadding: false,
  },
});