// app/detail/[id].tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
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
import * as Sharing from "expo-sharing";
import * as Haptics from "expo-haptics";
import NetInfo from "@react-native-community/netinfo";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width - 64;

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const [item, setItem] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => setIsOffline(!state.isConnected));

    const loadItem = async () => {
      setIsLoading(true);
      const data = await loadContentData();
      const result = findItemById(id);
      if (result) {
        setItem({ ...result.item, mainSection: result.mainSection.title, section: result.section.title });
      }
      setIsLoading(false);
    };

    loadItem();
    return unsubscribe;
  }, [id]);

  const speak = useCallback(() => {
    if (item) {
      const text = item.fullText || item.content || item.title;
      Speech.speak(text);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [item]);

  const share = useCallback(async () => {
    if (!item) return;
    try {
      await Sharing.shareAsync("https://thehumanconservative.com", {
        dialogTitle: item.title,
      });
      Haptics.selectionAsync();
    } catch (e) {
      if (__DEV__) console.log("Share failed:", e);
    }
  }, [item]);

  if (isLoading || !item) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading..." }} />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.loading}>
            <Text style={{ color: colors.text, fontSize: 18 }}>Loading content...</Text>
          </View>
        </View>
      </>
    );
  }

  const isFoundingDoc = !!item.fullText || !!item.context;
  const content = item.content || "";
  const hasImage = !!item.imageUrl;

  const sections = [
    { type: "title", title: item.title, breadcrumb: `${item.mainSection} → ${item.section}`, isFoundingDoc },
    ...(hasImage ? [{ type: "image", url: item.imageUrl }] : []),
    { type: "section", label: isFoundingDoc ? "Overview" : "Description", text: content },
    ...(item.fullText ? [{ type: "section", label: "Full Text", text: item.fullText }] : []),
    ...(item.context ? [{ type: "section", label: "Historical Context", text: item.context }] : []),
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: "#FFFFFF",
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 14, marginRight: 8 }}>
              <TouchableOpacity onPress={speak}>
                <IconSymbol ios_icon_name="speaker.wave.2" android_material_icon_name="volume_up" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={share}>
                <IconSymbol ios_icon_name="square.and.arrow.up" android_material_icon_name="share" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <FavoriteToggle itemId={id} size={26} />
            </View>
          ),
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {isOffline && (
          <View style={styles.offlineBanner}>
            <Text style={{ color: colors.accent, fontSize: 13, fontWeight: "600" }}>
              Offline • Using cached content
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
                  <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>{item.breadcrumb}</Text>
                  <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                  {item.isFoundingDoc && (
                    <View style={[styles.badge, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
                      <IconSymbol android_material_icon_name="history_edu" size={14} color={colors.primary} />
                      <Text style={[styles.badgeText, { color: colors.primary }]}>Founding Document</Text>
                    </View>
                  )}
                </View>
              );
            }
            if (item.type === "image") {
              return (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.url }} style={styles.image} contentFit="cover" transition={300} />
                </View>
              );
            }
            return (
              <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.sectionCard}>
                <Text style={[styles.sectionLabel, { color: colors.primary }]}>{item.label}</Text>
                <Text style={[styles.sectionText, { color: colors.text }]}>{item.text}</Text>
              </BlurView>
            );
          }}
          ListFooterComponent={<AppFooter />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  offlineBanner: { padding: 8, alignItems: "center", backgroundColor: "#00000040" },
  content: { padding: 20, paddingBottom: 140 },
  header: { marginBottom: 28, alignItems: "center" },
  breadcrumb: { fontSize: 13, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1.2, opacity: 0.8 },
  title: { fontSize: 34, fontWeight: "900", textAlign: "center", marginVertical: 12, lineHeight: 44 },
  badge: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, alignSelf: "center", marginTop: 8 },
  badgeText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
  imageContainer: { alignSelf: "center", marginVertical: 24, borderRadius: 20, overflow: "hidden", borderWidth: 3, borderColor: "#D4AF37" },
  image: { width: IMAGE_SIZE, height: IMAGE_SIZE },
  sectionCard: { padding: 24, borderRadius: 24, marginBottom: 20, overflow: "hidden", borderWidth: 1.5, borderColor: "#D4AF3730" },
  sectionLabel: { fontSize: 14, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 },
  sectionText: { fontSize: 17, lineHeight: 28, textAlign: "justify" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});