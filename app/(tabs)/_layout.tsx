import React, { useState, useCallback, useMemo } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import FloatingTabBar from "@/components/FloatingTabBar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, SlideInLeft } from "react-native-reanimated";

/**
 * Menu configuration - centralized for easy maintenance
 */
const menuItems = [
  { label: "Home", route: "/(tabs)/(home)" },
  { label: "Foundations", route: "/(tabs)/foundations" },
  { label: "Civic Literacy", route: "/(tabs)/civic-literacy" },
  { label: "Political Landscape", route: "/(tabs)/political-landscape" },
  { label: "Principles in Practice", route: "/(tabs)/principles-practice" },
  { label: "Land and Life", route: "/(tabs)/land-life" },
  { label: "History", route: "/(tabs)/history" },
  { label: "Map", route: "/(tabs)/map" },
  { label: "Quiz", route: "/(tabs)/quiz" },
  { label: "Search", route: "/(tabs)/search" },
  { label: "Glossary", route: "/(tabs)/glossary" },
  { label: "Favorites", route: "/(tabs)/favorites" },
  { label: "Settings", route: "/(tabs)/settings" },
] as const;

/**
 * Floating tab bar configuration - bottom navigation tabs
 * Routes match the actual file structure
 */
const floatingTabBarTabs = [
  {
    name: "home",
    route: "/(tabs)/(home)" as any,
    icon: "home" as keyof typeof MaterialIcons.glyphMap,
    iosIcon: "house.fill",
    label: "Home",
  },
  {
    name: "favorites",
    route: "/(tabs)/favorites" as any,
    icon: "star" as keyof typeof MaterialIcons.glyphMap,
    iosIcon: "star.fill",
    label: "Favorites",
  },
  {
    name: "search",
    route: "/(tabs)/search" as any,
    icon: "search" as keyof typeof MaterialIcons.glyphMap,
    iosIcon: "magnifyingglass",
    label: "Search",
  },
  {
    name: "glossary",
    route: "/(tabs)/glossary" as any,
    icon: "book" as keyof typeof MaterialIcons.glyphMap,
    iosIcon: "book.fill",
    label: "Glossary",
  },
  {
    name: "settings",
    route: "/(tabs)/settings" as any,
    icon: "settings" as keyof typeof MaterialIcons.glyphMap,
    iosIcon: "gear",
    label: "Settings",
  },
] as const;

/**
 * Hamburger menu button component
 * Displays three-line icon in header for opening navigation menu
 */
function HamburgerButton({ onPress }: { onPress: () => void }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityLabel="Open navigation menu"
      accessibilityRole="button"
      accessibilityHint="Opens the main navigation menu"
      activeOpacity={0.6}
      style={styles.hamburgerButton}
    >
      <MaterialIcons name="menu" size={28} color={colors.text} />
    </TouchableOpacity>
  );
}

/**
 * Hamburger menu drawer component
 * Slide-out navigation menu with smooth animations
 */
