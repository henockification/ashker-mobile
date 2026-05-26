import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventCard } from '@/src/components/tenant/event-card';
import { EventFilterChips } from '@/src/components/tenant/event-filter-chips';
import {
  type EventTimeFilter,
  filterTenantEvents,
  formatEventTypeLabel,
  getEmptyEventsMessage,
  getEventTypeOptions,
  getTimeFilterLabel,
} from '@/src/components/tenant/helpers/tenant-events.helpers';
import { TenantLandingFooter } from '@/src/components/tenant/tenant-landing-footer';
import { TenantLandingHeader } from '@/src/components/tenant/tenant-landing-header';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { getTenantOrigin } from '@/src/constants/tenant';
import { useSession } from '@/src/contexts/auth';
import { useTenant } from '@/src/contexts/tenant';

export function TenantLanding() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, signOut } = useSession();
  const { tenant, events, themeColor, isLoading, isError, error, refetch } = useTenant();

  const [timeFilter, setTimeFilter] = useState<EventTimeFilter>('upcoming');
  const [typeFilter, setTypeFilter] = useState('all');

  const companyName = tenant?.companyName ?? 'Ashker Hub';
  const activeCount = useMemo(
    () => filterTenantEvents(events, { timeFilter: 'upcoming' }).length,
    [events],
  );
  const typeOptions = useMemo(() => getEventTypeOptions(events), [events]);
  const accent = themeColor ?? tenant?.themeColor;

  const filteredEvents = useMemo(
    () => filterTenantEvents(events, { timeFilter, typeFilter }),
    [events, timeFilter, typeFilter],
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-neutral-600">Loading events…</Text>
      </View>
    );
  }

  if (isError) {
    const missingOrigin = !getTenantOrigin();
    const status = isAxiosError(error) ? error.response?.status : undefined;

    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-900">
          Unable to load events
        </Text>
        <Text className="mb-6 text-center text-neutral-600">
          {missingOrigin
            ? 'Set EXPO_PUBLIC_TENANT_ORIGIN in your environment.'
            : status
              ? `Request failed (${status}). Check your connection and try again.`
              : 'Check your connection and try again.'}
        </Text>
        <Button onPress={refetch}>
          <Button.Label>Retry</Button.Label>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <TenantLandingHeader
          tenant={tenant}
          companyName={companyName}
          accentColor={accent}
          paddingTop={insets.top + 12}
          eventCount={activeCount}
        />

        <View className="bg-white px-5 pb-3 pt-1">
          <View className="mb-3 flex-row items-baseline justify-between">
            <Text className="text-xl font-bold text-neutral-900">Events</Text>
            <Text className="text-xs font-medium text-neutral-500">
              {filteredEvents.length} · {getTimeFilterLabel(timeFilter)}
              {typeFilter !== 'all' ? ` · ${formatEventTypeLabel(typeFilter)}` : ''}
            </Text>
          </View>
          <EventFilterChips
            timeFilter={timeFilter}
            typeFilter={typeFilter}
            typeOptions={typeOptions}
            accentColor={accent}
            onTimeFilterChange={setTimeFilter}
            onTypeFilterChange={setTypeFilter}
          />
        </View>

        <View className="gap-5 bg-neutral-100 px-5 pb-2 pt-4">
          {filteredEvents.length === 0 ? (
            <View className="rounded-2xl border border-neutral-200 bg-white px-6 py-10">
              <Text className="text-center text-neutral-600">
                {getEmptyEventsMessage(timeFilter, typeFilter)}
              </Text>
            </View>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} accentColor={accent} />
            ))
          )}

          <TenantLandingFooter
            companyName={companyName}
            isAuthenticated={isAuthenticated}
            accentColor={accent}
            onSignIn={() => router.push(routes.auth.signIn())}
            onSignUp={() => router.push(routes.auth.signUp())}
            onSignOut={() => void signOut()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
