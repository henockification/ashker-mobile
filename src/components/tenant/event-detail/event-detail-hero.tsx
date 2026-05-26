import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import {
  formatEventDateRange,
  formatEventSchedule,
  formatEventTypeLabel,
  getEventImageUri,
  getEventStatusLabel,
} from '@/src/components/tenant/helpers/tenant-events.helpers';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import type { TenantEvent } from '@/src/types/tenant-events';
import { getEventHeroGradientColors, withAlpha } from '@/src/utils/theme-palette';

type EventDetailHeroProps = {
  event: TenantEvent;
  paddingTop: number;
  onBack: () => void;
};

export function EventDetailHero({ event, paddingTop, onBack }: EventDetailHeroProps) {
  const theme = useEventTheme();
  const imageUri = getEventImageUri(event);
  const statusLabel = getEventStatusLabel(event);
  const gradientColors = getEventHeroGradientColors(theme);

  return (
    <View className="relative min-h-[320px]">
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: '100%', height: 320 }} contentFit="cover" />
      ) : (
        <View className="h-[320px]" style={{ backgroundColor: theme.primary }} />
      )}

      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.45, 1]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      <View className="absolute left-0 right-0 px-4" style={{ paddingTop: paddingTop + 8 }}>
        <Button
          onPress={onBack}
          variant="ghost"
          className="self-start rounded-full bg-black/25 px-0"
          size="md"
          isIconOnly
          accessibilityLabel="Back to events"
        >
          <ArrowLeft fill="#ffffff" accessible={false} />
        </Button>
      </View>

      <View className="absolute bottom-0 left-0 right-0 px-5 pb-6">
        <View className="mb-2 flex-row flex-wrap items-center gap-2">
          <View
            className="rounded-full px-3 py-1"
            style={{ backgroundColor: withAlpha(theme.tertiary, 'CC') }}
          >
            <Text className="text-[11px] font-bold uppercase tracking-wide text-white">
              {formatEventTypeLabel(event.eventType)}
            </Text>
          </View>
          {statusLabel ? (
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: withAlpha('#000000', '66') }}
            >
              <Text className="text-[11px] font-bold uppercase tracking-wide text-white">
                {statusLabel}
              </Text>
            </View>
          ) : null}
        </View>

        <Text
          className="mb-2 text-3xl font-bold leading-9 text-white"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {event.eventName}
        </Text>

        {event.coverText ? (
          <Text className="mb-3 text-base leading-6 text-white/90">{event.coverText}</Text>
        ) : null}

        <Text className="text-sm font-semibold text-white">{formatEventSchedule(event)}</Text>
        <Text className="mt-0.5 text-xs text-white/80">{formatEventDateRange(event)}</Text>
        {event.eventLocation ? (
          <Text className="mt-2 text-sm text-white/90">{event.eventLocation}</Text>
        ) : null}
      </View>
    </View>
  );
}
