
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
      iosIcon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'foundations',
      route: '/(tabs)/foundations',
      icon: 'book',
      iosIcon: 'book.fill',
      label: 'Foundations',
    },
    {
      name: 'civic-literacy',
      route: '/(tabs)/civic-literacy',
      icon: 'school',
      iosIcon: 'graduationcap.fill',
      label: 'Civic',
    },
    {
      name: 'political-landscape',
      route: '/(tabs)/political-landscape',
      icon: 'flag',
      iosIcon: 'flag.fill',
      label: 'Political',
    },
    {
      name: 'principles-practice',
      route: '/(tabs)/principles-practice',
      icon: 'balance',
      iosIcon: 'scale.3d',
      label: 'Principles',
    },
    {
      name: 'land-life',
      route: '/(tabs)/land-life',
      icon: 'public',
      iosIcon: 'globe.americas.fill',
      label: 'Land',
    },
    {
      name: 'map',
      route: '/(tabs)/map/',
      icon: 'map',
      iosIcon: 'map.fill',
      label: 'Map',
    },
    {
      name: 'quiz',
      route: '/(tabs)/quiz/',
      icon: 'help',
      iosIcon: 'questionmark.circle.fill',
      label: 'Quiz',
    },
    {
      name: 'search',
      route: '/(tabs)/search/',
      icon: 'search',
      iosIcon: 'magnifyingglass',
      label: 'Search',
    },
    {
      name: 'glossary',
      route: '/(tabs)/glossary/',
      icon: 'menu_book',
      iosIcon: 'book.fill',
      label: 'Glossary',
    },
    {
      name: 'favorites',
      route: '/(tabs)/favorites/',
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
