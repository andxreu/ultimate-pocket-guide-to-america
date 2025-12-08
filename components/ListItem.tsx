// components/ListItem.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  useAnimatedStyle,
  SharedValue,
  withSpring,
  FadeIn,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "./IconSymbol";

interface ListItemProps {
  listId: string;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export default function ListItem({
  listId,
  onDelete,
  children,
}: ListItemProps) {
  const { colors, isDark } = useTheme();

  const RightActions = (
    progress: SharedValue<number>,
    dragX: SharedValue<number>
  ) => {
    const style = useAnimatedStyle(() => ({
      transform: [{ translateX: dragX.value + 100 }],
    }));

    const handleDelete = () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      onDelete?.();
    };

    return (
      <Animated.View style={[style, styles.rightAction]}>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteButton}
          activeOpacity={0.9}
        >
          <IconSymbol
            ios_icon_name="trash.fill"
            android_material_icon_name="delete_forever"
            size={28}
            color="#FFFFFF"
          />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <ReanimatedSwipeable
        friction={2}
        overshootFriction={8}
        rightThreshold={40}
        renderRightActions={RightActions}
        containerStyle={[
          styles.container,
          { backgroundColor: colors.card, borderBottomColor: colors.primary + "15" },
        ]}
      >
        <View style={styles.content}>
          {children || (
            <Text style={[styles.text, { color: colors.text }]}>{listId}</Text>
          )}
        </View>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}

export const NicknameCircle = ({
  nickname,
  color,
  index = 0,
  isEllipsis = false,
}: {
  nickname: string;
  color: string;
  index?: number;
  isEllipsis?: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          backgroundColor: color,
          borderColor: colors.background,
          marginLeft: index > 0 ? -8 : 0,
        },
      ]}
    >
      <Text style={styles.nicknameText}>
        {isEllipsis ? "..." : nickname[0].toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    padding: 18,
    paddingRight: 24,
    minHeight: 64,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 120,
    justifyContent: "center",
  },
  deleteText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  nicknameCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  nicknameText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  ellipsisCircle: {
    marginLeft: -12,
    zIndex: -1,
  },
});