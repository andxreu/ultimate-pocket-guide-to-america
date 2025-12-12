import React from "react";
import * as Haptics from "expo-haptics";
import { 
  Pressable, 
  StyleSheet, 
  View, 
  Text,
  Platform,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  configureReanimatedLogger,
  FadeIn,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Reanimated from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/contexts/ThemeContext";

configureReanimatedLogger({ strict: false });

/**
 * ListItem Component
 * Swipeable list item with delete action
 */
export default function ListItem({ listId }: { listId: string }) {
  const { colors, isDark } = useTheme();
  
  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + 200 }],
    }));
    
    return (
      <Pressable
        onPress={() => {
          if (Platform.OS !== 'web') {
            try {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            } catch (error) {
              if (__DEV__) {
                console.log('Haptics error:', error);
              }
            }
          }
          console.log("delete");
        }}
      >
        <Reanimated.View style={[styleAnimation, styles.rightAction]}>
          <MaterialIcons name="delete" size={24} color="white" />
        </Reanimated.View>
      </Pressable>
    );
  };
  
  return (
    <Animated.View entering={FadeIn}>
      <ReanimatedSwipeable
        key={listId}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        overshootRight={false}
      >
        <View 
          style={[
            styles.listItemContainer,
            {
              borderBottomColor: colors.secondary + '40',
              backgroundColor: colors.card,
            }
          ]}
        >
          <Text 
            style={[
              styles.listItemText, 
              { color: colors.text }
            ]}
          >
            {listId}
          </Text>
        </View>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}

/**
 * NicknameCircle Component
 * Displays initials in a colored circle
 */
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
  const { isDark } = useTheme();
  
  return (
    <Text
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          backgroundColor: color,
          borderColor: isDark ? "#000000" : "#ffffff",
          marginLeft: index > 0 ? -6 : 0,
        },
      ]}
    >
      {isEllipsis ? "..." : nickname[0].toUpperCase()}
    </Text>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightAction: {
    width: 200,
    height: 65,
    backgroundColor: '#DC2626',
    alignItems: "center",
    justifyContent: "center",
  },
  nicknameCircle: {
    fontSize: 12,
    color: "white",
    borderWidth: 1,
    borderRadius: 16,
    padding: 1,
    width: 24,
    height: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  ellipsisCircle: {
    lineHeight: 0,
    marginLeft: -6,
  },
});