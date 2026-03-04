import { cn, Tabs, useTabsTrigger } from 'heroui-native';

import { Text } from './text';

export const TabsLabel = ({ title }: { title: string }) => {
  const { isSelected } = useTabsTrigger();

  return (
    <Tabs.Label className="px-2 md:px-5 md:py-1">
      <Text className={cn('text-base md:text-lg', isSelected ? 'text-white' : 'text-neutral-600')}>
        {title}
      </Text>
    </Tabs.Label>
  );
};
