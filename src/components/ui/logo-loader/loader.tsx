import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

export function LogoLoader({ bgColor }: { bgColor?: string }) {
  return (
    <View
      className="absolute inset-0 items-center justify-center"
      style={{ backgroundColor: bgColor ?? 'transparent' }}
    >
      <LottieView
        source={require('@/assets/loading-animation.json')}
        autoPlay
        loop
        style={{ width: 80, height: 80 }}
      />
    </View>
  );
}
