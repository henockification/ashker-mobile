import { Image } from 'expo-image';
import { View } from 'react-native';

import {
  formatEventDateBadge,
  formatEventSchedule,
  formatEventTypeLabel,
  getEventImageUri,
  getEventStatusLabel,
} from '@/src/components/tenant/helpers/tenant-events.helpers';
import { Text } from '@/src/components/ui/text';
import type { TenantEvent } from '@/src/types/tenant-events';
import { parseHexColor } from '@/src/utils/theme-palette';

type EventCardProps = {
  event: TenantEvent;
  accentColor?: string | null;
};

const withAlpha = (hex: string, alphaHex: string): string => {
  const parsed = parseHexColor(hex);
  return parsed ? `${parsed}${alphaHex}` : hex;
};

export function EventCard({ event, accentColor }: EventCardProps) {
  const imageUri = getEventImageUri(event);
  const accent = parseHexColor(accentColor) ?? '#52525b';
  const statusLabel = getEventStatusLabel(event);
  const { month, day } = formatEventDateBadge(event);

  return (
    <View
      className="rounded-2xl border border-neutral-200 bg-white p-4"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View className="relative mb-3.5 overflow-hidden rounded-xl bg-neutral-100">
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: 156 }} contentFit="cover" />
        ) : (
          <View className="h-[156px] items-center justify-center" style={{ backgroundColor: withAlpha(accent, '10') }}>
            <View
              className="h-12 w-12 rounded-full"
              style={{ backgroundColor: withAlpha(accent, '22') }}
            />
          </View>
        )}

        {statusLabel ? (
          <View className="absolute right-2.5 top-2.5 rounded-full bg-neutral-900/85 px-2.5 py-1">
            <Text className="text-[10px] font-bold uppercase tracking-wider text-white">
              {statusLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="mb-2 flex-row items-center justify-between gap-2">
        <View
          className="rounded-full px-2.5 py-1"
          style={{ backgroundColor: withAlpha(accent, '14') }}
        >
          <Text className="text-[11px] font-bold uppercase tracking-wide" style={{ color: accent }}>
            {formatEventTypeLabel(event.eventType)}
          </Text>
        </View>
        <View className="flex-row items-baseline gap-0.5">
          <Text className="text-xs font-bold uppercase" style={{ color: accent }}>
            {month}
          </Text>
          <Text className="text-lg font-bold leading-5" style={{ color: accent }}>
            {day}
          </Text>
        </View>
      </View>

      <Text className="mb-2 text-lg font-bold leading-6 text-neutral-900" numberOfLines={3}>
        {event.eventName}
      </Text>

      <Text className="mb-1 text-sm font-medium text-neutral-700">{formatEventSchedule(event)}</Text>

      {event.eventLocation ? (
        <Text className="text-sm leading-5 text-neutral-500" numberOfLines={2}>
          {event.eventLocation}
        </Text>
      ) : null}
    </View>
  );
}
