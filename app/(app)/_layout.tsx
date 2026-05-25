import { Stack } from 'expo-router';

import { Header } from '@/src/components/navigation/header';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none',
        header: () => <Header />,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="feed" options={{ headerShown: true }} />
      <Stack.Screen
        name="add-business"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
}
