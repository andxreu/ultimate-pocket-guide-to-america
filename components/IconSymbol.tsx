// This file is a fallback for using MaterialIcons on Android and web.

import React from "react";
import {
  OpaqueColorValue,
  Platform,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";

/**
 * An icon component that uses MaterialIcons on all platforms for now.
 * On web, we special-case the chevron_right icon to avoid "?" fallbacks
 * in environments where icon fonts are flaky (like some preview tools).
 */
export function IconSymbol({
  ios_icon_name = undefined, // reserved for future SF Symbols use
  android_material_icon_name,
  size = 24,
  color,
  style,
}: {
  ios_icon_name?: string | undefined;
  android_material_icon_name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const isWebChevron =
    Platform.OS === "web" && android_material_icon_name === "chevron_right";

  // On web, replace the chevron icon with a simple text arrow so we never see "?"
  if (isWebChevron) {
    return (
      <Text
        style={[
          {
            fontSize: size,
            color: color,
            fontWeight: "600",
            paddingHorizontal: 2,
          },
          style as StyleProp<TextStyle>,
        ]}
      >
        ›
      </Text>
    );
  }

  // For everything else, use MaterialIcons normally
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={android_material_icon_name}
      style={style as StyleProp<TextStyle>}
    />
  );
}
