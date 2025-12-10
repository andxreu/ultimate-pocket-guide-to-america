
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTextSize } from "@/contexts/TextSizeContext";
import { historyData } from "@/data/historyData";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function HistoryScreen() {
  const { colors, shadows } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const router = useRouter();
  const textMultiplier = getTextSizeMultiplier();

  // ✅ FIX: Navigate to subsection IDs directly
  const handleSubsectionPress = (subsectionId: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    router.push(`/detail/${subsectionId}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={styles.header}
          entering={FadeInDown.delay(100).springify()}
        >
          <LinearGradient
            colors={[colors.primary + '20', colors.primary + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.headerCard, { ...shadows.medium }]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.highlight },
              ]}
            >
              <IconSymbol
                ios_icon_name="clock.fill"
                android_material_icon_name="history"
                size={32}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: colors.text, fontSize: 28 * textMultiplier }]}>
              {historyData.title}
            </Text>
            <Text
              style={[styles.headerDescription, { color: colors.textSecondary, fontSize: 15 * textMultiplier }]}
            >
              {historyData.description}
            </Text>
          </LinearGradient>
        </Animated.View>

        <View style={styles.sectionsContainer}>
          {historyData.sections.map((section, sectionIndex) => (
            <View key={section.id} style={styles.sectionGroup}>
              <Animated.View
                entering={FadeInDown.delay(200 + sectionIndex * 50).springify()}
              >
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.text, fontSize: 19 * textMultiplier }]}>
                    {section.title}
                  </Text>
                  {section.description && (
                    <Text
                      style={[
                        styles.sectionDescription,
                        { color: colors.textSecondary, fontSize: 13 * textMultiplier },
                      ]}
                    >
                      {section.description}
                    </Text>
                  )}
                </View>
              </Animated.View>

              <View style={styles.subsectionsContainer}>
                {section.subsections.map((subsection, subsectionIndex) => (
                  <Animated.View
                    key={subsection.id}
                    entering={FadeInDown.delay(250 + sectionIndex * 50 + subsectionIndex * 30).springify()}
                  >
                    <TouchableOpacity
                      style={[
                        styles.subsectionCard,
                        {
                          backgroundColor: colors.card,
                          borderColor: colors.primary + "20",
                          ...shadows.small,
                        },
                      ]}
                      onPress={() => handleSubsectionPress(subsection.id)}
                      activeOpacity={0.85}
                      accessibilityLabel={`View ${subsection.title}`}
                      accessibilityRole="button"
                    >
                      <View style={styles.subsectionContent}>
                        <Text style={[styles.subsectionTitle, { color: colors.text, fontSize: 16 * textMultiplier }]}>
                          {subsection.title}
                        </Text>
                      </View>
                      <IconSymbol
                        ios_icon_name="chevron.right"
                        android_material_icon_name="chevron_right"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? 48 : 16,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  headerCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 40.6,
  },
  headerDescription: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 21.75,
  },
  sectionsContainer: {
    gap: 28,
  },
  sectionGroup: {
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 6,
    lineHeight: 27.55,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18.85,
  },
  subsectionsContainer: {
    gap: 12,
  },
  subsectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    minHeight: 44,
  },
  subsectionContent: {
    flex: 1,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 23.2,
  },
});
