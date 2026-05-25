import { Stack } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';
import { Header } from '@/src/components/navigation/header';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none',
        header: () => <Header />,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name={ROUTES.signIn} />
      <Stack.Screen name={ROUTES.signUp} />
      {/* Add Stack.Screen for reset-password, resend-email when those routes exist */}
    </Stack>
  );
}

