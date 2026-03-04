import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';

import { ROUTES } from '@/src/constants/routes';

export const unstable_settings = {
  initialRouteName: ROUTES.signIn,
};

export default function AuthLayout() {
  return (
    <>
      {Platform.OS === 'web'}
      <Stack
          screenOptions={{
            animation: 'none',
            headerShown: false,
            contentStyle: { flex: 1 },
          }}
        >
          <Stack.Screen name={ROUTES.signIn} />
          {/* Add Stack.Screen for sign-up, reset-password, resend-email when those routes exist */}
        </Stack>
    </>
  );
}

