import { ScrollView, View } from 'react-native';

import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import { EventDetailSection } from '@/src/components/tenant/event-detail/event-detail-section';
import { Text } from '@/src/components/ui/text';
import type { EventSpeaker } from '@/src/types/event-detail';
import { withAlpha } from '@/src/utils/theme-palette';

type EventDetailSpeakersProps = {
  speakers: EventSpeaker[];
};

export function EventDetailSpeakers({ speakers }: EventDetailSpeakersProps) {
  const theme = useEventTheme();

  return (
    <EventDetailSection
      title="Speakers"
      subtitle="Industry leaders and practitioners shaping the conversation."
      backgroundColor={withAlpha(theme.secondary, '12')}
      titleColor={theme.primary}
      subtitleColor="#52525b"
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3">
        {speakers.map((speaker) => (
          <View
            key={speaker.id}
            className="w-[260px] rounded-2xl border p-4"
            style={{
              backgroundColor: '#ffffff',
              borderColor: withAlpha(theme.primary, '20'),
            }}
          >
            <View
              className="mb-3 h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: withAlpha(theme.primary, '18') }}
            >
              <Text className="text-lg font-bold" style={{ color: theme.primary }}>
                {speaker.initials}
              </Text>
            </View>
            <Text className="text-base font-bold text-neutral-900">{speaker.name}</Text>
            <Text className="mt-0.5 text-sm font-medium" style={{ color: theme.secondary }}>
              {speaker.title}
            </Text>
            <Text className="text-sm text-neutral-500">{speaker.company}</Text>
            <View
              className="mt-3 rounded-lg px-2.5 py-2"
              style={{ backgroundColor: withAlpha(theme.tertiary, '14') }}
            >
              <Text className="text-xs leading-4 text-neutral-700">{speaker.topic}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </EventDetailSection>
  );
}
