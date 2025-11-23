
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
  ];

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="foundations" name="foundations" />
        <Stack.Screen key="civic-literacy" name="civic-literacy" />
        <Stack.Screen key="political-landscape" name="political-landscape" />
        <Stack.Screen key="principles-practice" name="principles-practice" />
        <Stack.Screen key="land-life" name="land-life" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
