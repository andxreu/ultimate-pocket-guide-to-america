// components/BodyScrollView.tsx
import React, { forwardRef } from "react";
import { ScrollView, ScrollViewProps, Platform } from "react-native";

export const BodyScrollView = forwardRef<React.ComponentRef<typeof ScrollView>, ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollView
        ref={ref}
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        // iOS: proper safe-area handling
        contentInset={Platform.OS === "ios" ? { top: 0, bottom: 0 } : undefined}
        // Android: prevent indicator cutoff
        scrollIndicatorInsets={{ top: 0, right: 0, bottom: 0, left: 0 }}
        // Ensures footer stays visible on all devices
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...props}
        style={[props.style]}
      />
    );
  }
);

BodyScrollView.displayName = "BodyScrollView";