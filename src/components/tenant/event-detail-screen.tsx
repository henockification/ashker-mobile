import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventDetailAbout } from '@/src/components/tenant/event-detail/event-detail-about';
import { EventDetailHero } from '@/src/components/tenant/event-detail/event-detail-hero';
import { EventDetailSessions } from '@/src/components/tenant/event-detail/event-detail-sessions';
import { EventDetailSpeakers } from '@/src/components/tenant/event-detail/event-detail-speakers';
import { EventDetailSponsors } from '@/src/components/tenant/event-detail/event-detail-sponsors';
import { EventDetailStats } from '@/src/components/tenant/event-detail/event-detail-stats';
import { EventDetailVenue } from '@/src/components/tenant/event-detail/event-detail-venue';
import { getEventDetailContent } from '@/src/components/tenant/helpers/event-detail.helpers';
import { Button } from '@/src/components/ui/button';
import type { TenantEvent } from '@/src/types/tenant-events';

type EventDetailScreenProps = {
  event: TenantEvent;
  onBack: () => void;
  onRegister: () => void;
};

export function EventDetailScreen({ event, onBack, onRegister }: EventDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const content = getEventDetailContent(event);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 88 }}
        showsVerticalScrollIndicator={false}
      >
        <EventDetailHero event={event} paddingTop={insets.top} onBack={onBack} />
        <EventDetailStats content={content} />
        <EventDetailAbout event={event} />
        <EventDetailSpeakers speakers={content.speakers} />
        <EventDetailSessions sessions={content.sessions} />
        <EventDetailSponsors sponsors={content.sponsors} />
        <EventDetailVenue event={event} />
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-5 pt-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button accessibilityLabel="Register for event" onPress={onRegister} role="button">
          <Button.Label>Register</Button.Label>
        </Button>
      </View>
    </View>
  );
}
