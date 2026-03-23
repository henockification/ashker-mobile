import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui/text';

const ICON_SLOT = 40;

interface MeListRowProps {
  label: string;
  value?: string;
  leading: ReactNode;
  onPress?: () => void;
  /** Omit bottom divider (last row before a spacer). */
  isLast?: boolean;
}

export function MeListRow({ label, value, leading, onPress, isLast = false }: MeListRowProps) {
  const rowClassName = `flex-row items-center bg-white px-5 py-3.5 ${
    !isLast ? 'border-b border-neutral-200' : ''
  }`;

  const content = (
    <>
      <View style={{ width: ICON_SLOT, alignItems: 'center', justifyContent: 'center' }}>
        {leading}
      </View>
      <Text className="ml-3 flex-1 text-base text-neutral-900">{label}</Text>
      {value != null ? <Text className="text-base text-neutral-500">{value}</Text> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" className={rowClassName} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View className={rowClassName}>{content}</View>;
}
