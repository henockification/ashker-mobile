import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';

type EventDetailSectionProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
}>;

export function EventDetailSection({
  title,
  subtitle,
  backgroundColor = '#ffffff',
  titleColor = '#18181b',
  subtitleColor = '#71717a',
  children,
}: EventDetailSectionProps) {
  return (
    <View className="px-5 py-8" style={{ backgroundColor }}>
      <Text className="mb-1 text-2xl font-bold" style={{ color: titleColor }}>
        {title}
      </Text>
      {subtitle ? (
        <Text className="mb-5 text-sm leading-5" style={{ color: subtitleColor }}>
          {subtitle}
        </Text>
      ) : (
        <View className="mb-5" />
      )}
      {children}
    </View>
  );
}
