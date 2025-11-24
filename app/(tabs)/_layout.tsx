
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the 6 tabs for the bottom navigation
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'map',
      route: '/(tabs)/map',
      icon: 'map',
      label: 'Map',
    },
    {
      name: 'quiz',
      route: '/(tabs)/quiz',
      icon: 'help',
      label: 'Quiz',
    },
    {
      name: 'search',
      route: '/(tabs)/search',
      icon: 'search',
      label: 'Search',
    },
    {
      name: 'glossary',
      route: '/(tabs)/glossary',
      icon: 'menu_book',
      label: 'Glossary',
    },
    {
      name: 'favorites',
      route: '/(tabs)/favorites',
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
          animation: 'none',
        }}
      >
        {/* Home group */}
        <Stack.Screen name="(home)" />
        
        {/* Main section pages (not in tab bar) */}
        <Stack.Screen name="foundations" />
        <Stack.Screen name="civic-literacy" />
        <Stack.Screen name="political-landscape" />
        <Stack.Screen name="principles-practice" />
        <Stack.Screen name="land-life" />
        
        {/* Utility pages (in tab bar) */}
        <Stack.Screen name="map" />
        <Stack.Screen name="quiz" />
        <Stack.Screen name="search" />
        <Stack.Screen name="glossary" />
        <Stack.Screen name="favorites" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
