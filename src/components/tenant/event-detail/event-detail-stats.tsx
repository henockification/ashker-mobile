import { View } from 'react-native';

import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import { Text } from '@/src/components/ui/text';
import type { EventDetailContent } from '@/src/types/event-detail';
import { withAlpha } from '@/src/utils/theme-palette';

type EventDetailStatsProps = {
  content: EventDetailContent;
};

export function EventDetailStats({ content }: EventDetailStatsProps) {
  const theme = useEventTheme();

  const items = [
    { value: String(content.sessions.length), label: 'Sessions' },
    { value: String(content.speakers.length), label: 'Speakers' },
    { value: String(content.sponsors.length), label: 'Sponsors' },
  ];

  return (
    <View
      className="flex-row border-b px-5 py-5"
      style={{
        backgroundColor: theme.primary,
        borderBottomColor: withAlpha(theme.tertiary, '40'),
      }}
    >
      {items.map((item, index) => (
        <View
          key={item.label}
          className="flex-1 items-center"
          style={
            index < items.length - 1
              ? { borderRightWidth: 1, borderRightColor: withAlpha('#ffffff', '33') }
              : undefined
          }
        >
          <Text className="text-2xl font-bold text-white">{item.value}</Text>
          <Text className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-white/80">
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
