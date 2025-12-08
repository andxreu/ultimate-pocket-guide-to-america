// styles/commonStyles.ts
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

// Light & Dark theme colors (fully synced with your elite color system)
export const lightColors = {
  background: "#FFFFFF",
  surface: "#F8F9FA",
  text: "#11181C",
  textSecondary: "#687076",
  textMuted: "#9CA3AF",
  primary: Colors.GOLD,
  primaryLight: Colors.GOLD_LIGHT,
  accent: Colors.ERROR,
  card: "#FFFFFF",
  highlight: "#FEFCE8",
  border: "#E5E7EB",
};

export const darkColors = {
  background: "#0F0F0F",
  surface: "#1A1A1A",
  text: "#F5F5F5",
  textSecondary: "#D1D5DB",
  textMuted: "#9CA3AF",
  primary: Colors.GOLD,
  primaryLight: "#E8D9A6",
  accent: "#F87171",
  card: "#2C2C2C",
  highlight: "#374151",
  border: "#374151",
};

// Shared styles — automatically adapt to current theme
export const commonStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 900,
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 28,
  },
  text: {
    fontSize: 16.5,
    fontWeight: "500",
    lineHeight: 26,
    textAlign: "center",
    opacity: 0.9,
  },
  section: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 24,
    padding: 24,
    marginVertical: 12,
    width: "100%",
    borderWidth: 2,
    borderColor: Colors.GOLD + "30",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 16,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 12,
  },
  icon: {
    width: 64,
    height: 64,
  },
});

// Button styles — fully dynamic based on current theme
export const buttonStyles = (colors: typeof lightColors) =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: 18,
      paddingHorizontal: 32,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 56,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 20,
    },
    secondary: {
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.primary + "40",
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 56,
    },
    textButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 16,
    },
  });