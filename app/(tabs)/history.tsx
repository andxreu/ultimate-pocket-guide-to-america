import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { getSectionById } from "@/data/contentData";
import { SectionList } from "@/components/SectionList";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";
import Animated, { FadeIn } from "react-native-reanimated";

/**
 * History Screen Component
 * Displays key periods and events in American history
 */
export default function HistoryScreen() {
  const { colors } = useTheme();
  const section = getSectionById("history");

  /**
   * Render error state if section not found
   */
  if (!section) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Animated.View 
          style={styles.errorContent}
          entering={FadeIn.duration(400)}
        >
          <IconSymbol
            ios_icon_name="exclamationmark.triangle.fill"
            android_material_icon_name="error"
            size={64}
            color={colors.textSecondary}
          />
          <Text style={[styles.errorTitle, { color: colors.text }]}>
            Content Not Found
          </Text>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>
            The history section could not be loaded. Please try restarting the app.
          </Text>
        </Animated.View>
      </View>
    );
  }

  return <SectionList mainSection={section} showCustomHeader={false} />;
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? 24 : 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.9,
  },
});