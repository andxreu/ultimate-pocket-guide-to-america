// components/AppFooter.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";
import * as Haptics from "expo-haptics";

export function AppFooter() {
  const { colors } = useTheme();

  const handleLinkPress = async () => {
    Haptics.selectionAsync();
    try {
      await Linking.openURL("https://thehumanconservative.com");
    } catch (error) {
      if (__DEV__) console.log("Failed to open URL:", error);
    }
  };

  return (
    <View style={[styles.footer, { borderTopColor: colors.textSecondary + "30" }]}>
      <Text style={[styles.copyright, { color: colors.textSecondary }]}>
        © 2025 AmateurHuman
      </Text>

      <Text style={[styles.appName, { color: colors.textSecondary }]}>
        Ultimate Pocket Guide to America • v1.0.0
      </Text>

      <TouchableOpacity
        onPress={handleLinkPress}
        activeOpacity={0.7}
        style={styles.linkContainer}
        accessibilityRole="link"
        accessibilityLabel="Visit The Human Conservative website"
        accessibilityHint="Opens thehumanconservative.com in your browser"
      >
        <IconSymbol
          ios_icon_name="safari"
          android_material_icon_name="public"
          size={14}
          color={colors.primary}
        />
        <Text style={[styles.link, { color: colors.primary }]}>
          thehumanconservative.com
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 48,
    paddingTop: 28,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    alignItems: "center",
    gap: 8,
  },
  copyright: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.8,
    letterSpacing: 0.5,
  },
  appName: {
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.9,
    letterSpacing: 0.3,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  link: {
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    letterSpacing: 0.5,
  },
});