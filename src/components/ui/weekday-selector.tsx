import { cn } from 'heroui-native';
import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import Tick from '@/assets/icons/tick.svg';
import { Text } from '@/src/components/ui/text';

const DEFAULT_DAYS: Weekday[] = [
  { key: 'M', label: 'M' },
  { key: 'T', label: 'T' },
  { key: 'W', label: 'W' },
  { key: 'Th', label: 'Th' },
  { key: 'F', label: 'F' },
  { key: 'Sa', label: 'Sa' },
  { key: 'Su', label: 'Su' },
];
export type WeekdayKey = 'M' | 'T' | 'W' | 'Th' | 'F' | 'Sa' | 'Su';
export type Weekday = { key: WeekdayKey; label: string };

export interface WeekdaySelectorProps {
  value: WeekdayKey[];
  onChange: (next: WeekdayKey[]) => void;

  days?: Weekday[];
  disabled?: boolean;
  className?: string;
}

export const WeekdaySelector = ({
  value,
  onChange,
  days = DEFAULT_DAYS,
  disabled = false,
  className,
}: WeekdaySelectorProps) => {
  const iconColor = String(useCSSVariable('--color-white'));

  const selectedSet = useMemo(() => new Set(value), [value]);

  const toggle = (key: WeekdayKey) => {
    if (disabled) return;

    const next = selectedSet.has(key) ? value.filter((k) => k !== key) : [...value, key];

    onChange(next);
  };

  return (
    <View className={cn('flex-row items-center justify-around', className)}>
      {days.map((day) => {
        const isSelected = selectedSet.has(day.key);

        return (
          <Pressable
            key={day.key}
            onPress={() => toggle(day.key)}
            disabled={disabled}
            hitSlop={10}
            className={cn('items-center justify-center gap-2', disabled && 'opacity-50')}
          >
            <View
              className={cn(
                'w-6 h-6 border-1 rounded-full items-center justify-center',
                isSelected ? 'border-accent bg-accent' : 'border-neutral-700',
              )}
            >
              {isSelected && <Tick stroke={iconColor} />}
            </View>

            <Text className="text-md font-bold text-neutral-700">{day.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
