import { useThemeColor } from 'heroui-native';
import { View } from 'react-native';

import AltArrowLeft from '@/assets/icons/alt-arrow-left.svg';
import AltArrowRight from '@/assets/icons/alt-arrow-right.svg';
import { ProgressBar } from '@/src/components/ui/progress-bar';

import { Button } from './button';

interface ProgressBarNavProps {
  progress: number;
  numGroups?: number;
  onBack?: () => void;
  onNext?: () => void;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
}

export const ProgressBarNav = ({
  progress,
  numGroups = 1,
  onBack,
  onNext,
  isBackDisabled = false,
  isNextDisabled = false,
}: ProgressBarNavProps) => {
  const surfaceForegroundColor = useThemeColor('surface-foreground');

  return (
    <View className="flex-row items-center justify-between w-full">
      <View className="w-10 h-10 justify-center items-center">
        {onBack && (
          <Button variant="ghost" onPress={onBack} isIconOnly size="md" isDisabled={isBackDisabled}>
            <AltArrowLeft fill={surfaceForegroundColor} />
          </Button>
        )}
      </View>

      <View className="flex-1 flex-row gap-2">
        {Array.from({ length: numGroups }).map((_, index) => {
          const scaled = progress * numGroups;
          const value = Math.max(0, Math.min(1, scaled - index));

          return (
            <View className="flex-1" key={index}>
              <ProgressBar key={index} progress={value} />
            </View>
          );
        })}
      </View>

      <View className="w-10 h-10 justify-center items-center">
        {onNext && (
          <Button variant="ghost" onPress={onNext} isIconOnly size="md" isDisabled={isNextDisabled}>
            <AltArrowRight fill={surfaceForegroundColor} />
          </Button>
        )}
      </View>
    </View>
  );
};
