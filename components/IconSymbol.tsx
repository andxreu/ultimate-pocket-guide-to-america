
// components/IconSymbol.tsx
import React, { memo } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import * as Haptics from "expo-haptics";

// ──────────────────────────────────────────────────────────────────
// Master icon map
// ──────────────────────────────────────────────────────────────────
const ICONS = {
  home: "https://thehumanconservative.com/wp-content/uploads/2025/11/home-tab1.png",
  book: "https://thehumanconservative.com/wp-content/uploads/2025/11/foundations-tab1.png",
  school: "https://thehumanconservative.com/wp-content/uploads/2025/11/Civic-Literacy1.png",
  flag: "https://thehumanconservative.com/wp-content/uploads/2025/11/Political-Landscape1.png",
  balance: "https://thehumanconservative.com/wp-content/uploads/2025/11/Principles-in-Practice1.png",
  public: "https://thehumanconservative.com/wp-content/uploads/2025/11/Public1.png",
  globe: "https://thehumanconservative.com/wp-content/uploads/2025/11/map1.png",
  map: "https://thehumanconservative.com/wp-content/uploads/2025/11/map1.png",
  quiz: "https://thehumanconservative.com/wp-content/uploads/2025/11/quiz_help1.png",
  search: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",
  menu_book: "https://thehumanconservative.com/wp-content/uploads/2025/11/Glossary1.png",
  star: "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-selected1.png",
  star_border: "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-unselected1.png",
  light_mode: "https://thehumanconservative.com/wp-content/uploads/2025/11/light-mode-on1.png",
  dark_mode: "https://thehumanconservative.com/wp-content/uploads/2025/11/Dark-mode-on1.png",
  menu: "https://thehumanconservative.com/wp-content/uploads/2025/11/menu1.png",
  line_3_horizontal: "https://thehumanconservative.com/wp-content/uploads/2025/11/menu1.png",
  chevron_left: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-left1.png",
  chevron_right: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-right1.png",
  arrow_forward: "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",
  close: "https://thehumanconservative.com/wp-content/uploads/2025/11/close1.png",
  xmark: "https://thehumanconservative.com/wp-content/uploads/2025/11/close1.png",
  cancel: "https://thehumanconservative.com/wp-content/uploads/2025/11/Cancel1.png",
  refresh: "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",
  check_circle: "https://thehumanconservative.com/wp-content/uploads/2025/11/Check-circle1.png",
  error: "https://thehumanconservative.com/wp-content/uploads/2025/11/Error1.png",
  delete: "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  trash: "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  "trash.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  description: "https://thehumanconservative.com/wp-content/uploads/2025/11/Description1.png",
  history: "https://thehumanconservative.com/wp-content/uploads/2025/11/History1.png",
  settings: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  add: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  plus: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  search_off: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",
  share: "https://thehumanconservative.com/wp-content/uploads/2025/11/share1.png",
  volume_up: "https://thehumanconservative.com/wp-content/uploads/2025/11/volume-up1.png",
  ellipsis: "https://thehumanconservative.com/wp-content/uploads/2025/11/more1.png",
  magnifyingglass: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",
  "xmark.circle.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Cancel1.png",
  clock: "https://thehumanconservative.com/wp-content/uploads/2025/11/History1.png",
  "book.closed": "https://thehumanconservative.com/wp-content/uploads/2025/11/Glossary1.png",
  "arrow.right": "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",
  "chevron.left": "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-left1.png",
  "chevron.right": "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-right1.png",
  "doc.text.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Description1.png",
  "star.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-selected1.png",
  "checkmark.circle.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Check-circle1.png",
  "xmark.circle.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Cancel1.png",
  "arrow.clockwise": "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",
  arrow_back: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-left1.png",
  phone: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  "phone.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  "book.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/foundations-tab1.png",
  "graduationcap.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Civic-Literacy1.png",
  "flag.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Political-Landscape1.png",
  "scale.3d": "https://thehumanconservative.com/wp-content/uploads/2025/11/Principles-in-Practice1.png",
  "globe.americas.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Public1.png",
  "questionmark.circle": "https://thehumanconservative.com/wp-content/uploads/2025/11/quiz_help1.png",
  help: "https://thehumanconservative.com/wp-content/uploads/2025/11/quiz_help1.png",
} as const;

type IconKey = keyof typeof ICONS;

interface IconSymbolProps {
  ios_icon_name?: string;
  android_material_icon_name?: string;
  name?: IconKey | string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const IconSymbol = memo(function IconSymbol({
  ios_icon_name,
  android_material_icon_name,
  name,
  size = 28,
  color,
  style,
  onPress,
  accessibilityLabel,
}: IconSymbolProps) {
  const { colors: themeColors } = useTheme();

  const key = (android_material_icon_name || name || ios_icon_name || "") as IconKey;
  const uri = ICONS[key];

  // If icon is missing → show fallback
  if (!uri) {
    const fallbackStyle: ViewStyle = {
      width: size,
      height: size,
      backgroundColor: themeColors.card,
      borderRadius: size / 4,
      justifyContent: "center",
      alignItems: "center",
    };
    return <View style={[fallbackStyle, style]} />;
  }

  // Image style - note: color prop is ignored for images (tintColor would work but not universally supported)
  const imageStyle: ImageStyle = {
    width: size,
    height: size,
  };

  const image = (
    <Image
      source={{ uri }}
      style={[imageStyle, style]}
      resizeMode="contain"
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.72}
        hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        onPress={() => {
          try {
            Haptics.selectionAsync();
          } catch (error) {
            if (__DEV__) {
              console.log('Haptics error:', error);
            }
          }
          onPress();
        }}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `Icon ${key}`}
      >
        {image}
      </TouchableOpacity>
    );
  }

  return image;
});

IconSymbol.displayName = "IconSymbol";

export { IconSymbol };
