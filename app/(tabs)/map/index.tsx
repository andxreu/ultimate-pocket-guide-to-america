// app/map/index.tsx
import React from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { loadMapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

export default function MapExplorerScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [regions, setRegions] = React.useState<any[]>([]);

  React.useEffect(() => {
    loadMapData().then(setRegions);
  }, []);

  const navigateToRegion = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/map/region/${id}` as any);
  };

  const renderRegion = ({ item }: { item: any }) => (
    <RegionCard region={item} colors={colors} isDark={isDark} onPress={() => navigateToRegion(item.id)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={regions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>American Map Explorer</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              Explore the diverse regions and states that make up the United States of America.
            </Text>
          </View>
        }
        renderItem={renderRegion}
        ListFooterComponent={<AppFooter />}
      />
    </View>
  );
}

function RegionCard({ region, colors, isDark, onPress }: { region: any; colors: any; isDark: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 16, stiffness: 300 });
    opacity.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  return (
    <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
      <Animated.View style={[styles.regionCard, { borderColor: colors.primary + "15" }, animatedStyle]}>
        <BlurView intensity={isDark ? 90 : 110} tint={isDark ? "dark" : "light"} style={styles.cardInner}>
          <View style={styles.regionContent}>
            <View style={styles.regionHeader}>
              <Text style={[styles.regionTitle, { color: colors.text }]}>{region.name}</Text>
              <View style={[styles.stateCountBadge, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.stateCount, { color: colors.primary }]}>{region.states.length}</Text>
              </View>
            </View>
            <Text style={[styles.regionDescription, { color: colors.textSecondary }]} numberOfLines={3}>
              {region.description}
            </Text>
          </View>
          <IconSymbol ios_icon_name="chevron.right" android_material_icon_name="chevron_right" size={22} color={colors.textSecondary} />
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: { marginBottom: 32, alignItems: "center" },
  title: { fontSize: 34, fontWeight: "900", textAlign: "center", marginBottom: 12, lineHeight: 44 },
  description: { fontSize: 17, textAlign: "center", lineHeight: 26, opacity: 0.9 },
  regionCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardInner: { flexDirection: "row", padding: 20, alignItems: "center", gap: 16 },
  regionContent: { flex: 1 },
  regionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  regionTitle: { fontSize: 22, fontWeight: "800", lineHeight: 30 },
  stateCountBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  stateCount: { fontSize: 14, fontWeight: "800" },
  regionDescription: { fontSize: 15.5, lineHeight: 24, opacity: 0.85 },
});