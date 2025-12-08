// components/SectionList.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { MainSection } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import NetInfo from "@react-native-community/netinfo";

interface SectionListProps {
  mainSection: MainSection;
  showCustomHeader?: boolean;
}

const FOUNDING_DOCUMENTS = [
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
];

function SubsectionCard({
  subsection,
  isDocument,
  colors,
  isDark,
  onPress,
}: {
  subsection: any;
  isDocument: boolean;
  colors: any;
  isDark: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleIn = () => {
    scale.value = withSpring(0.96, { damping: 16, stiffness: 300 });
  };

  const handleOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handleIn}
      onPressOut={handleOut}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={subsection.title}
    >
      <Animated.View style={[styles.subsectionCard, animatedStyle]}>
        <BlurView
          intensity={isDark ? 90 : 110}
          tint={isDark ? "dark" : "light"}
          style={styles.cardInner}
        >
          <View style={styles.content}>
            {isDocument && (
              <View style={[styles.badge, { backgroundColor: colors.primary + "22" }]}>
                <IconSymbol
                  ios_icon_name="doc.text.fill"
                  android_material_icon_name="history_edu"
                  size={16}
                  color={colors.primary}
                />
              </View>
            )}
            <Text style={[styles.title, { color: colors.text }]}>
              {subsection.title}
            </Text>
          </View>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={22}
            color={colors.textSecondary}
          />
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function SectionList({
  mainSection,
  showCustomHeader = true,
}: SectionListProps) {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state =>
      setIsOffline(!state.isConnected)
    );
    return unsubscribe;
  }, []);

  const navigateToItem = (id: string) => {
    const route = FOUNDING_DOCUMENTS.includes(id)
      ? `/document/${id}`
      : `/detail/${id}`;
    router.push(route as any);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const data = mainSection.sections.flatMap(section => [
    { type: "header" as const, section },
    ...section.subsections.map(sub => ({
      type: "subsection" as const,
      subsection: sub,
      isDocument: FOUNDING_DOCUMENTS.includes(sub.id),
    })),
  ]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={{ color: colors.accent, fontSize: 13, fontWeight: "600" }}>
            Offline • Using cached content
          </Text>
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {showCustomHeader && (
              <View style={[styles.customHeader, { borderBottomColor: colors.primary + "20" }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                  <IconSymbol
                    ios_icon_name="chevron.left"
                    android_material_icon_name="arrow_back"
                    size={26}
                    color={colors.text}
                  />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  {mainSection.title}
                </Text>
                <View style={{ width: 44 }} />
              </View>
            )}
            <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
              <Text style={[styles.pageTitle, { color: colors.text }]}>
                {mainSection.title}
              </Text>
              <Text style={[styles.pageDesc, { color: colors.textSecondary }]}>
                {mainSection.description}
              </Text>
            </Animated.View>
          </>
        }
        renderItem={({ item }) => {
          if (item.type === "header") {
            return (
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {item.section.title}
                </Text>
                <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
                  {item.section.description}
                </Text>
              </View>
            );
          }
          return (
            <SubsectionCard
              subsection={item.subsection}
              isDocument={item.isDocument}
              colors={colors}
              isDark={isDark}
              onPress={() => navigateToItem(item.subsection.id)}
            />
          );
        }}
        ListFooterComponent={<AppFooter />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  offlineBanner: { padding: 10, alignItems: "center", backgroundColor: "#00000040" },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140 },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 60 : 48,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
  },
  backBtn: { padding: 10, borderRadius: 20 },
  headerTitle: { fontSize: 19, fontWeight: "800", flex: 1, textAlign: "center", marginRight: 44 },
  header: { marginBottom: 32, alignItems: "center" },
  pageTitle: { fontSize: 38, fontWeight: "900", textAlign: "center", lineHeight: 48, marginBottom: 12 },
  pageDesc: { fontSize: 17, textAlign: "center", lineHeight: 26, opacity: 0.9 },
  sectionHeader: { marginBottom: 24 },
  sectionTitle: { fontSize: 24, fontWeight: "900", marginBottom: 8, lineHeight: 32 },
  sectionDesc: { fontSize: 15.5, lineHeight: 24, opacity: 0.85 },
  subsectionCard: {
    marginBottom: 16,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#D4AF3725",
  },
  cardInner: {
    flexDirection: "row",
    padding: 22,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  content: { flex: 1 },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 19, fontWeight: "700", flex: 1, lineHeight: 28 },
});