import { cn } from 'heroui-native';
import React, { useState } from 'react';
import { LayoutChangeEvent, Platform, StyleSheet, View } from 'react-native';
import { Defs, FeTurbulence, Filter, RadialGradient, Rect, Stop, Svg } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

interface RadialGradientProps {
  variant?: 'dark' | 'light';
  className?: string;
  children: React.ReactNode;
}

export const RadialGradientBackground = ({
  variant = 'dark',
  children,
  className,
}: RadialGradientProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  const darkColor = String(useCSSVariable('--color-primary-800'));
  const lightColor = String(useCSSVariable('--color-primary-50'));

  const colors =
    variant === 'light'
      ? ['rgba(215, 230, 244, 0.3)', lightColor]
      : [darkColor, 'rgba(11, 26, 40, 0.8)'];

  return (
    <View
      onLayout={onLayout}
      className={cn(
        'flex-1 w-full',
        variant === 'light' ? 'bg-primary-50' : 'bg-primary-800',
        className,
      )}
      accessible={false}
    >
      {size.width > 0 && size.height > 0 && (
        <Svg
          width={size.width}
          height={size.height}
          style={[{ position: 'absolute', top: 0, left: 0 }]}
        >
          <Defs>
            <RadialGradient
              id="radial_grad"
              cx="50.13%"
              cy={variant === 'light' ? '49.92%' : '50.13%'}
              rx={variant === 'light' ? '50.08%' : '78.27%'}
              ry={variant === 'light' ? '50.08%' : '78.27%'}
            >
              <Stop offset="0%" stopColor={colors[0]} />
              <Stop offset="100%" stopColor={colors[1]} />
            </RadialGradient>
          </Defs>

          <Rect x="0" y="0" width="100%" height="100%" fill="url(#radial_grad)" />
        </Svg>
      )}

      {Platform.OS === 'web' && (
        <Svg
          width="100%"
          height="100%"
          style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}
        >
          <Defs>
            <Filter id="noiseFilterRadialGraident">
              <FeTurbulence
                type="fractalNoise"
                baseFrequency={0.6}
                numOctaves={2}
                stitchTiles="stitch"
              />
            </Filter>
          </Defs>

          <Rect
            width="100%"
            height="100%"
            filter="url(#noiseFilterRadialGraident)"
            opacity={0.08}
          />
        </Svg>
      )}

      {children}
    </View>
  );
};
