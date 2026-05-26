import { View } from 'react-native';

import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import { EventDetailSection } from '@/src/components/tenant/event-detail/event-detail-section';
import { Text } from '@/src/components/ui/text';
import type { EventSession } from '@/src/types/event-detail';
import { withAlpha } from '@/src/utils/theme-palette';

type EventDetailSessionsProps = {
  sessions: EventSession[];
};

export function EventDetailSessions({ sessions }: EventDetailSessionsProps) {
  const theme = useEventTheme();

  return (
    <EventDetailSection
      title="Agenda"
      subtitle="Full-day program across keynotes, panels, and breakout sessions."
      backgroundColor="#ffffff"
      titleColor={theme.primary}
    >
      <View className="gap-3">
        {sessions.map((session) => (
          <View
            key={session.id}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
          >
            <View className="flex-row">
              <View className="w-1.5" style={{ backgroundColor: theme.tertiary }} />
              <View className="flex-1 p-4">
                <View className="mb-2 flex-row flex-wrap items-center gap-2">
                  <View
                    className="rounded-md px-2 py-0.5"
                    style={{ backgroundColor: withAlpha(theme.secondary, '22') }}
                  >
                    <Text className="text-[10px] font-bold uppercase" style={{ color: theme.primary }}>
                      {session.track}
                    </Text>
                  </View>
                  <Text className="text-xs font-semibold text-neutral-500">
                    {session.startTime} – {session.endTime}
                  </Text>
                </View>
                <Text className="text-base font-bold leading-6 text-neutral-900">{session.title}</Text>
                <Text className="mt-1 text-sm text-neutral-600">{session.speakerName}</Text>
                <Text className="mt-1 text-xs text-neutral-500">{session.room}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </EventDetailSection>
  );
}
