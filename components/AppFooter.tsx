import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface AppFooterProps {
  /**
   * Custom height override for the footer spacing
   * Default: 100 on iOS, 120 on Android
   */
  height?: number;
}

/**
 * AppFooter Component
 * Provides bottom spacing for ScrollView content to clear the floating tab bar
 * 
 * Usage:
 * ```tsx
 * <ScrollView>
 *   <YourContent />
 *   <AppFooter />
 * </ScrollView>
 * ```
 * 
 * @param height - Optional custom height override (default: 100 on iOS, 120 on Android)
 */
export function AppFooter({ height }: AppFooterProps = {}) {
  const footerHeight = height ?? (Platform.OS === 'android' ? 120 : 100);
  
  return <View style={[styles.footer, { height: footerHeight }]} />;
}

const styles = StyleSheet.create({
  footer: {
    // Height is applied via inline style for flexibility
    // Provides clearance for floating tab bar
  },
});