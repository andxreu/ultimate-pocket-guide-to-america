import { forwardRef } from "react";
import { ScrollView, ScrollViewProps, Platform } from "react-native";

/**
 * BodyScrollView Component
 * Enhanced ScrollView with automatic content inset adjustments and optimized defaults
 * 
 * Features:
 * - Automatic scroll indicator adjustments
 * - Hidden vertical scroll indicators for cleaner look
 * - Platform-specific optimizations
 * - Proper content inset behavior
 * - Keyboard handling
 * 
 * Usage:
 * ```tsx
 * <BodyScrollView>
 *   <YourContent />
 * </BodyScrollView>
 * ```
 * 
 * With ref:
 * ```tsx
 * const scrollRef = useRef<ScrollView>(null);
 * <BodyScrollView ref={scrollRef}>
 *   <YourContent />
 * </BodyScrollView>
 * ```
 */
export const BodyScrollView = forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollView
        // Automatic scroll indicator adjustments
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        
        // Content insets
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        
        // Hide scroll indicators for cleaner look
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        
        // Keyboard handling
        keyboardShouldPersistTaps="handled"
        
        // Performance optimizations
        removeClippedSubviews={Platform.OS === 'android'}
        
        // Allow prop overrides
        {...props}
        ref={ref}
      />
    );
  }
);

BodyScrollView.displayName = "BodyScrollView";