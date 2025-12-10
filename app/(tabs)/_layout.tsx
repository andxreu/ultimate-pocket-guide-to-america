
import React, { useState } from "react";
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
];

// ✅ FIX: Updated tab order to Home | Favorites | Search | Glossary | Settings
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
];

function HamburgerButton({ onPress }: { onPress: () => void }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={10}
      accessibilityLabel="Open menu"
      accessibilityRole="button"
      activeOpacity={0.7}
    >
      <MaterialIcons name="menu" size={28} color={colors.text} />
    </TouchableOpacity>
  );
}

function HamburgerMenu({
  visible,
  onClose,
  onNavigate,
}: {
  visible: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}) {
  const { colors: themeColors, shadows } = useTheme();
  const pathname = usePathname();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
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
          <View
            style={[
              styles.menuHeader,
              { borderBottomColor: themeColors.secondary },
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
              Menu
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
              accessibilityLabel="Close menu"
              accessibilityRole="button"
            >
              <IconSymbol
                ios_icon_name="xmark"
                android_material_icon_name="close"
                size={24}
                color={themeColors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.menuScrollView}
            showsVerticalScrollIndicator={false}
          >
            {menuItems.map((item, index) => {
              const isActive = pathname.includes(
                item.route.replace("/(tabs)", "")
              );

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    { borderBottomColor: themeColors.secondary + "40" },
                    isActive && { backgroundColor: themeColors.highlight },
                  ]}
                  onPress={() => onNavigate(item.route)}
                  activeOpacity={0.7}
                  accessibilityLabel={`Navigate to ${item.label}`}
                  accessibilityRole="button"
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
                    <IconSymbol
                      ios_icon_name="chevron.right"
                      android_material_icon_name="chevron_right"
                      size={20}
                      color={themeColors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function TabLayout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { colors: themeColors } = useTheme();
  const router = useRouter();

  const openMenu = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log("Haptics error:", error);
      }
    }
    setIsMenuVisible(true);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const navigateTo = (route: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      if (__DEV__) {
        console.log("Haptics error:", error);
      }
    }
    closeMenu();
    router.push(route as any);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerLeft: () => <HamburgerButton onPress={openMenu} />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: themeColors.background,
          },
          headerTintColor: themeColors.text,
          headerShadowVisible: true,
        }}
      >
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuContainer: {
    width: 280,
    height: "100%",
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
    fontSize: 24,
    fontWeight: "700",
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
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    minHeight: 44,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
