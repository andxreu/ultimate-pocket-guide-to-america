
// components/IconSymbol.tsx
// Unified image-based icon component using your THC icon pack.
// Works across web, iOS, and Android with the same API as before.

import React from "react";
import {
  Image,
  View,
  StyleProp,
  ViewStyle,
  OpaqueColorValue,
  TouchableOpacity,
} from "react-native";

type IconSymbolProps = {
  ios_icon_name?: string;                 // kept for compatibility, but not used for lookup
  android_material_icon_name?: string;    // primary key for icon mapping
  name?: string;                          // fallback key (used in ListItem "trash.fill")
  size?: number;
  color?: string | OpaqueColorValue;      // color prop (currently ignored for image icons)
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;                   // optional press handler
};

// All icons live here.
// Keys match android_material_icon_name (and a few semantic keys where helpful).
const ICON_IMAGE_URLS: Record<string, string> = {
  // Main tabs / sections
  home: "https://thehumanconservative.com/wp-content/uploads/2025/11/home-tab1.png",
  book: "https://thehumanconservative.com/wp-content/uploads/2025/11/foundations-tab1.png",
  school: "https://thehumanconservative.com/wp-content/uploads/2025/11/Civic-Literacy1.png",
  flag: "https://thehumanconservative.com/wp-content/uploads/2025/11/Political-Landscape1.png",
  balance: "https://thehumanconservative.com/wp-content/uploads/2025/11/Principles-in-Practice1.png",
  public: "https://thehumanconservative.com/wp-content/uploads/2025/11/Public1.png",

  // Quick access grid
  map: "https://thehumanconservative.com/wp-content/uploads/2025/11/map1.png",
  help: "https://thehumanconservative.com/wp-content/uploads/2025/11/quiz_help1.png",
  search: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",
  menu_book: "https://thehumanconservative.com/wp-content/uploads/2025/11/Glossary1.png",
  star: "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-selected1.png",
  star_border: "https://thehumanconservative.com/wp-content/uploads/2025/11/favorites-unselected1.png",
  lightbulb_outline: "https://thehumanconservative.com/wp-content/uploads/2025/11/light-mode-on1.png",

  // Theme variants (if you ever want to swap them manually)
  light_mode: "https://thehumanconservative.com/wp-content/uploads/2025/11/light-mode-on1.png",
  dark_mode: "https://thehumanconservative.com/wp-content/uploads/2025/11/Dark-mode-on1.png",

  // Navigation / arrows
  chevron_left: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-left1.png",
  chevron_right: "https://thehumanconservative.com/wp-content/uploads/2025/11/chevron-right1.png",
  arrow_forward: "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",

  // Controls
  close: "https://thehumanconservative.com/wp-content/uploads/2025/11/close1.png",
  cancel: "https://thehumanconservative.com/wp-content/uploads/2025/11/Cancel1.png",

  // Status / feedback
  check_circle: "https://thehumanconservative.com/wp-content/uploads/2025/11/Check-circle1.png",
  error: "https://thehumanconservative.com/wp-content/uploads/2025/11/Error1.png",
  delete: "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  history: "https://thehumanconservative.com/wp-content/uploads/2025/11/History1.png",
  description: "https://thehumanconservative.com/wp-content/uploads/2025/11/Description1.png",

  // Settings
  settings: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",

  // Fallbacks / special cases
  // "search_off" used in Search empty state → reuse Search icon for now
  search_off: "https://thehumanconservative.com/wp-content/uploads/2025/11/Search1.png",

  // If you later create a refresh icon, update this:
  refresh: "https://thehumanconservative.com/wp-content/uploads/2025/11/Arrow-forward1.png",

  // ListItem uses name="trash.fill" → route that to delete icon
  "trash.fill": "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  
  // Additional icon mappings for trash
  trash: "https://thehumanconservative.com/wp-content/uploads/2025/11/Delete1.png",
  
  // Additional icons
  add: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
  plus: "https://thehumanconservative.com/wp-content/uploads/2025/11/settings1.png",
};

export function IconSymbol(props: IconSymbolProps) {
  const {
    ios_icon_name,
    android_material_icon_name,
    name,
    size = 24,
    style,
    color, // Accept color prop but don't use it for now (images are pre-colored)
    onPress,
  } = props;

  // Priority: android_material_icon_name → name → ios_icon_name
  const key =
    (android_material_icon_name as string | undefined) ||
    (name as string | undefined) ||
    (ios_icon_name as string | undefined) ||
    "";

  const src = ICON_IMAGE_URLS[key];

  if (!src) {
    // Graceful fallback: keep layout but show nothing obvious
    console.log(`IconSymbol: No icon found for key "${key}"`);
    return <View style={[{ width: size, height: size }, style]} />;
  }

  const imageElement = (
    <Image
      source={{ uri: src }}
      style={[
        {
          width: size,
          height: size,
          resizeMode: "contain",
        },
        style,
      ]}
    />
  );

  // If onPress is provided, wrap in TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        hitSlop={10}
        accessibilityRole="button"
      >
        {imageElement}
      </TouchableOpacity>
    );
  }

  return imageElement;
}