function HamburgerMenu({
  visible,
  onClose,
  onNavigate,
}: {
  visible: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}) {
  const { colors: themeColors, shadows, isDark } = useTheme();
  const pathname = usePathname();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Animated.View 
          entering={SlideInLeft.duration(300).damping(20)}
          style={styles.menuWrapper}
        >
          <Pressable
            style={[
              styles.menuContainer,
              {
                backgroundColor: themeColors.background,
                ...shadows.large,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View
              style={[
                styles.menuHeader,
                { 
                  borderBottomColor: themeColors.secondary + '30',
                  backgroundColor: themeColors.card,
                },
              ]}
            >
              <Text
                style={[
                  styles.menuTitle,
                  {
                    color: themeColors.text,
                  },
                ]}
              >
                Navigation
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                activeOpacity={0.6}
                accessibilityLabel="Close navigation menu"
                accessibilityRole="button"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconSymbol
                  ios_icon_name="xmark"
                  android_material_icon_name="close"
                  size={24}
                  color={themeColors.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <ScrollView
              style={styles.menuScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuScrollContent}
            >
              {menuItems.map((item, index) => {
                const isActive = pathname.includes(
                  item.route.replace("/(tabs)", "")
                );

                return (
                  <Animated.View
                    key={`menu-item-${index}`}
                    entering={FadeIn.delay(50 + index * 30)}
                  >
                    <TouchableOpacity
                      style={[
                        styles.menuItem,
                        { borderBottomColor: themeColors.secondary + "15" },
                        isActive && { 
                          backgroundColor: themeColors.primary + '10',
                          borderLeftWidth: 4,
                          borderLeftColor: themeColors.primary,
                        },
                      ]}
                      onPress={() => onNavigate(item.route)}
                      activeOpacity={0.7}
                      accessibilityLabel={`Navigate to ${item.label}`}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                    >
                      <Text
                        style={[
                          styles.menuItemText,
                          { color: themeColors.text },
                          isActive && {
                            color: themeColors.primary,
                            fontWeight: "700",
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {isActive && (
                        <View style={styles.activeIndicator}>
                          <IconSymbol
                            ios_icon_name="chevron.right"
                            android_material_icon_name="chevron_right"
                            size={20}
                            color={themeColors.primary}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

/**
 * Main tab layout component
 * Manages navigation stack, hamburger menu, and floating tab bar
 */
export default function TabLayout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { colors: themeColors, isDark } = useTheme();
  const router = useRouter();

  /**
   * Open menu with haptic feedback
   */
  const openMenu = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log("Haptics error:", error);
      }
    }
    setIsMenuVisible(true);
  }, []);

  /**
   * Close menu with haptic feedback
   */
  const closeMenu = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log("Haptics error:", error);
      }
    }
    setIsMenuVisible(false);
  }, []);

  /**
   * Navigate to a specific route with haptic feedback
   */
  const navigateTo = useCallback((route: string) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      if (__DEV__) {
        console.log("Haptics error:", error);
      }
    }
    setIsMenuVisible(false);
    // Small delay to let menu close smoothly
    setTimeout(() => {
      router.push(route as any);
    }, 100);
  }, [router]);

  /**
   * Memoized screen options for better performance
   */
  const screenOptions = useMemo(() => ({
    headerShown: true,
    headerLeft: () => <HamburgerButton onPress={openMenu} />,
    headerTitleAlign: "center" as const,
    headerStyle: {
      backgroundColor: themeColors.card,
    },
    headerTintColor: themeColors.text,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: '700' as const,
      fontSize: 18,
      letterSpacing: 0.3,
      color: themeColors.text,
    },
  }), [themeColors, openMenu]);

  return (
    <View style={styles.container}>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen
          name="(home)"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="foundations"
          options={{
            title: "Foundations",
          }}
        />
        <Stack.Screen
          name="civic-literacy"
          options={{
            title: "Civic Literacy",
          }}
        />
        <Stack.Screen
          name="political-landscape"
          options={{
            title: "Political Landscape",
          }}
        />
        <Stack.Screen
          name="principles-practice"
          options={{
            title: "Principles in Practice",
          }}
        />
        <Stack.Screen
          name="land-life"
          options={{
            title: "Land and Life",
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            title: "History",
          }}
        />
        <Stack.Screen
          name="map"
          options={{
            title: "Map",
          }}
        />
        <Stack.Screen
          name="quiz"
          options={{
            title: "Quiz",
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: "Search",
          }}
        />
        <Stack.Screen
          name="glossary"
          options={{
            title: "Glossary",
          }}
        />
        <Stack.Screen
          name="favorites"
          options={{
            title: "Favorites",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />
      </Stack>

      <HamburgerMenu
        visible={isMenuVisible}
        onClose={closeMenu}
        onNavigate={navigateTo}
      />

      <FloatingTabBar tabs={floatingTabBarTabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburgerButton: {
    padding: 4,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuWrapper: {
    height: "100%",
  },
  menuContainer: {
    width: 280,
    height: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 48 : 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  closeButton: {
    padding: 4,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  menuScrollView: {
    flex: 1,
  },
  menuScrollContent: {
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    minHeight: 56,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
    flex: 1,
  },
  activeIndicator: {
    marginLeft: 8,
  },
});