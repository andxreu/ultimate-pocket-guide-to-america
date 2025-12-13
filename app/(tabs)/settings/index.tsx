
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Switch,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useTextSize } from '@/contexts/TextSizeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useReadingHistory } from '@/contexts/ReadingHistoryContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  FadeInDown,
  ZoomIn,
} from 'react-native-reanimated';

type TextSize = 'small' | 'default' | 'large' | 'extra-large';

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string; icon: string }[] = [
  { value: 'small', label: 'Small', icon: 'A' },
  { value: 'default', label: 'Default', icon: 'A' },
  { value: 'large', label: 'Large', icon: 'A' },
  { value: 'extra-large', label: 'XL', icon: 'A' },
];

/**
 * Premium Settings Screen Component
 * Beautiful, modern settings with glassmorphism and smooth animations
 */
export default function SettingsScreen() {
  const { colors, isDark, theme, setTheme, shadows } = useTheme();
  const { textSize, setTextSize } = useTextSize();
  const { clearAllFavorites, getFavoritesCount } = useFavorites();
  const { clearHistory } = useReadingHistory();

  const handleThemeToggle = async () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await setTheme(newTheme);
  };

  const handleTextSizeChange = async (size: TextSize) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.selectionAsync();
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    await setTextSize(size);
  };

  const handleOpenWebsite = async () => {
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
      await Linking.openURL('https://thehumanconservative.com');
    } catch (error) {
      if (__DEV__) {
        console.log('Error opening URL:', error);
      }
    }
  };

  const handleOpenDeveloperSite = async () => {
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
      await Linking.openURL('https://stormlightfoundry.com');
    } catch (error) {
      if (__DEV__) {
        console.log('Error opening URL:', error);
      }
    }
  };

  const handleOpenPrivacyPolicy = async () => {
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
      await Linking.openURL('https://stormlightfoundry.com/pocket-guide-to-america/privacy-policy-pocket-guide-to-america/');
    } catch (error) {
      if (__DEV__) {
        console.log('Error opening URL:', error);
      }
    }
  };

  const handleOpenChangelog = async () => {
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
      await Linking.openURL('https://stormlightfoundry.com/pocket-guide-to-america/changelog-pocket-guide-to-america/');
    } catch (error) {
      if (__DEV__) {
        console.log('Error opening URL:', error);
      }
    }
  };

  const handleClearDataPress = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    const favCount = getFavoritesCount();
    
    if (Platform.OS === 'web') {
      if (confirm(`This will clear all favorites (${favCount}) and reading history. This action cannot be undone. Continue?`)) {
        handleClearData();
      }
    } else {
      Alert.alert(
        'Clear All Data',
        `This will clear all favorites (${favCount}) and reading history. This action cannot be undone.`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Clear Data',
            style: 'destructive',
            onPress: handleClearData,
          },
        ]
      );
    }
  };

  const handleClearData = async () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    try {
      await Promise.all([
        clearAllFavorites(),
        clearHistory(),
      ]);
      
      try {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } catch (error) {
        if (__DEV__) {
          console.log('Haptics error:', error);
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error clearing data:', error);
      }
    }
  };

  const appVersion = Constants.expoConfig?.version || '1.0.0';
  const favoritesCount = getFavoritesCount();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* APPEARANCE SECTION */}
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.delay(0).springify()}
          >
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="palette"
                size={18}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                APPEARANCE
              </Text>
            </View>
            
            {/* Theme Toggle Card */}
            <SettingCard delay={50} colors={colors} shadows={shadows}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: colors.primary + '20' },
                    ]}
                  >
                    <MaterialIcons
                      name={isDark ? 'dark-mode' : 'light-mode'}
                      size={22}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>
                      Dark Mode
                    </Text>
                    <Text style={[styles.settingSubtext, { color: colors.textSecondary }]}>
                      {isDark ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
                
                <AnimatedSwitch
                  value={isDark}
                  onValueChange={handleThemeToggle}
                  colors={colors}
                />
              </View>
            </SettingCard>
          </Animated.View>

          {/* TEXT SIZE SECTION */}
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.delay(100).springify()}
          >
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="format-size"
                size={18}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                TEXT SIZE
              </Text>
            </View>
            
            <SettingCard delay={150} colors={colors} shadows={shadows}>
              <View style={styles.textSizeGrid}>
                {TEXT_SIZE_OPTIONS.map((option, index) => {
                  const isSelected = textSize === option.value;
                  const sizeMultiplier = ['small', 'default', 'large', 'extra-large'].indexOf(option.value) * 0.15 + 0.85;
                  
                  return (
                    <TextSizeButton
                      key={option.value}
                      option={option}
                      isSelected={isSelected}
                      sizeMultiplier={sizeMultiplier}
                      colors={colors}
                      isDark={isDark}
                      onPress={() => handleTextSizeChange(option.value)}
                    />
                  );
                })}
              </View>
              
              <View style={[styles.previewContainer, { borderTopColor: colors.secondary + '30' }]}>
                <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>
                  Preview:
                </Text>
                <Text
                  style={[
                    styles.previewText,
                    {
                      color: colors.text,
                      fontSize: 16 * (textSize === 'small' ? 0.85 : textSize === 'large' ? 1.15 : textSize === 'extra-large' ? 1.3 : 1.0),
                    },
                  ]}
                >
                  The quick brown fox jumps over the lazy dog
                </Text>
              </View>
            </SettingCard>
          </Animated.View>

          {/* DATA & PRIVACY SECTION */}
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.delay(200).springify()}
          >
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="storage"
                size={18}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                DATA & PRIVACY
              </Text>
            </View>
            
            <SettingCard delay={250} colors={colors} shadows={shadows}>
              {/* Favorites Count */}
              <View style={styles.dataRow}>
                <View style={styles.dataLeft}>
                  <MaterialIcons
                    name="star"
                    size={20}
                    color={colors.primary}
                  />
                  <Text style={[styles.dataLabel, { color: colors.text }]}>
                    Favorites
                  </Text>
                </View>
                <Text style={[styles.dataValue, { color: colors.textSecondary }]}>
                  {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
                </Text>
              </View>

              {/* Clear Data Button */}
              <TouchableOpacity
                onPress={handleClearDataPress}
                style={[
                  styles.clearButton,
                  {
                    backgroundColor: colors.accent + '15',
                    borderColor: colors.accent + '40',
                  },
                ]}
                activeOpacity={0.7}
                accessibilityLabel="Clear all app data"
                accessibilityRole="button"
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={colors.accent}
                />
                <Text style={[styles.clearButtonText, { color: colors.accent }]}>
                  Clear All Data
                </Text>
              </TouchableOpacity>
            </SettingCard>
          </Animated.View>

          {/* RESOURCES SECTION */}
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.delay(300).springify()}
          >
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="link"
                size={18}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                RESOURCES
              </Text>
            </View>
            
            <LinkCard
              delay={350}
              icon="public"
              title="Companion Website"
              subtitle="thehumanconservative.com"
              onPress={handleOpenWebsite}
              colors={colors}
              shadows={shadows}
            />
          </Animated.View>

          {/* ABOUT SECTION */}
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.delay(400).springify()}
          >
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="info-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                ABOUT
              </Text>
            </View>
            
            <SettingCard delay={450} colors={colors} shadows={shadows}>
              {/* App Description */}
              <Animated.View 
                style={styles.aboutHeader}
                entering={ZoomIn.delay(500).springify()}
              >
                <LinearGradient
                  colors={[
                    colors.primary + '25',
                    colors.highlight,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.appIconContainer}
                >
                  <MaterialIcons
                    name="flag"
                    size={32}
                    color={colors.primary}
                  />
                </LinearGradient>
                <Text style={[styles.appName, { color: colors.text }]}>
                  Pocket Guide to America
                </Text>
              </Animated.View>

              <Text style={[styles.aboutBlurb, { color: colors.textSecondary }]}>
                Your civic companion for understanding how the United States works. Explore founding documents, core principles, key eras of history, and practical tools for better citizenship.
              </Text>

              {/* Info Rows */}
              <View style={styles.infoRows}>
                <View style={[styles.infoRow, { borderTopColor: colors.secondary + '20' }]}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    Version
                  </Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {appVersion}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleOpenDeveloperSite}
                  style={[styles.infoRow, { borderTopColor: colors.secondary + '20' }]}
                  activeOpacity={0.7}
                  accessibilityLabel="Open StormLight Foundry website"
                  accessibilityRole="button"
                >
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    Developer
                  </Text>
                  <View style={styles.developerLink}>
                    <Text style={[styles.infoValue, { color: colors.primary }]}>
                      StormLight Foundry
                    </Text>
                    <MaterialIcons
                      name="arrow-forward"
                      size={16}
                      color={colors.primary}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleOpenPrivacyPolicy}
                  style={[styles.infoRow, { borderTopColor: colors.secondary + '20' }]}
                  activeOpacity={0.7}
                  accessibilityLabel="Open Privacy Policy"
                  accessibilityRole="button"
                >
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    Privacy Policy
                  </Text>
                  <View style={styles.developerLink}>
                    <MaterialIcons
                      name="arrow-forward"
                      size={16}
                      color={colors.primary}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleOpenChangelog}
                  style={[styles.infoRow, { borderTopColor: colors.secondary + '20' }]}
                  activeOpacity={0.7}
                  accessibilityLabel="Open Changelog"
                  accessibilityRole="button"
                >
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    Changelog
                  </Text>
                  <View style={styles.developerLink}>
                    <MaterialIcons
                      name="arrow-forward"
                      size={16}
                      color={colors.primary}
                    />
                  </View>
                </TouchableOpacity>

                <View style={[styles.infoRow, { borderTopColor: colors.secondary + '20' }]}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                    Copyright
                  </Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    © 2025 StormLight Foundry
                  </Text>
                </View>
              </View>
            </SettingCard>
          </Animated.View>

          {/* Footer Spacing */}
          <View style={styles.footerSpacer} />
        </ScrollView>
      </View>
    </>
  );
}

