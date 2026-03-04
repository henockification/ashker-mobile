import { Image, ImageProps } from 'expo-image';
import { cn } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

type ResponsiveImageProps = {
  source: ImageProps['source'];
  alt?: string;
  className?: string;
  imageClassName?: string;
  contentFit?: ImageProps['contentFit'];
};

export const ResponsiveImage = ({
  source,
  className,
  contentFit = 'contain',
  alt,
}: ResponsiveImageProps) => {
  return (
    <View
      className={cn(
        'w-[300px] h-[200px] md:w-[400px] md:h-[267px] lg:w-[500px] lg:h-[333px] mx-auto',
        className,
      )}
    >
      <Image
        source={source}
        contentFit={contentFit}
        style={{ width: '100%', height: '100%' }}
        alt={alt}
      />
    </View>
  );
};
