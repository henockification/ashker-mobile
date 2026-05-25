import { Platform } from 'react-native';

export const webActionProps = (onPress?: () => void) => {
  if (Platform.OS !== 'web' || !onPress) return {};

  return {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPress();
      }
    },
  };
};