/**
 * Animated Setting Card Component
 */
function SettingCard({ children, delay = 0, colors, shadows }: { children: React.ReactNode; delay?: number; colors: any; shadows: any }) {
  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          ...shadows.medium,
        },
      ]}
      entering={FadeInDown.delay(delay).springify()}
    >
      <LinearGradient
        colors={[
          colors.primary + '20',
          colors.primary + '10',
          colors.primary + '00',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      />
      {children}
    </Animated.View>
  );
}

/**
 * Animated Switch Component
 */
function AnimatedSwitch({ value, onValueChange, colors }: any) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { damping: 12 }),
      withSpring(1, { damping: 12 })
    );
    onValueChange();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Switch
        value={value}
        onValueChange={handlePress}
        trackColor={{
          false: colors.secondary + '50',
          true: colors.primary + 'CC',
        }}
        thumbColor={value ? colors.primary : colors.textSecondary}
        ios_backgroundColor={colors.secondary + '50'}
      />
    </Animated.View>
  );
}

/**
 * Text Size Button Component with animations
 */
function TextSizeButton({ option, isSelected, sizeMultiplier, colors, isDark, onPress }: any) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.textSizeButtonWrapper}
      accessibilityLabel={`Set text size to ${option.label}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Animated.View
        style={[
          styles.textSizeButton,
          {
            backgroundColor: isSelected ? colors.primary : colors.highlight,
            borderColor: isSelected ? colors.primary : colors.secondary + '40',
          },
          animatedStyle,
        ]}
      >
        {isSelected && (
          <LinearGradient
            colors={[
              colors.primary,
              colors.goldGradientEnd,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}
        <Text
          style={[
            styles.textSizeIcon,
            {
              fontSize: 18 * sizeMultiplier,
              color: isSelected ? (isDark ? colors.background : '#FFFFFF') : colors.text,
            },
          ]}
        >
          {option.icon}
        </Text>
        <Text
          style={[
            styles.textSizeLabel,
            {
              color: isSelected ? (isDark ? colors.background : '#FFFFFF') : colors.text,
            },
          ]}
        >
          {option.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

/**
 * Link Card Component with animations
 */
function LinkCard({ delay, icon, title, subtitle, onPress, colors, shadows }: any) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityLabel={`Open ${title}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.card,
          styles.linkCard,
          {
            backgroundColor: colors.card,
            ...shadows.medium,
          },
          animatedStyle,
        ]}
        entering={FadeInDown.delay(delay).springify()}
      >
        <LinearGradient
          colors={[
            colors.primary + '20',
            colors.primary + '10',
            colors.primary + '00',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        />
        
        <View style={styles.linkContent}>
          <View style={styles.linkLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.primary + '20' },
              ]}
            >
              <MaterialIcons
                name={icon}
                size={22}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={[styles.linkTitle, { color: colors.text }]}>
                {title}
              </Text>
              <Text style={[styles.linkSubtitle, { color: colors.textSecondary }]}>
                {subtitle}
              </Text>
            </View>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={colors.textSecondary}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  settingSubtext: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  textSizeGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  textSizeButtonWrapper: {
    flex: 1,
  },
  textSizeButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  textSizeIcon: {
    fontWeight: '700',
  },
  textSizeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  previewContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 8,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  previewText: {
    lineHeight: 24,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  dataLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dataLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  linkCard: {
    paddingVertical: 16,
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  aboutHeader: {
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  appIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  aboutBlurb: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRows: {
    gap: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  developerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerSpacer: {
    height: 20,
  },
});
