
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'foundations',
      route: '/(tabs)/foundations',
      icon: 'book',
      label: 'Foundations',
    },
    {
      name: 'civic-literacy',
      route: '/(tabs)/civic-literacy',
      icon: 'school',
      label: 'Civic',
    },
    {
      name: 'political-landscape',
      route: '/(tabs)/political-landscape',
      icon: 'flag',
      label: 'Political',
    },
    {
      name: 'principles-practice',
      route: '/(tabs)/principles-practice',
      icon: 'balance',
      label: 'Principles',
    },
    {
      name: 'land-life',
      route: '/(tabs)/land-life',
      icon: 'public',
      label: 'Land',
    },
    {
      name: 'map',
      route: '/(tabs)/map/',
      icon: 'map',
      label: 'Map',
    },
    {
      name: 'quiz',
      route: '/(tabs)/quiz/',
      icon: 'help',
      label: 'Quiz',
    },
    {
      name: 'search',
      route: '/(tabs)/search/',
      icon: 'search',
      label: 'Search',
    },
    {
      name: 'glossary',
      route: '/(tabs)/glossary/',
      icon: 'menu_book',
      label: 'Glossary',
    },
    {
      name: 'favorites',
      route: '/(tabs)/favorites/',
      icon: 'star',
      label: 'Favorites',
    },
  ];

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="foundations" name="foundations" />
        <Stack.Screen key="civic-literacy" name="civic-literacy" />
        <Stack.Screen key="political-landscape" name="political-landscape" />
        <Stack.Screen key="principles-practice" name="principles-practice" />
        <Stack.Screen key="land-life" name="land-life" />
        <Stack.Screen key="map" name="map" />
        <Stack.Screen key="quiz" name="quiz" />
        <Stack.Screen key="search" name="search" />
        <Stack.Screen key="glossary" name="glossary" />
        <Stack.Screen key="favorites" name="favorites" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
