// components/IconCircle.tsx
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface IconCircleProps {
  emoji: string;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function IconCircle({
  emoji,
  backgroundColor,
  size = 56,
  style,
  accessibilityLabel,
}: IconCircleProps) {
  const { colors, isDark } = useTheme();

  const bgColor = backgroundColor || (isDark ? colors.primary + "22" : colors.primary + "18");

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: bgColor,
          borderColor: colors.primary + "40",
        },
        style,
      ]}
      accessibilityLabel={accessibilityLabel || emoji}
      accessibilityRole="image"
    >
      <Text style={[styles.emoji, { fontSize: size * 0.58 }]} allowFontScaling={false}>
        {emoji}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    overflow: "hidden",
  },
  emoji: {
    fontWeight: "600",
    textAlign: "center",
    includeFontPadding: false,
  },
});