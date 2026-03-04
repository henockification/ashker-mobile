import { HeroUINativeConfig, HeroUINativeProvider } from 'heroui-native';
import { Redirect, Stack, usePathname } from 'expo-router';
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';
import { QueryClientProvider } from '@tanstack/react-query';
import { Platform, StyleSheet } from 'react-native';
import WebEngine from '@/src/components/web-engine';
import { NetworkGuard } from '@/src/components/network-guard';
// import { SessionProvider, useSession } from '@/src/contexts/auth';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import ToastManager from 'toastify-react-native/components/ToastManager';
import { queryClient } from '@/src/api/client';
import { toastConfig } from '@/src/constants/toast';

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
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <HeroUINativeProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <WebEngine>
                {/* <SessionProvider>
                  <UserProvider>
                    <SplashScreenController />
                    <RootNavigator />
                  </UserProvider>
                </SessionProvider> */}

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

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
