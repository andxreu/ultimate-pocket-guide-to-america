
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useReadingHistory } from '@/contexts/ReadingHistoryContext';
import { IconSymbol } from '@/components/IconSymbol';
import { getItemRoute } from '@/utils/findItemById';
import * as Haptics from 'expo-haptics';

export default function LastReadCard() {
  const { colors, shadows } = useTheme();
  const { lastReadItem } = useReadingHistory();
  const router = useRouter();

  if (!lastReadItem) {
    return null;
  }

  const handlePress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      const route = getItemRoute(lastReadItem.id);
      router.push(route as any);
    } catch (error) {
      if (__DEV__) {
        console.log('Error navigating to last read item:', error);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.primary + '30',
          ...shadows.medium,
        },
      ]}
      activeOpacity={0.8}
      accessibilityLabel={`Continue reading ${lastReadItem.title}`}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.highlight },
          ]}
        >
          <IconSymbol
            ios_icon_name="book.fill"
            android_material_icon_name="menu_book"
            size={20}
            color={colors.primary}
          />
        </View>
        <Text style={[styles.headerText, { color: colors.textSecondary }]}>
          Continue where you left off
        </Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        {lastReadItem.title}
      </Text>
      <Text style={[styles.section, { color: colors.textSecondary }]}>
        {lastReadItem.section}
      </Text>

      <View style={styles.footer}>
        <IconSymbol
          ios_icon_name="arrow.right"
          android_material_icon_name="arrow_forward"
          size={18}
          color={colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    lineHeight: 18.85,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 24.65,
  },
  section: {
    fontSize: 14,
    lineHeight: 20.3,
  },
  footer: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
});
