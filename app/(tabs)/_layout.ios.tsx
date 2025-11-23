
import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger key="home" name="(home)">
        <Icon sf="house.fill" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="foundations" name="foundations">
        <Icon sf="book.fill" />
        <Label>Foundations</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="civic" name="civic-literacy">
        <Icon sf="graduationcap.fill" />
        <Label>Civic</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="political" name="political-landscape">
        <Icon sf="flag.fill" />
        <Label>Political</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="principles" name="principles-practice">
        <Icon sf="scale.3d" />
        <Label>Principles</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger key="land" name="land-life">
        <Icon sf="globe.americas.fill" />
        <Label>Land</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
