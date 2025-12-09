
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { mapData } from "@/data/mapData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function RegionDetailScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const region = mapData.find((r) => r.id === id);

  if (!region) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Region",
            headerShown: true,
            headerBackTitle: "Back",
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.card },
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol
              ios_icon_name="exclamationmark.triangle.fill"
              android_material_icon_name="error"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.errorText, { color: colors.text }]}>
              Region not found
            </Text>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.primary }]}
              onPress={() => router.back()}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: region.name,
          headerShown: true,
          headerBackTitle: "Map",
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
        }}
      />
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
              {region.name}
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {region.description}
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              States in this region
            </Text>
          </View>

          <View style={styles.statesContainer}>
            {region.states.map((state, index) => (
              <React.Fragment key={index}>
                <StateCard
                  state={state}
                  colors={colors}
                  onPress={() =>
                    router.push(`/map/state/${state.code.toLowerCase()}` as any)
                  }
                />
              </React.Fragment>
            ))}
          </View>

          <AppFooter />
        </ScrollView>
      </View>
    </>
  );
}

function StateCard({
  state,
  colors,
  onPress,
}: {
  state: any;
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
      accessibilityLabel={`Navigate to ${state.name}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.stateCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary + "10",
          },
          animatedStyle,
        ]}
      >
        <View
          style={[styles.stateCodeBadge, { backgroundColor: colors.highlight }]}
        >
          <Text style={[styles.stateCode, { color: colors.primary }]}>
            {state.code}
          </Text>
        </View>
        <View style={styles.stateContent}>
          <Text style={[styles.stateName, { color: colors.text }]}>
            {state.name}
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
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginTop: 16,
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
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 27.55,
  },
  statesContainer: {
    gap: 12,
  },
  stateCard: {
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
    gap: 12,
  },
  stateCodeBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  stateCode: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20.3,
  },
  stateContent: {
    flex: 1,
  },
  stateName: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 23.2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 20,
    lineHeight: 26.1,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23.2,
  },
});
