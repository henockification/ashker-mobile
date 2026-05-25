import '../global.css';

import { HeroUINativeConfig, HeroUINativeProvider } from 'heroui-native';
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';
import { QueryClientProvider } from '@tanstack/react-query';
import WebEngine from '@/src/components/web-engine';
import { NetworkGuard } from '@/src/components/network-guard';
import { SessionProvider, useSession } from '@/src/contexts/auth';
import { UserProvider } from '@/src/contexts/user';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import ToastManager from 'toastify-react-native/components/ToastManager';
import { authManager, queryClient } from '@/src/api/client';
import { toastConfig } from '@/src/constants/toast';
import { Header } from '@/src/components/navigation/header';
import { ROUTES } from '@/src/constants/routes';
import Drawer from 'expo-router/drawer';
import { Sidebar } from '@/src/components/navigation/sidebar';

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
                <SessionProvider authManager={authManager}>
                  <UserProvider>
                    <RootNavigator />
                  </UserProvider>
                </SessionProvider>

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

function RootNavigator() {
  const { session } = useSession();
  const hasSession = Boolean(session);

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'back',
        swipeEnabled: true,
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      {/* Browse (search, businesses, …) is always available — no sign-in required. */}
      <Drawer.Screen name="(app)" />

      {/* Auth screens only in the stack while signed out. */}
      <Drawer.Protected guard={!hasSession}>
        <Drawer.Screen name="(auth)" />
      </Drawer.Protected>

      <Drawer.Screen
        name={ROUTES.faq}
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />

      <Drawer.Screen
        name={ROUTES.contactSupport}
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
    </Drawer>
  );
}