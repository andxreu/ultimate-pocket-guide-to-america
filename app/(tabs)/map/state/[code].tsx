
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { mapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";

export default function StateDetailScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { code } = useLocalSearchParams();

  let state = null;
  let region = null;

  for (const r of mapData) {
    const foundState = r.states.find(
      (s) => s.code.toLowerCase() === (code as string).toLowerCase()
    );
    if (foundState) {
      state = foundState;
      region = r;
      break;
    }
  }

  if (!state || !region) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            State not found
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButtonTop}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.backButtonTopText, { color: colors.primary }]}>
            Back to {region.name}
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View
            style={[
              styles.stateCodeBadge,
              { backgroundColor: colors.highlight },
            ]}
          >
            <Text style={[styles.stateCode, { color: colors.primary }]}>
              {state.code}
            </Text>
          </View>
          <Text
            style={[styles.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            {state.name}
          </Text>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderColor: "rgba(255, 255, 255, 0.06)",
            },
          ]}
        >
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            About {state.name}
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {state.blurb}
          </Text>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderColor: "rgba(255, 255, 255, 0.06)",
            },
          ]}
        >
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Region
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {region.name}
          </Text>
        </View>

        <AppFooter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  backButtonTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 4,
  },
  backButtonTopText: {
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  stateCodeBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  stateCode: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 40.6,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 43.5,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 21.75,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
