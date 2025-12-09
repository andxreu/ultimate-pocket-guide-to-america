
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { mapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function MapExplorerScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            American Map Explorer
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Explore the diverse regions and states that make up the United
            States of America.
          </Text>
        </View>

        <View style={styles.regionsContainer}>
          {mapData.map((region, index) => (
            <RegionCard
              key={index}
              region={region}
              colors={colors}
              onPress={() => router.push(`/map/region/${region.id}` as any)}
            />
          ))}
        </View>

        <AppFooter />
      </ScrollView>
    </View>
  );
}

function RegionCard({
  region,
  colors,
  onPress,
}: {
  region: any;
  colors: any;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(0.8, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Navigate to ${region.name}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.regionCard,
          {
            backgroundColor: colors.card,
            borderColor: "rgba(255, 255, 255, 0.06)",
          },
          animatedStyle,
        ]}
      >
        <View style={styles.regionContent}>
          <View style={styles.regionHeader}>
            <Text style={[styles.regionTitle, { color: colors.text }]}>
              {region.name}
            </Text>
            <Text style={[styles.stateCount, { color: colors.textSecondary }]}>
              {region.states.length} states
            </Text>
          </View>
          <Text
            style={[styles.regionDescription, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {region.description}
          </Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron_right"
          size={20}
          color={colors.textSecondary}
        />
      </Animated.View>
    </Pressable>
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
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 43.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 21.75,
  },
  regionsContainer: {
    gap: 12,
  },
  regionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 44,
  },
  regionContent: {
    flex: 1,
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  regionTitle: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24.65,
  },
  stateCount: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 17.4,
  },
  regionDescription: {
    fontSize: 13,
    lineHeight: 18.85,
  },
});
