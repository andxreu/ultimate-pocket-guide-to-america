
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";

export function HeaderRightButton() {
  const theme = useTheme();

  return (
    <View style={styles.headerButtonContainer}>
      <IconSymbol
        ios_icon_name="plus"
        android_material_icon_name="add"
        color={theme.colors.primary}
        size={24}
        onPress={() =>
          Alert.alert(
            "Not Implemented",
            "This feature is not implemented yet"
          )
        }
      />
    </View>
  );
}

export function HeaderLeftButton() {
  const theme = useTheme();

  return (
    <View style={styles.headerButtonContainer}>
      <IconSymbol
        ios_icon_name="gear"
        android_material_icon_name="settings"
        color={theme.colors.primary}
        size={24}
        onPress={() =>
          Alert.alert(
            "Not Implemented",
            "This feature is not implemented yet"
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 8,
  },
});
