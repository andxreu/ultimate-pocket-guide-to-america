// components/IconSymbol.tsx
import React, { memo } from "react";
import {
  Image,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import * as Haptics from "expo-haptics";

// Master icon map — every icon in your app, perfectly organized
const ICONS = {
  // Main navigation
  home: "https://thehumanconservative.com/wp-content/uploads/2025/11/home-tab1.png",
  book: "https://thehumanconservative.com/wp-content/uploads/2025/11/foundations-tab1.png",
  school: "https://thehumanconservative.com/wp-content/uploads/2025/11/Civic-Literacy1.png",
  flag: "https://thehumanconservative.com/wp-content/uploads/2025/11/Political-Landscape1.png",
  balance: "https://thehumanconservative.com/wp-content/uploads/2025/11/Principles-in-Practice1.png",
  public: "https://thehumanconservative.com/wp-content/uploads/2025/11/Public1.png",
  globe: "https://thehumanconservative.com/wp-content/uploads/2025/11/map1.png",

  // Quick access
  map: "https://thehumanconservative.com/wp-content/uploads/2025/11/map1.png",
  quiz: "https://thehumanconservative.com/wp-content/uploads/2025/11/quiz_help1.png",
  search: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",
  menu_book: "https://thehumanconservative.com/wp-content/uploads/2025/11/Glossary1.png",
  star: "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-selected1.png",
  star_border: "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-unselected1.png",

  // Theme
  light_mode: "https://thehumanconservative.com/wp-content/uploads/2025/11/light-mode-on1.png",
  dark_mode: "https://thehumanconservative.com/wp-content/uploads/2025/11/Dark-mode-on1.png",

  // Navigation
  menu: "https://thehumanconservative.com/wp-content/uploads/2025/11/menu1.png",
  line_3_horizontal: "https://thehumanconservative.com/wp-content/uploads/2025/11/menu1.png",
  chevron_left: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-left1.png",
  chevron_right: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-right1.png",
  arrow_forward: "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",

  // Controls
  close: "https://thehumanconservative.com/wp-content/uploads/2025/11/close1.png",
  xmark: "https://thehumanconservative.com/wp-content/uploads/2025/11/close1.png",
  cancel: "https://thehumanconservative.com/wp-content/uploads/2025/11/Cancel1.png",
  refresh: "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",

  // Feedback
  check_circle: "https://thehumanconservative.com/wp-content/uploads/2025/11/Check-circle1.png",
  error: "https://thehumanconservative.com/wp-content/uploads/2025/11/Error1.png",
  delete: "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  trash: "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  "trash.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",

  // Document & Misc
  description: "https://thehumanconservative.com/wp-content/uploads/2025/11/Description1.png",
  history: "https://thehumanconservative.com/wp-content/uploads/2025/11/History1.png",
  settings: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  add: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  plus: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  search_off: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",

  // Additional common icons
  share: "https://thehumanconservative.com/wp-content/uploads/2025/11/share1.png",
  volume_up: "https://thehumanconservative.com/wp-content/uploads/2025/11/volume-up1.png",
  ellipsis: "https://thehumanconservative.com/wp-content/uploads/2025/11/more1.png",
} as const;

type IconKey = keyof typeof ICONS;

interface IconSymbolProps {
  ios_icon_name?: string;
  android_material_icon_name?: string;
  name?: IconKey | string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const IconSymbol = memo(function IconSymbol({
  ios_icon_name,
  android_material_icon_name,
  name,
  size = 28,
  style,
  onPress,
  accessibilityLabel,
}: IconSymbolProps) {
  const { colors } = useTheme();

  const key = (android_material_icon_name || name || ios_icon_name || "") as IconKey;
  const uri = ICONS[key];

  if (!uri) {
    if (__DEV__) console.warn(`IconSymbol: Missing icon "${key}"`);
    return <View style={[{ width: size, height: size }, style]} />;
  }

  const image = (
    <Image
      source={{ uri }}
      style={[
        {
          width: size,
          height: size,
          resizeMode: "contain",
        },
        style,
      ]}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        onPress={() => {
          Haptics.selectionAsync();
          onPress();
        }}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `Button ${key}`}
      >
        {image}
      </TouchableOpacity>
    );
  }

  return image;
});

IconSymbol.displayName = "IconSymbol";

export { IconSymbol };