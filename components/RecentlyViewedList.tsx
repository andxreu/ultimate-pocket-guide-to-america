
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useReadingHistory } from '@/contexts/ReadingHistoryContext';
import { IconSymbol } from '@/components/IconSymbol';
import { getItemRoute } from '@/utils/findItemById';
import * as Haptics from 'expo-haptics';

export default function RecentlyViewedList() {
  const { colors, shadows } = useTheme();
  const { recentlyViewed } = useReadingHistory();
  const router = useRouter();

  if (recentlyViewed.length === 0) {
    return null;
  }

  const handleItemPress = (id: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      const route = getItemRoute(id);
      router.push(route as any);
    } catch (error) {
      if (__DEV__) {
        console.log('Error navigating to item:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol
          ios_icon_name="clock.fill"
          android_material_icon_name="history"
          size={20}
          color={colors.primary}
        />
        <Text style={[styles.headerText, { color: colors.text }]}>
          Recently Viewed
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recentlyViewed.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleItemPress(item.id)}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.primary + '20',
                ...shadows.small,
              },
            ]}
            activeOpacity={0.8}
            accessibilityLabel={`View ${item.title}`}
            accessibilityRole="button"
          >
            <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.cardSection, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.section}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 21.75,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 12,
  },
  card: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 21.75,
  },
  cardSection: {
    fontSize: 13,
    lineHeight: 18.85,
  },
});
