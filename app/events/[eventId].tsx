import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { EventThemeProvider } from '@/src/components/theme/event-theme-provider';
import { EventDetailScreen } from '@/src/components/tenant/event-detail-screen';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { useTenantEvent } from '@/src/hooks/use-tenant-event';
import { navigateToHome } from '@/src/utils/navigation';

export default function EventDetailRoute() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const { event, isLoading, isNotFound } = useTenantEvent(eventId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isNotFound || !event) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <StatusBar style="dark" />
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-900">
          Event not found
        </Text>
        <Text className="mb-6 text-center text-neutral-600">
          This event may have been removed or is no longer available.
        </Text>
        <Button onPress={navigateToHome} role="button">
          <Button.Label>Back to events</Button.Label>
        </Button>
      </View>
    );
  }

  return (
    <EventThemeProvider event={event}>
      <StatusBar style="light" />
      <EventDetailScreen
        event={event}
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
            return;
          }

          navigateToHome();
        }}
        onRegister={() => {
          router.push(routes.auth.signUp());
        }}
      />
    </EventThemeProvider>
  );
}
