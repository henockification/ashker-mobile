import { cn } from 'heroui-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui/text';

type SocialAuthButtonProps = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
  isDisabled?: boolean;
  className?: string;
};

export function SocialAuthButton({
  label,
  icon,
  onPress,
  isDisabled = false,
  className,
}: SocialAuthButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        'flex-row items-center justify-center rounded-full border border-neutral-200 bg-white py-3.5 px-4',
        isDisabled && 'opacity-50',
        className,
      )}
    >
      <View className="mr-2.5 h-5 w-5 items-center justify-center overflow-hidden">{icon}</View>
      <Text className="text-base font-semibold text-neutral-800">{label}</Text>
    </Pressable>
  );
}
