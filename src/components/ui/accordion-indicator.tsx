import { useAccordionItem } from 'heroui-native';
import { useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useCSSVariable } from 'uniwind';

import ChevronUp from '@/assets/icons/chevron-up.svg';

export const AccordionIndicator = ({ className }: { className?: string }) => {
  const iconColor = String(useCSSVariable('--color-neutral-500'));
  const rotation = useSharedValue(0);
  const { isExpanded } = useAccordionItem();

  useEffect(() => {
    rotation.set(withSpring(isExpanded ? 1 : 0, { damping: 140, stiffness: 1000, mass: 4 }));
  }, [isExpanded, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: interpolate(rotation.get(), [0, 1], [180, 0]) + 'deg',
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle} className={className}>
      <ChevronUp stroke={iconColor} />
    </Animated.View>
  );
};
