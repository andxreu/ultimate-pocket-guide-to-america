
import React, { useCallback } from "react";
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

// Suppress Reanimated logger warnings
configureReanimatedLogger({ strict: false });

interface ListItemProps {
  /**
   * Unique identifier for the list item
   */
  listId: string;
  /**
   * Optional delete handler
   */
  onDelete?: (id: string) => void;
  /**
   * Optional press handler
   */
  onPress?: (id: string) => void;
}

/**
 * ListItem Component
 * 
 * Swipeable list item with delete action and smooth animations.
 * 
 * Features:
 * - Swipe-to-delete with red background
 * - Haptic feedback on delete
 * - Theme-aware styling
 * - Fade-in entrance animation
 * - Optional press handler
 * 
 * @example
 * ```tsx
 * <ListItem 
 *   listId="item-1"
 *   onDelete={(id) => handleDelete(id)}
 *   onPress={(id) => handlePress(id)}
 * />
 * ```
 */
export default function ListItem({ 
  listId, 
  onDelete,
  onPress 
}: ListItemProps) {
  const { colors, shadows } = useTheme();
  
  /**
   * Handle delete with haptic feedback
   */
  const handleDelete = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    if (onDelete) {
      onDelete(listId);
    } else if (__DEV__) {
      console.log('Delete pressed for:', listId);
    }
  }, [listId, onDelete]);

  /**
   * Handle item press with haptic feedback
   */
  const handlePress = useCallback(() => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    if (onPress) {
      onPress(listId);
    }
  }, [listId, onPress]);
  
  /**
   * Render right swipe action (delete)
   * Note: RightAction is a render function, not a component
   */
  const RightAction = useCallback((
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    return <RightActionContent drag={drag} onDelete={handleDelete} />;
  }, [handleDelete]);
  
  return (
    <Animated.View entering={FadeIn.duration(400)}>
      <ReanimatedSwipeable
        key={listId}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        overshootRight={false}
      >
        <Pressable
          onPress={onPress ? handlePress : undefined}
          style={({ pressed }) => [
            styles.listItemContainer,
            {
              borderBottomColor: colors.secondary + '40',
              backgroundColor: pressed ? colors.highlight : colors.card,
              ...shadows.small,
            }
          ]}
          accessibilityLabel={`Item: ${listId}`}
          accessibilityRole={onPress ? "button" : undefined}
        >
          <Text 
            style={[
              styles.listItemText, 
              { color: colors.text }
            ]}
            numberOfLines={1}
          >
            {listId}
          </Text>
        </Pressable>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}

/**
 * Right Action Content Component
 * Separated to allow useAnimatedStyle to be called at component level
 */
function RightActionContent({ 
  drag, 
  onDelete 
}: { 
  drag: SharedValue<number>; 
  onDelete: () => void;
}) {
  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + 200 }],
  }));
  
  return (
    <Pressable
      onPress={onDelete}
      style={{ flex: 1 }}
      accessibilityLabel="Delete item"
      accessibilityRole="button"
    >
      <Reanimated.View style={[styleAnimation, styles.rightAction]}>
        <MaterialIcons name="delete" size={24} color="white" />
        <Text style={styles.deleteText}>Delete</Text>
      </Reanimated.View>
    </Pressable>
  );
}

interface NicknameCircleProps {
  /**
   * Nickname to display (first letter will be shown)
   */
  nickname: string;
  /**
   * Background color for the circle
   */
  color: string;
  /**
   * Index in the list (for overlap positioning)
   * @default 0
   */
  index?: number;
  /**
   * Show ellipsis instead of initial
   * @default false
   */
  isEllipsis?: boolean;
}

/**
 * NicknameCircle Component
 * 
 * Displays initials or ellipsis in a colored circle.
 * Useful for showing user avatars or item indicators.
 * 
 * Features:
 * - Shows first letter of nickname in uppercase
 * - Theme-aware border color
 * - Overlap support for multiple circles
 * - Ellipsis mode for overflow indicators
 * 
 * @example
 * ```tsx
 * <NicknameCircle nickname="John" color="#FF6B6B" />
 * 
 * <View style={{ flexDirection: 'row' }}>
 *   <NicknameCircle nickname="Alice" color="#4ECDC4" index={0} />
 *   <NicknameCircle nickname="Bob" color="#45B7D1" index={1} />
 *   <NicknameCircle nickname="" color="#96CEB4" index={2} isEllipsis />
 * </View>
 * ```
 */
export const NicknameCircle = ({
  nickname,
  color,
  index = 0,
  isEllipsis = false,
}: NicknameCircleProps) => {
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
          zIndex: 1000 - index, // Ensures proper stacking
        },
      ]}
      accessibilityLabel={isEllipsis ? "More users" : `User ${nickname}`}
    >
      {isEllipsis ? "..." : nickname[0]?.toUpperCase() || "?"}
    </Text>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 56,
    justifyContent: 'center',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  rightAction: {
    width: 200,
    backgroundColor: '#DC2626',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 4,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nicknameCircle: {
    fontSize: 12,
    color: "white",
    fontWeight: '700',
    borderWidth: 2,
    borderRadius: 16,
    width: 28,
    height: 28,
    textAlign: "center",
    lineHeight: Platform.select({ ios: 24, android: 26, default: 24 }),
    overflow: 'hidden',
  },
  ellipsisCircle: {
    lineHeight: Platform.select({ ios: 0, android: 2, default: 0 }),
  },
});
