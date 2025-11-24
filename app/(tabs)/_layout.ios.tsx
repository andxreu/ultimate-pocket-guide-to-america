
import React from 'react';
import { NativeTabs, Icon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      {/* Home tab */}
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="house.fill" color={color} size={size} />,
        }}
      />
      
      {/* Main section pages (not in tab bar, but still need to be defined) */}
      <NativeTabs.Screen
        name="foundations"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <NativeTabs.Screen
        name="civic-literacy"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <NativeTabs.Screen
        name="political-landscape"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <NativeTabs.Screen
        name="principles-practice"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <NativeTabs.Screen
        name="land-life"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      
      {/* Utility tabs (visible in tab bar) */}
      <NativeTabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => <Icon name="map.fill" color={color} size={size} />,
        }}
      />
      <NativeTabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, size }) => <Icon name="questionmark.diamond.fill" color={color} size={size} />,
        }}
      />
      <NativeTabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Icon name="magnifyingglass" color={color} size={size} />,
        }}
      />
      <NativeTabs.Screen
        name="glossary"
        options={{
          title: 'Glossary',
          tabBarIcon: ({ color, size }) => <Icon name="book.fill" color={color} size={size} />,
        }}
      />
      <NativeTabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Icon name="star.fill" color={color} size={size} />,
        }}
      />
    </NativeTabs>
  );
}
