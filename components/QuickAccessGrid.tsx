
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import * as Haptics from 'expo-haptics';

export default function QuickAccessGrid() {
  const { colors, toggleTheme } = useTheme();
  const router = useRouter();

  const handlePress = (action: string) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    switch (action) {
      case 'map':
        router.push('/(tabs)/map/');
        break;
      case 'quiz':
        router.push('/(tabs)/quiz/');
        break;
      case 'search':
        router.push('/(tabs)/search/');
        break;
      case 'glossary':
        router.push('/(tabs)/glossary/');
        break;
      case 'favorites':
        router.push('/(tabs)/favorites/');
        break;
      case 'theme':
        toggleTheme();
        break;
    }
  };

  const buttons = [
    {
      id: 'map',
      label: 'Map',
      iosIcon: 'map.fill',
      androidIcon: 'map',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      iosIcon: 'questionmark.circle.fill',
      androidIcon: 'help',
    },
    {
      id: 'search',
      label: 'Search',
      iosIcon: 'magnifyingglass',
      androidIcon: 'search',
    },
    {
      id: 'glossary',
      label: 'Glossary',
      iosIcon: 'book.fill',
      androidIcon: 'menu_book',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      iosIcon: 'star.fill',
      androidIcon: 'star',
    },
    {
      id: 'theme',
      label: 'Light / Dark',
      iosIcon: 'lightbulb',
      androidIcon: 'lightbulb_outline',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            <Pressable
              onPress={() => handlePress(button.id)}
              accessibilityLabel={`${button.label} button`}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.primary + "15",
                  transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <IconSymbol
                ios_icon_name={button.iosIcon}
                android_material_icon_name={button.androidIcon as any}
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.buttonLabel, { color: colors.text }]}>
                {button.label}
              </Text>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  button: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 44,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 17.4,
  },
});
