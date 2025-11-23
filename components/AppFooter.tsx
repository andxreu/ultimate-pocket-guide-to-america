
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export function AppFooter() {
  const { colors } = useTheme();

  const handleLinkPress = () => {
    Linking.openURL("https://thehumanconservative.com");
  };

  return (
    <View style={[styles.footer, { borderTopColor: colors.textSecondary + "20" }]}>
      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        © 2025 The Human Conservative
      </Text>
      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        Ultimate Pocket Guide to America • v1.0.0
      </Text>
      <TouchableOpacity
        onPress={handleLinkPress}
        activeOpacity={0.7}
        accessibilityLabel="Visit The Human Conservative website"
        accessibilityRole="link"
      >
        <Text style={[styles.footerLink, { color: colors.primary }]}>
          thehumanconservative.com
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.85,
    lineHeight: 17.4,
  },
  footerLink: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    textDecorationLine: "underline",
    fontWeight: "600",
    lineHeight: 17.4,
  },
});
