
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      iosIcon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'map',
      route: '/(tabs)/map',
      icon: 'map',
      iosIcon: 'map.fill',
      label: 'Map',
    },
    {
      name: 'quiz',
      route: '/(tabs)/quiz',
      icon: 'help',
      iosIcon: 'questionmark.diamond.fill',
      label: 'Quiz',
    },
    {
      name: 'search',
      route: '/(tabs)/search',
      icon: 'search',
      iosIcon: 'magnifyingglass',
      label: 'Search',
    },
    {
      name: 'glossary',
      route: '/(tabs)/glossary',
      icon: 'menu_book',
      iosIcon: 'book.fill',
      label: 'Glossary',
    },
    {
      name: 'favorites',
      route: '/(tabs)/favorites',
      icon: 'star',
      iosIcon: 'star.fill',
      label: 'Favorites',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="foundations" />
        <Stack.Screen name="civic-literacy" />
        <Stack.Screen name="political-landscape" />
        <Stack.Screen name="principles-practice" />
        <Stack.Screen name="land-life" />
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
