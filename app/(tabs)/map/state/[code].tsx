import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { mapData, State } from "@/data/mapData";
import { useTheme } from "@/contexts/ThemeContext";
import { useTextSize } from "@/contexts/TextSizeContext";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

/**
 * State Detail Screen Component
 * Displays comprehensive information about a U.S. state
 * Includes content sections, state code badge, and favorite functionality
 */
export default function StateDetailScreen() {
  const { colors, shadows } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const textMultiplier = getTextSizeMultiplier();
  const params = useLocalSearchParams();
  
  // Handle param variations safely
  const rawCode = params.code as string | string[] | undefined;
  const stateCode = (Array.isArray(rawCode) ? rawCode[0] : rawCode || "")
    .toUpperCase();

  // Find the matching state in any region
  let foundState: State | undefined;
  let regionName: string | undefined;
  
  for (const region of mapData) {
    const match = region.states.find((s) => s.code === stateCode);
    if (match) {
      foundState = match;
      regionName = region.name;
      break;
    }
  }

  /**
   * Render error state if state not found
   */
  if (!foundState) {
    return (
      <>
        <Stack.Screen 
          options={{ 
            title: "State",
            headerShown: true,
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
            headerShadowVisible: false,
          }} 
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <Animated.View 
            style={styles.errorContainer}
            entering={FadeIn.duration(400)}
          >
            <IconSymbol
              ios_icon_name="exclamationmark.triangle.fill"
              android_material_icon_name="error"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.errorTitle, { color: colors.text }]}>
              State not found
            </Text>
            <Text style={[styles.errorText, { color: colors.textSecondary }]}>
              The state you tried to open could not be located. Please go back to
              the map and try again.
            </Text>
          </Animated.View>
        </View>
      </>
    );
  }

  // Prepare content
  const longText =
    (foundState.content && foundState.content.trim().length > 0
      ? foundState.content
      : foundState.blurb) || "";
  const paragraphs = longText.split("\n\n").filter(p => p.trim().length > 0);

  // Create a unique ID for this state for favorites
  const stateId = `state:${foundState.code}`;

  return (
    <>
      <Stack.Screen
        options={{
          title: foundState.name,
          headerShown: true,
          headerBackVisible: true,
          headerRight: () => (
            <View style={styles.headerRight}>
              <FavoriteToggle itemId={stateId} size={22} />
            </View>
          ),
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View 
            style={styles.header}
            entering={FadeInDown.delay(50).springify()}
          >
            <View style={styles.titleRow}>
              <View style={styles.titleContent}>
                <Text 
                  style={[
                    styles.title, 
                    { 
                      color: colors.text,
                      fontSize: 28 * textMultiplier 
                    }
                  ]}
                >
                  {foundState.name}
                </Text>
                {regionName && (
                  <Text 
                    style={[
                      styles.region, 
                      { 
                        color: colors.textSecondary,
                        fontSize: 14 * textMultiplier 
                      }
                    ]}
                  >
                    {regionName}
                  </Text>
                )}
              </View>
              
              {/* State Code Badge */}
              <View 
                style={[
                  styles.stateBadge, 
                  { 
                    backgroundColor: colors.primary + '20',
                    borderColor: colors.primary + '30',
                  }
                ]}
              >
                <Text 
                  style={[
                    styles.stateCode, 
                    { color: colors.primary }
                  ]}
                >
                  {foundState.code}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Content Sections */}
          {paragraphs.map((para, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(100 + index * 50).springify()}
            >
              <View 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: colors.card,
                    ...shadows.small 
                  }
                ]}
              >
                <Text 
                  style={[
                    styles.paragraph, 
                    { 
                      color: colors.text,
                      fontSize: 15 * textMultiplier,
                      lineHeight: 22 * textMultiplier,
                    }
                  ]}
                >
                  {para}
                </Text>
              </View>
            </Animated.View>
          ))}

          {/* Quick Facts Section (if available) */}
          {foundState.capital && (
            <Animated.View
              entering={FadeInDown.delay(100 + paragraphs.length * 50 + 100).springify()}
            >
              <View 
                style={[
                  styles.factsCard, 
                  { 
                    backgroundColor: colors.primary + '10',
                    borderColor: colors.primary + '20',
                  }
                ]}
              >
                <Text 
                  style={[
                    styles.factsTitle, 
                    { color: colors.primary }
                  ]}
                >
                  Quick Facts
                </Text>
                <View style={styles.factRow}>
                  <IconSymbol
                    ios_icon_name="building.2"
                    android_material_icon_name="location_city"
                    size={18}
                    color={colors.primary}
                  />
                  <Text 
                    style={[
                      styles.factLabel, 
                      { color: colors.text }
                    ]}
                  >
                    Capital:
                  </Text>
                  <Text 
                    style={[
                      styles.factValue, 
                      { color: colors.text }
                    ]}
                  >
                    {foundState.capital}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          <AppFooter />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
    lineHeight: 36,
    letterSpacing: 0.3,
  },
  region: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  stateBadge: {
    minWidth: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateCode: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  factsCard: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 18,
    marginTop: 8,
    marginBottom: 20,
  },
  factsTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  factLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  factValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 28,
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.9,
  },
});