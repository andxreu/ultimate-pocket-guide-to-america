import React, { useCallback } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { loadMapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

export default function RegionDetailScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [region, setRegion] = React.useState<any>(null);

  React.useEffect(() => {
    loadMapData().then(data => {
      const found = data.find(r => r.id === id);
      setRegion(found || null);
    });
  }, [id]);

  const navigateToState = useCallback((code: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/map/state/${code.toLowerCase()}` as any);
  }, [router]);

  if (!region) {
    return (
      <>
        <Stack.Screen options={{ title: "Region", headerShown: true, headerTintColor: colors.text, headerStyle: { backgroundColor: colors.card } }} />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol ios_icon_name="exclamationmark.triangle.fill" android_material_icon_name="error" size={64} color={colors.textSecondary} />
            <Text style={[styles.errorText, { color: colors.text }]}>Region not found</Text>
            <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: region.name, headerShown: true, headerBackTitle: "Map", headerTintColor: colors.text, headerStyle: { backgroundColor: colors.card } }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={region.states}
          keyExtractor={item => item.code}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{region.name}</Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>{region.description}</Text>
              </View>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>States in this region</Text>
              </View>
            </>
          }
          renderItem={({ item: state }) => (
            <StateCard state={state} colors={colors} isDark={isDark} onPress={() => navigateToState(state.code)} />
          )}
          ListFooterComponent={<AppFooter />}
        />
      </View>
    </>
  );
}

function StateCard({ state, colors, isDark, onPress }: { state: any; colors: any; isDark: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
    opacity.value = withSpring(0.9);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  return (
    <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.7}>
      <Animated.View style={[styles.stateCard, { borderColor: colors.primary + "10" }, animatedStyle]}>
        <BlurView intensity={isDark ? 80 : 100} tint={isDark ? "dark" : "light"} style={styles.cardInner}>
          <View style={[styles.stateCodeBadge, { backgroundColor: colors.highlight }]}>
            <Text style={[styles.stateCode, { color: colors.primary }]}>{state.code}</Text>
          </View>
          <View style={styles.stateContent}>
            <Text style={[styles.stateName, { color: colors.text }]}>{state.name}</Text>
          </View>
          <IconSymbol ios_icon_name="chevron.right" android_material_icon_name="chevron_right" size={20} color={colors.textSecondary} />
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: { marginTop: 16, marginBottom: 28 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 8, lineHeight: 46 },
  description: { fontSize: 16, lineHeight: 24 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "700", lineHeight: 29 },
  stateCard: { borderRadius: 16, borderWidth: 1, marginBottom: 12, overflow: "hidden" },
  cardInner: { flexDirection: "row", padding: 18, alignItems: "center", gap: 16 },
  stateCodeBadge: { width: 52, height: 52, borderRadius: 26, justifyContent: "center", alignItems: "center" },
  stateCode: { fontSize: 16, fontWeight: "800" },
  stateContent: { flex: 1 },
  stateName: { fontSize: 18, fontWeight: "600", lineHeight: 26 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  errorText: { fontSize: 18, fontWeight: "600", marginTop: 16, marginBottom: 24 },
  backButton: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  backButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});