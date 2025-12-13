import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTextSize } from "@/contexts/TextSizeContext";
import { MainSection } from "@/data/contentData";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AppFooter } from "@/components/AppFooter";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

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

/**
 * SectionList Component
 * 
 * Displays a hierarchical list of sections and subsections with:
 * - Staggered entrance animations
 * - Haptic feedback on navigation
 * - Gradient accents
 * - Document badges for founding documents
 * - Custom header with back navigation
 * - Text size scaling support
 * 
 * @example
 * ```tsx
 * <SectionList 
 *   mainSection={civicLiteracySection}
 *   showCustomHeader={true}
 * />
 * ```
 */
export function SectionList({
  mainSection,
  showCustomHeader = true,
}: SectionListProps) {
  const { colors, shadows } = useTheme();
  const { getTextSizeMultiplier } = useTextSize();
  const router = useRouter();
  const textMultiplier = getTextSizeMultiplier();

  /**
   * Navigate to detail or document screen
   */
  const navigateToItem = useCallback((subsectionId: string) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    try {
      if (FOUNDING_DOCUMENTS.includes(subsectionId)) {
        router.push(`/document/${subsectionId}` as any);
      } else {
        router.push(`/detail/${subsectionId}` as any);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Navigation error:', error);
      }
    }
  }, [router]);

  /**
   * Handle back navigation
   */
  const handleBack = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      router.back();
    } catch (error) {
      if (__DEV__) {
        console.log('Back navigation error:', error);
      }
    }
  }, [router]);

  // Safety check - show error state
  if (!mainSection || !mainSection.sections) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Animated.View 
          style={styles.errorContainer}
          entering={FadeIn.duration(400)}
        >
          <MaterialIcons
            name="error-outline"
            size={48}
            color={colors.textSecondary}
            style={styles.errorIcon}
          />
          <Text style={[styles.errorText, { color: colors.text }]}>
            Content not available
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Custom Header */}
      {showCustomHeader && (
        <View
          style={[
            styles.customHeader,
            { 
              backgroundColor: colors.background,
            },
          ]}
        >
          <LinearGradient
            colors={[
              colors.primary + '00',
              colors.primary + '20',
              colors.primary + '00',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerBorder}
          />
          
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          
          <Text
            style={[styles.headerTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {mainSection.title || "Content"}
          </Text>
          
          <View style={styles.headerSpacer} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.delay(50).duration(400)}
        >
          <Text
            style={[
              styles.title, 
              { 
                color: colors.text, 
                fontSize: 30 * textMultiplier 
              }
            ]}
            accessibilityRole="header"
          >
            {mainSection.title || "Content"}
          </Text>
          {mainSection.description && (
            <Text 
              style={[
                styles.description, 
                { 
                  color: colors.textSecondary, 
                  fontSize: 15 * textMultiplier 
                }
              ]}
            >
              {mainSection.description}
            </Text>
          )}
        </Animated.View>

        {/* Sections */}
        <View style={styles.sectionsContainer}>
          {mainSection.sections.map((section, sectionIndex) => {
            // Safety checks
            if (!section || !section.subsections) return null;

            return (
              <Animated.View 
                key={`section-${sectionIndex}`} 
                style={styles.sectionGroup}
                entering={FadeInDown.delay(100 + sectionIndex * 50).springify()}
              >
                <View style={styles.sectionHeader}>
                  <Text 
                    style={[
                      styles.sectionTitle, 
                      { 
                        color: colors.text, 
                        fontSize: 19 * textMultiplier 
                      }
                    ]}
                  >
                    {section.title || "Section"}
                  </Text>
                  {section.description && (
                    <Text
                      style={[
                        styles.sectionDescription,
                        { 
                          color: colors.textSecondary, 
                          fontSize: 13 * textMultiplier 
                        },
                      ]}
                    >
                      {section.description}
                    </Text>
                  )}
                </View>

                <View style={styles.subsectionsContainer}>
                  {section.subsections.map((subsection, subsectionIndex) => {
                    // Safety checks
                    if (!subsection || !subsection.id) return null;

                    const isDocument = FOUNDING_DOCUMENTS.includes(subsection.id);
                    return (
                      <SubsectionCard
                        key={subsection.id}
                        subsection={subsection}
                        isDocument={isDocument}
                        colors={colors}
                        shadows={shadows}
                        textMultiplier={textMultiplier}
                        onPress={() => navigateToItem(subsection.id)}
                      />
                    );
                  })}
                </View>
              </Animated.View>
            );
          })}
        </View>

        <AppFooter />
      </ScrollView>
    </View>
  );
}

/**
 * Subsection Card Component
 * Memoized for performance - only re-renders when props change
 */
const SubsectionCard = React.memo(function SubsectionCard({
  subsection,
  isDocument,
  colors,
  shadows,
  textMultiplier,
  onPress,
}: {
  subsection: any;
  isDocument: boolean;
  colors: any;
  shadows: any;
  textMultiplier: number;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 12, stiffness: 200 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  }, [scale]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Navigate to ${subsection.title || 'content'}`}
      accessibilityRole="button"
      accessibilityHint={isDocument ? "Founding document" : undefined}
    >
      <Animated.View
        style={[
          styles.subsectionCard,
          {
            backgroundColor: colors.card,
            ...shadows.small,
          },
          animatedStyle,
        ]}
      >
        {/* Left accent */}
        <LinearGradient
          colors={[
            colors.primary + 'E6',
            colors.goldGradientEnd + 'CC',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.cardAccent}
        />

        <View style={styles.subsectionContent}>
          {isDocument && (
            <View
              style={[
                styles.documentBadge,
                { backgroundColor: colors.primary + "25" },
              ]}
            >
              <MaterialIcons
                name="description"
                size={14}
                color={colors.primary}
              />
            </View>
          )}
          <Text 
            style={[
              styles.subsectionTitle, 
              { 
                color: colors.text, 
                fontSize: 16 * textMultiplier 
              }
            ]}
            numberOfLines={2}
          >
            {subsection.title || "Untitled"}
          </Text>
        </View>
        
        <MaterialIcons
          name="chevron-right"
          size={22}
          color={colors.textSecondary}
          style={styles.chevron}
        />
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 48 : 56,
    paddingBottom: 12,
    position: 'relative',
  },
  headerBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionsContainer: {
    gap: 32,
  },
  sectionGroup: {
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
  },
  subsectionsContainer: {
    gap: 12,
  },
  subsectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    minHeight: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  subsectionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  documentBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    letterSpacing: 0.2,
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.6,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});