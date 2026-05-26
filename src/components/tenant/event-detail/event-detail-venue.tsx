import { View } from 'react-native';

import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import { EventDetailSection } from '@/src/components/tenant/event-detail/event-detail-section';
import { Text } from '@/src/components/ui/text';
import type { TenantEvent } from '@/src/types/tenant-events';
import { withAlpha } from '@/src/utils/theme-palette';

type EventDetailVenueProps = {
  event: TenantEvent;
};

export function EventDetailVenue({ event }: EventDetailVenueProps) {
  const theme = useEventTheme();

  if (!event.eventLocation && !event.dressCode && event.noOfGuests <= 0) {
    return null;
  }

  return (
    <EventDetailSection
      title="Venue & details"
      backgroundColor={withAlpha(theme.secondary, '10')}
      titleColor={theme.primary}
    >
      <View className="gap-3">
        {event.eventLocation ? (
          <InfoCard label="Location" value={event.eventLocation} accent={theme.primary} />
        ) : null}
        {event.dressCode ? (
          <InfoCard label="Dress code" value={event.dressCode} accent={theme.tertiary} />
        ) : null}
        {event.noOfGuests > 0 ? (
          <InfoCard
            label="Expected attendance"
            value={`${event.noOfGuests} guests`}
            accent={theme.secondary}
          />
        ) : null}
      </View>
    </EventDetailSection>
  );
}

function InfoCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <View
      className="rounded-xl border-l-4 bg-white p-4"
      style={{ borderLeftColor: accent, borderColor: withAlpha(accent, '25') }}
    >
      <Text className="mb-1 text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</Text>
      <Text className="text-base leading-6 text-neutral-900">{value}</Text>
    </View>
  );
}
