import { View } from 'react-native';

import { useEventTheme } from '@/src/components/theme/event-theme-provider';
import { EventDetailSection } from '@/src/components/tenant/event-detail/event-detail-section';
import { Text } from '@/src/components/ui/text';
import type { EventSponsor, EventSponsorTier } from '@/src/types/event-detail';
import { withAlpha } from '@/src/utils/theme-palette';

type EventDetailSponsorsProps = {
  sponsors: EventSponsor[];
};

const TIER_ORDER: EventSponsorTier[] = ['platinum', 'gold', 'silver', 'partner'];

const TIER_LABEL: Record<EventSponsorTier, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  partner: 'Partners',
};

export function EventDetailSponsors({ sponsors }: EventDetailSponsorsProps) {
  const theme = useEventTheme();

  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    label: TIER_LABEL[tier],
    items: sponsors.filter((s) => s.tier === tier),
  })).filter((group) => group.items.length > 0);

  return (
    <EventDetailSection
      title="Sponsors"
      subtitle="Thank you to our partners for making this event possible."
      backgroundColor={theme.primary}
      titleColor="#ffffff"
      subtitleColor={withAlpha('#ffffff', 'CC')}
    >
      <View className="gap-6">
        {grouped.map((group) => (
          <View key={group.tier}>
            <Text
              className="mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: withAlpha(theme.secondary, 'FF') }}
            >
              {group.label}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {group.items.map((sponsor) => (
                <View
                  key={sponsor.id}
                  className="min-w-[46%] flex-1 items-center rounded-xl px-3 py-4"
                  style={{
                    backgroundColor: withAlpha('#ffffff', '14'),
                    borderWidth: 1,
                    borderColor: withAlpha('#ffffff', '22'),
                  }}
                >
                  <View
                    className="mb-2 h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: withAlpha(theme.tertiary, '55') }}
                  >
                    <Text className="text-sm font-bold text-white">{sponsor.initials}</Text>
                  </View>
                  <Text className="text-center text-sm font-semibold text-white">{sponsor.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </EventDetailSection>
  );
}
