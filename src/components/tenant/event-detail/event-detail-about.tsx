import { View } from 'react-native';

import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import { EventDetailSection } from '@/src/components/tenant/event-detail/event-detail-section';
import { Text } from '@/src/components/ui/text';
import type { TenantEvent } from '@/src/types/tenant-events';
import { withAlpha } from '@/src/utils/theme-palette';

type EventDetailAboutProps = {
  event: TenantEvent;
};

export function EventDetailAbout({ event }: EventDetailAboutProps) {
  const theme = useEventTheme();
  const description =
    event.eventDescription?.trim() ||
    'Join leaders and practitioners for a full day of keynotes, hands-on sessions, and networking. Registration details and session materials will be shared closer to the event date.';

  return (
    <EventDetailSection
      title="About the event"
      backgroundColor="#ffffff"
      titleColor={theme.primary}
    >
      <Text className="text-base leading-7 text-neutral-700">{description}</Text>

      <View className="mt-5 flex-row flex-wrap gap-2">
        {event.eventSettings.hasSessions ? (
          <Tag label="Multi-track agenda" color={theme.primary} />
        ) : null}
        {event.eventSettings.allowRegistration ? (
          <Tag label="Registration open" color={theme.secondary} />
        ) : null}
        {event.eventSettings.allowTicketing ? (
          <Tag label="Ticketing" color={theme.tertiary} />
        ) : null}
      </View>
    </EventDetailSection>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <View className="rounded-full px-3 py-1.5" style={{ backgroundColor: withAlpha(color, '18') }}>
      <Text className="text-xs font-semibold" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}
