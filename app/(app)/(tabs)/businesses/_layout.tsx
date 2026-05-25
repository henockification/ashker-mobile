import { Stack } from 'expo-router';

import { Header } from '@/src/components/navigation/header';

export default function BusinessesLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none',
        header: () => <Header />,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Businesses' }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
