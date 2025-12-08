// app/(tabs)/_layout.tsx
import React, { useState, useCallback } from "react";
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
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

const menuItems = [
  { label: "Home", route: "/(tabs)/(home)" },
  { label: "Foundations", route: "/(tabs)/foundations" },
  { label: "Civic Literacy", route: "/(tabs)/civic-literacy" },
  { label: "Political Landscape", route: "/(tabs)/political-landscape" },
  { label: "Principles in Practice", route: "/(tabs)/principles-practice" },
  { label: "Land and Life", route: "/(tabs)/land-life" },
  { label: "Map", route: "/(tabs)/map" },
  { label: "Quiz", route: "/(tabs)/quiz" },
  { label: "Search", route: "/(tabs)/search" },
  { label: "Glossary", route: "/(tabs)/glossary" },
  { label: "Favorites", route: "/(tabs)/favorites" },
] as const;

function HamburgerButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={20} activeOpacity={0.7}>
      <IconSymbol ios_icon_name="line.3.horizontal" android_material_icon_name="menu" size={28} color="#FFFFFF" />
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
  const { colors, isDark } = useTheme();
  const pathname = usePathname();

  const translateX = useSharedValue(-320);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  React.useEffect(() => {
    translateX.value = withSpring(visible ? 0 : -320, { damping: 20, stiffness: 180 });
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.menuContainer, animatedStyle]}>
          <BlurView intensity={isDark ? 100 : 120} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
          <Pressable style={styles.menuInner} onPress={(e) => e.stopPropagation()}>
            <View style={[styles.header, { borderBottomColor: colors.primary + "30" }]}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Menu</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                <IconSymbol ios_icon_name="xmark" android_material_icon_name="close" size={26} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.route);
                return (
                  <TouchableOpacity
                    key={item.route}
                    style={[
                      styles.menuItem,
                      isActive && { backgroundColor: colors.primary + "15" },
                    ]}
                    onPress={() => {
                      Haptics.selectionAsync();
                      onNavigate(item.route);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.menuItemText,
                        { color: isActive ? colors.primary : colors.text },
                        isActive && { fontWeight: "700" },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isActive && (
                      <IconSymbol ios_icon_name="checkmark" android_material_icon_name="check" size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

export default function TabLayout() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();

  const open = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    Haptics.selectionAsync();
    setVisible(false);
  }, []);

  const navigate = useCallback(
    (route: string) => {
      close();
      router.push(route as any);
    },
    [router, close]
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerLeft: () => <HamburgerButton onPress={open} />,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false,
        }}
      >
        {menuItems.map((i) => (
          <Stack.Screen
            key={i.route}
            name={i.route.replace("/(tabs)/", "")}
            options={{ title: i.label }}
          />
        ))}
      </Stack>

      <HamburgerMenu visible={visible} onClose={close} onNavigate={navigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-start",
  },
  menuContainer: {
    width: 320,
    height: "100%",
    backgroundColor: "transparent",
  },
  menuInner: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 48 : 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1.5,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 10,
    borderRadius: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "600",
  },
});