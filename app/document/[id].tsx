import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { contentData } from "@/data/contentData";
import { useTheme } from "@/contexts/ThemeContext";
import { useTextSize } from "@/contexts/TextSizeContext";
import { useReadingHistory } from "@/contexts/ReadingHistoryContext";
import { IconSymbol } from "@/components/IconSymbol";
import { FavoriteToggle } from "@/components/FavoriteToggle";

const FOUNDING_DOCUMENTS = [
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
];

export default function DocumentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const { addToHistory } = useReadingHistory();
  const textMultiplier = getTextSizeMultiplier();

  let foundDocument: any = null;
  let foundSection = "";
  let foundMainSection = "";

  for (const main of contentData) {
    for (const sec of main.sections) {
      for (const sub of sec.subsections) {
        if (sub.id === id && FOUNDING_DOCUMENTS.includes(sub.id)) {
          foundDocument = sub;
          foundSection = sec.title;
          foundMainSection = main.title;
        }
      }
    }
  }

  useEffect(() => {
    if (foundDocument && foundMainSection) {
      addToHistory({
        id: foundDocument.id,
        title: foundDocument.title,
        section: foundMainSection,
      });
    }
  }, [foundDocument, foundMainSection, addToHistory]);

  if (!foundDocument) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Document",
            headerBackTitle: "Back",
            headerBackTitleVisible: true,
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.card },
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol
              android_material_icon_name="error"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.errorText, { color: colors.text }]}>
              Document not found
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.backButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  const hasFullText = foundDocument.fullText?.trim()?.length > 0;
  const hasContext = foundDocument.context?.trim()?.length > 0;
  const isConstitution = id === "constitution";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: foundDocument.title,
          headerBackTitle: "Back",
          headerBackTitleVisible: true,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
          headerRight: () => <FavoriteToggle itemId={id} />,
        }}
      />

      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.primary + "15",
                borderColor: colors.primary + "30",
              },
            ]}
          >
            <IconSymbol
              android_material_icon_name="description"
              size={12}
              color={colors.primary}
            />
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              Founding Document
            </Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            {foundDocument.title}
          </Text>

          <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>
            {foundMainSection} › {foundSection}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Overview
          </Text>
          <Text style={[styles.bodyText, { color: colors.text, fontSize: 15 * textMultiplier, lineHeight: 24 * textMultiplier }]}>
            {foundDocument.content}
          </Text>
        </View>

        {isConstitution && (
          <>
            <View style={styles.divider} />

            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                Document Structure
              </Text>

              <Text style={[styles.bodyText, { color: colors.textSecondary, fontSize: 15 * textMultiplier, lineHeight: 24 * textMultiplier }]}>
                • Article I — Legislative{"\n"}
                • Article II — Executive{"\n"}
                • Article III — Judicial{"\n"}
                • Article IV — States{"\n"}
                • Article V — Amendments{"\n"}
                • Article VI — Federal Power{"\n"}
                • Article VII — Ratification{"\n"}
                {"\n"}
                Bill of Rights (1–10){"\n"}
                Amendments 11–27
              </Text>
            </View>
          </>
        )}

        {hasFullText && (
          <>
            <View style={styles.divider} />
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                Full Text
              </Text>
              <Text style={[styles.bodyText, { color: colors.text, fontSize: 15 * textMultiplier, lineHeight: 24 * textMultiplier }]}>
                {foundDocument.fullText}
              </Text>
            </View>
          </>
        )}

        {hasContext && (
          <>
            <View style={styles.divider} />
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                Historical Context
              </Text>
              <Text style={[styles.bodyText, { color: colors.text, fontSize: 15 * textMultiplier, lineHeight: 24 * textMultiplier }]}>
                {foundDocument.context}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 36,
  },
  breadcrumb: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
  },
});