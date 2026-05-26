import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';

type AuthDividerProps = {
  label?: string;
};

export function AuthDivider({ label = 'or' }: AuthDividerProps) {
  return (
    <View className="my-5 flex-row items-center self-stretch">
      <View className="h-px flex-1 bg-neutral-200" />
      <Text className="mx-3 text-sm text-neutral-500">{label}</Text>
      <View className="h-px flex-1 bg-neutral-200" />
    </View>
  );
}
