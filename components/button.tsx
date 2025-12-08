// components/Button.tsx
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import * as Haptics from "expo-haptics";

type ButtonVariant = "filled" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const { colors, isDark } = useTheme();

  const sizeStyles = {
    sm: { height: 40, fontSize: 15, padding: 14, borderRadius: 12 },
    md: { height: 50, fontSize: 17, padding: 20, borderRadius: 16 },
    lg: { height: 60, fontSize: 19, padding: 24, borderRadius: 20 },
  }[size];

  const variantStyles = {
    filled: {
      backgroundColor: colors.primary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    gold: {
      backgroundColor: "#D4AF37",
      borderWidth: 2,
      borderColor: "#B8972A",
    },
  }[variant];

  const textColors = {
    filled: "#FFFFFF",
    outline: colors.primary,
    ghost: colors.primary,
    gold: "#1a1a1a",
  }[variant];

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        sizeStyles,
        variantStyles,
        {
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          shadowOpacity: pressed ? 0.3 : 0.4,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || (typeof children === "string" ? children : undefined)}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={textColors} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            { fontSize: sizeStyles.fontSize, color: textColors },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  text: {
    fontWeight: "800",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});

export default Button;