import { cn } from 'heroui-native';
import { Pressable, ScrollView, View } from 'react-native';

import type { EventTimeFilter } from '@/src/components/tenant/helpers/tenant-events.helpers';
import {
  formatEventTypeLabel,
  getTimeFilterLabel,
} from '@/src/components/tenant/helpers/tenant-events.helpers';
import { Text } from '@/src/components/ui/text';

type EventFilterChipsProps = {
  timeFilter: EventTimeFilter;
  typeFilter: string;
  typeOptions: string[];
  accentColor?: string | null;
  onTimeFilterChange: (filter: EventTimeFilter) => void;
  onTypeFilterChange: (type: string) => void;
};

const TIME_FILTERS: EventTimeFilter[] = ['upcoming', 'past', 'all'];

type SegmentProps = {
  label: string;
  selected: boolean;
  accentColor?: string | null;
  onPress: () => void;
};

function Segment({ label, selected, accentColor, onPress }: SegmentProps) {
  const accent = accentColor ?? '#52525b';

  return (
    <Pressable
      onPress={onPress}
      className={cn('flex-1 items-center rounded-lg py-2', selected && 'shadow-sm')}
      style={selected ? { backgroundColor: accent } : undefined}
    >
      <Text className={cn('text-sm font-semibold', selected ? 'text-white' : 'text-neutral-600')}>
        {label}
      </Text>
    </Pressable>
  );
}

function TypeChip({
  label,
  selected,
  accentColor,
  onPress,
}: {
  label: string;
  selected: boolean;
  accentColor?: string | null;
  onPress: () => void;
}) {
  const accent = accentColor ?? '#52525b';

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'rounded-full border px-3 py-1.5',
        selected ? 'border-transparent' : 'border-neutral-200 bg-neutral-50',
      )}
      style={selected ? { backgroundColor: accent } : undefined}
    >
      <Text className={cn('text-xs font-semibold', selected ? 'text-white' : 'text-neutral-600')}>
        {label}
      </Text>
    </Pressable>
  );
}

export function EventFilterChips({
  timeFilter,
  typeFilter,
  typeOptions,
  accentColor,
  onTimeFilterChange,
  onTypeFilterChange,
}: EventFilterChipsProps) {
  return (
    <View className="gap-3">
      <View className="flex-row rounded-xl bg-neutral-100 p-1">
        {TIME_FILTERS.map((filter) => (
          <Segment
            key={filter}
            label={getTimeFilterLabel(filter)}
            selected={timeFilter === filter}
            accentColor={accentColor}
            onPress={() => onTimeFilterChange(filter)}
          />
        ))}
      </View>

      {typeOptions.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row gap-2"
        >
          <TypeChip
            label="All"
            selected={typeFilter === 'all'}
            accentColor={accentColor}
            onPress={() => onTypeFilterChange('all')}
          />
          {typeOptions.map((type) => (
            <TypeChip
              key={type}
              label={formatEventTypeLabel(type)}
              selected={typeFilter === type}
              accentColor={accentColor}
              onPress={() => onTypeFilterChange(type)}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}
