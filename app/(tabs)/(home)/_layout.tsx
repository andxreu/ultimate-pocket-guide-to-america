import React, { useState, useCallback } from "react";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import {
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/IconSymbol";
import Animated, { FadeIn, SlideInLeft } from "react-native-reanimated";

/**
 * IMPORTANT:
 * This Home layout previously implemented its own header + hamburger + drawer menu.
 * Your global app/(tabs)/_layout.tsx ALSO implements a header + hamburger + drawer menu.
 * That creates the "two hamburger menus" problem.
 *
 * Fix strategy:
 * - Keep this file intact (minimal surgery)
 * - Disable the nested header and nested drawer menu here by default
 * - Let app/(tabs)/_layout.tsx own the header/menu globally
 *
 * If you ever intentionally want a Home-only menu again, flip this flag to true,
 * BUT only if the global menu is removed/disabled (otherwise you'll get duplicates again).
 */
const ENABLE_HOME_LOCAL_MENU = false;

/**
 * Menu configuration
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
 * Hamburger menu drawer component
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
  const { colors, shadows } = useTheme();

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
          // Fix: SlideInLeft doesn't support .damping() unless springified.
          entering={SlideInLeft.springify().damping(20)}
          style={styles.menuWrapper}
        >
          <Pressable
            style={[
              styles.menuContainer,
              {
                backgroundColor: colors.background,
                ...(shadows?.large ?? {}),
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={[
                styles.menuHeader,
                {
                  borderBottomColor: colors.secondary + "30",
                  backgroundColor: colors.card,
                },
              ]}
            >
              <Text style={[styles.menuTitle, { color: colors.text }]}>
                Navigation
              </Text>

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconSymbol
                  ios_icon_name="xmark"
                  android_material_icon_name="close"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.menuScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuScrollContent}
            >
              {menuItems.map((item, index) => (
                <Animated.View
                  key={`menu-item-${index}`}
                  entering={FadeIn.delay(50 + index * 30)}
                >
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      { borderBottomColor: colors.secondary + "15" },
                    ]}
                    onPress={() => onNavigate(item.route)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.menuItemText, { color: colors.text }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

/**
 * Home Layout Component
 */
export default function HomeLayout() {
  const { colors } = useTheme();
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMenu = useCallback(() => {
    if (!ENABLE_HOME_LOCAL_MENU) return;

    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      // __DEV__ is global in RN; safe to keep guard light
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("Haptics error:", error);
      }
    }
    setIsMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!ENABLE_HOME_LOCAL_MENU) return;

    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("Haptics error:", error);
      }
    }
    setIsMenuVisible(false);
  }, []);

  const navigateTo = useCallback(
    (route: string) => {
      if (!ENABLE_HOME_LOCAL_MENU) return;

      try {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("Haptics error:", error);
        }
      }

      setIsMenuVisible(false);
      setTimeout(() => {
        router.push(route as any);
      }, 100);
    },
    [router]
  );

  return (
    <>
      <Stack
        screenOptions={{
          /**
           * KEY FIX:
           * Default: hide this nested header entirely so you don't get a second hamburger.
           * If you ever re-enable local Home menu, header/menu can come back together.
           */
          headerShown: ENABLE_HOME_LOCAL_MENU,

          headerLeft: () =>
            ENABLE_HOME_LOCAL_MENU ? (
              <TouchableOpacity
                onPress={openMenu}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={{ padding: 4, marginLeft: 8 }}
              >
                <MaterialIcons name="menu" size={28} color={colors.text} />
              </TouchableOpacity>
            ) : null,

          headerTitle: "Home",
          headerTitleAlign: "center",

          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,

          contentStyle: {
            backgroundColor: colors.background,
          },

          animation: "fade",
          animationDuration: 200,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            lazy: true,
          }}
        />
      </Stack>

      {ENABLE_HOME_LOCAL_MENU && (
        <HamburgerMenu
          visible={isMenuVisible}
          onClose={closeMenu}
          onNavigate={navigateTo}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    minHeight: 56,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
    flex: 1,
  },
});
