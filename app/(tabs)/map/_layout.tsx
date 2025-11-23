
import { Stack } from "expo-router";

export default function MapLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="region/[id]" />
      <Stack.Screen name="state/[code]" />
    </Stack>
  );
}
