// app/document/[id].tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { loadContentData } from "@/data/contentData";
import { findItemById } from "@/utils/findItemById";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import { BlurView } from "expo-blur";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";
import NetInfo from "@react-native-community/netinfo";

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
  const { colors, isDark } = useTheme();

  const [doc, setDoc] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => setIsOffline(!state.isConnected));

    const loadDoc = async () => {
      setIsLoading(true);
      const data = await loadContentData();
      const result = findItemById(id);
      if (result && FOUNDING_DOCUMENTS.includes(id)) {
        setDoc({
          ...result.item,
          mainSection: result.mainSection.title,
          section: result.section.title,
        });
      }
      setIsLoading(false);
    };

    loadDoc();
    return unsubscribe;
  }, [id]);

  const speak = useCallback(() => {
    if (doc) {
      const text = doc.fullText || doc.content || doc.title;
      Speech.speak(text, { language: "en-US" });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [doc]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Loading Document..." }} />
        <Text style={{ color: colors.text, fontSize: 18, textAlign: "center", marginTop: 100 }}>
          Loading historic document...
        </Text>
      </View>
    );
  }

  if (!doc) {
    return (
      <>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.error}>
            <IconSymbol ios_icon_name="exclamationmark.triangle.fill" android_material_icon_name="error" size={72} color={colors.accent} />
            <Text style={[styles.errorTitle, { color: colors.text }]}>Document Not Found</Text>
            <Text style={[styles.errorText, { color: colors.textSecondary }]}>
              The founding document you requested could not be located.
            </Text>
            <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
              <Text style={styles.backText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  const sections = [
    { type: "title", title: doc.title, breadcrumb: `${doc.mainSection} → ${doc.section}` },
    { type: "overview", text: doc.content },
    ...(doc.fullText ? [{ type: "fulltext", text: doc.fullText }] : []),
    ...(doc.context ? [{ type: "context", text: doc.context }] : []),
    ...(id === "constitution" ? [{ type: "structure" }] : []),
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: doc.title,
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: "#FFFFFF",
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 16, marginRight: 8 }}>
              <TouchableOpacity onPress={speak}>
                <IconSymbol ios_icon_name="speaker.wave.3" android_material_icon_name="volume_up" size={26} color="#FFFFFF" />
              </TouchableOpacity>
              <FavoriteToggle itemId={id} size={28} />
            </View>
          ),
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {isOffline && (
          <View style={styles.offlineBanner}>
            <Text style={{ color: colors.accent, fontSize: 13, fontWeight: "600" }}>
              Offline • Viewing cached document
            </Text>
          </View>
        )}

        <FlatList
          data={sections}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item.type === "title") {
              return (
                <View style={styles.header}>
                  <View style={[styles.foundingBadge, { backgroundColor: colors.primary + "18", borderColor: colors.primary }]}>
                    <IconSymbol ios_icon_name="doc.text.fill" android_material_icon_name="history_edu" size={16} color={colors.primary} />
                    <Text style={[styles.badgeText, { color: colors.primary }]}>Founding Document</Text>
                  </View>
                  <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>{item.breadcrumb}</Text>
                </View>
              );
            }
            if (item.type === "overview") {
              return (
                <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: colors.primary }]}>Overview</Text>
                  <Text style={[styles.text, { color: colors.text }]}>{item.text}</Text>
                </BlurView>
              );
            }
            if (item.type === "structure") {
              return (
                <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: colors.primary }]}>Document Structure</Text>
                  <Text style={[styles.structureText, { color: colors.textSecondary }]}>
                    {"• Article I — Legislative\n"}
                    {"• Article II — Executive\n"}
                    {"• Article III — Judicial\n"}
                    {"• Article IV — States\n"}
                    {"• Article V — Amendments\n"}
                    {"• Article VI — Federal Power\n"}
                    {"• Article VII — Ratification\n\n"}
                    {"Bill of Rights (1–10)\n"}
                    {"Amendments 11–27"}
                  </Text>
                </BlurView>
              );
            }
            if (item.type === "fulltext") {
              return (
                <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: colors.primary }]}>Full Text</Text>
                  <Text style={[styles.fullText, { color: colors.text }]}>{item.text}</Text>
                </BlurView>
              );
            }
            if (item.type === "context") {
              return (
                <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: colors.primary }]}>Historical Context</Text>
                  <Text style={[styles.text, { color: colors.text }]}>{item.text}</Text>
                </BlurView>
              );
            }
            return null;
          }}
          ListFooterComponent={<AppFooter />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  offlineBanner: { padding: 10, alignItems: "center", backgroundColor: "#00000040" },
  content: { padding: 20, paddingBottom: 140 },
  header: { marginBottom: 32, alignItems: "center" },
  foundingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
    marginBottom: 20,
  },
  badgeText: { fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  title: { fontSize: 36, fontWeight: "900", textAlign: "center", lineHeight: 46, marginBottom: 12 },
  breadcrumb: { fontSize: 14, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.9 },
  section: { padding: 28, borderRadius: 28, marginBottom: 24, overflow: "hidden", borderWidth: 1.5, borderColor: "#D4AF3730" },
  sectionLabel: { fontSize: 15, fontWeight: "900", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 },
  text: { fontSize: 17.5, lineHeight: 30, textAlign: "justify" },
  structureText: { fontSize: 16.5, lineHeight: 28, opacity: 0.9 },
  fullText: { fontSize: 16, lineHeight: 28, fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" },
  error: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  errorTitle: { fontSize: 26, fontWeight: "800", marginTop: 24, marginBottom: 12 },
  backBtn: { paddingHorizontal: 36, paddingVertical: 16, borderRadius: 20, marginTop: 20 },
  backText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
});