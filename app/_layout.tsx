import '../global.css';

import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HeroUINativeConfig, HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native/components/ToastManager';

import { authManager, queryClient } from '@/src/api/client';
import { NetworkGuard } from '@/src/components/network-guard';
import { TenantThemeProvider } from '@/src/components/theme/tenant-theme-provider';
import WebEngine from '@/src/components/web-engine';
import { toastConfig } from '@/src/constants/toast';
import { ROUTES } from '@/src/constants/routes';
import { SessionProvider } from '@/src/contexts/auth';
import { TenantProvider, useTenant } from '@/src/contexts/tenant';
import { UserProvider } from '@/src/contexts/user';

const config: HeroUINativeConfig = {
  textProps: {
    allowFontScaling: false,
    maxFontSizeMultiplier: 1.5,
  },
  devInfo: {
    stylingPrinciples: false,
  },
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': NunitoSans_400Regular,
    'NunitoSans-Medium': NunitoSans_500Medium,
    'NunitoSans-SemiBold': NunitoSans_600SemiBold,
    'NunitoSans-Bold': NunitoSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <HeroUINativeProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <WebEngine>
                <TenantProvider>
                  <ThemedApp />
                </TenantProvider>

                <StatusBar style="light" />
                <ToastManager
                  config={toastConfig}
                  showProgressBar={false}
                  position="bottom"
                  theme="light"
                />
                <NetworkGuard />
              </WebEngine>
            </QueryClientProvider>
          </HeroUINativeProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

function ThemedApp() {
  const { themeColor } = useTenant();

  return (
    <TenantThemeProvider themeColor={themeColor}>
      <SessionProvider authManager={authManager}>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name={ROUTES.signIn}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name={ROUTES.signUp}
              options={{ animation: 'slide_from_right' }}
            />
          </Stack>
        </UserProvider>
      </SessionProvider>
    </TenantThemeProvider>
  );
}
