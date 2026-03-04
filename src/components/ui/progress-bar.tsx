import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <View className="w-full h-[6px] rounded-full overflow-hidden bg-accent-100">
      <View className="h-full rounded-full bg-accent-700" style={{ width: `${progress * 100}%` }} />
    </View>
  );
};
