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
import { loadMapData, State } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";

export default function StateDetailScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawCode = params.code as string | string[] | undefined;
  const stateCode = (Array.isArray(rawCode) ? rawCode[0] : rawCode || "").toUpperCase();

  const [state, setState] = useState<State | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMapData().then(data => {
      let found: State | undefined;
      for (const region of data) {
        found = region.states.find(s => s.code === stateCode);
        if (found) break;
      }
      setState(found || null);
      setIsLoading(false);
    });
  }, [stateCode]);

  const speakContent = useCallback(() => {
    if (state) {
      const text = state.content || state.blurb || "";
      Speech.speak(text);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [state]);

  const shareState = useCallback(() => {
    if (state) {
      Haptics.selectionAsync();
      // You can expand this with expo-sharing later
      alert(`Share ${state.name} — coming soon!`);
    }
  }, [state]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Loading..." }} />
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 100 }}>
          Loading state details...
        </Text>
      </View>
    );
  }

  if (!state) {
    return (
      <>
        <Stack.Screen options={{ title: "State Not Found" }} />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol ios_icon_name="exclamationmark.triangle.fill" android_material_icon_name="error" size={72} color={colors.accent} />
            <Text style={[styles.errorTitle, { color: colors.text }]}>State Not Found</Text>
            <Text style={[styles.errorText, { color: colors.textSecondary }]}>
              We couldn't find the state you're looking for.
            </Text>
            <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  const content = (state.content || state.blurb || "").trim();
  const paragraphs = content.split("\n\n").filter(p => p.trim().length > 0);
  const stateId = `state:${state.code}`;

  return (
    <>
      <Stack.Screen
        options={{
          title: state.name,
          headerShown: true,
          headerBackTitle: "Map",
          headerTintColor: "#FFFFFF",
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 12, marginRight: 8 }}>
              <TouchableOpacity onPress={speakContent}>
                <IconSymbol ios_icon_name="speaker.wave.2" android_material_icon_name="volume_up" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={shareState}>
                <IconSymbol ios_icon_name="square.and.arrow.up" android_material_icon_name="share" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <FavoriteToggle itemId={stateId} size={26} />
            </View>
          ),
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={paragraphs}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{state.name}</Text>
                <View style={[styles.codeBadge, { backgroundColor: colors.primary + "20" }]}>
                  <Text style={[styles.codeText, { color: colors.primary }]}>{state.code}</Text>
                </View>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={styles.paragraphCard}>
              <Text style={[styles.paragraph, { color: colors.text }]}>{item}</Text>
            </BlurView>
          )}
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120 },
  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 34, fontWeight: "800", textAlign: "center", marginBottom: 12, lineHeight: 44 },
  codeBadge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  codeText: { fontSize: 20, fontWeight: "900", letterSpacing: 2 },
  paragraphCard: { padding: 20, borderRadius: 20, marginBottom: 16, overflow: "hidden" },
  paragraph: { fontSize: 16.5, lineHeight: 26, textAlign: "justify" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  errorTitle: { fontSize: 24, fontWeight: "700", marginTop: 20, marginBottom: 12 },
  errorText: { fontSize: 16, textAlign: "center", lineHeight: 24, marginBottom: 32 },
  backButton: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 16 },
  backButtonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "600" },
});