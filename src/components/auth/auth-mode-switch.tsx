import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';

type AuthModeSwitchProps = {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
};

export function AuthModeSwitch({ prompt, actionLabel, onPress }: AuthModeSwitchProps) {
  const primaryColor = String(useCSSVariable('--color-primary-600'));

  return (
    <View className="mt-5 flex-row flex-wrap items-center justify-center gap-2 self-center">
      <Text className="text-neutral-700">{prompt}</Text>
      <Button
        accessibilityLabel={actionLabel}
        onPress={onPress}
        role="button"
        size="md"
        variant="ghost"
      >
        <Button.Label>{actionLabel}</Button.Label>
        <ArrowRight accessible={false} fill={primaryColor} />
      </Button>
    </View>
  );
}
