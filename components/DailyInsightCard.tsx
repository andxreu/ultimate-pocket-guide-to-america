
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { getInsightOfTheDay, getRandomInsight, DailyInsight } from '@/data/insightsData';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function DailyInsightCard() {
  const { colors, shadows } = useTheme();
  const [insight, setInsight] = useState<DailyInsight>(() => getInsightOfTheDay());
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    setInsight(getRandomInsight());
    setKey(prev => prev + 1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.primary + '30',
          ...shadows.medium,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.highlight },
            ]}
          >
            <IconSymbol
              ios_icon_name="lightbulb.fill"
              android_material_icon_name="lightbulb"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Daily American Insight
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleRefresh}
          style={[
            styles.refreshButton,
            { backgroundColor: colors.highlight },
          ]}
          accessibilityLabel="Get a new insight"
          accessibilityRole="button"
        >
          <IconSymbol
            ios_icon_name="arrow.clockwise"
            android_material_icon_name="refresh"
            size={18}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Animated.View
        key={key}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
      >
        <Text style={[styles.insightText, { color: colors.text }]}>
          {insight.text}
        </Text>
      </Animated.View>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 21.75,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 12,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
