import { cn } from 'heroui-native';
import React, { useState } from 'react';
import { FlatList, LayoutChangeEvent, View } from 'react-native';

interface CarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  itemWidth: number;
  itemGap?: number;
  showDots?: boolean;
  className?: string;
}

export function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  itemGap = 20,
  showDots = true,
  className,
}: CarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const snapInterval = itemWidth + itemGap;
  const contentWidth = data.length * itemWidth + Math.max(0, data.length - 1) * itemGap;
  const shouldShowDots = showDots && containerWidth > 0 && contentWidth > containerWidth;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const onScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const maxOffset = contentSize.width - layoutMeasurement.width;
    if (maxOffset <= 0) return;

    const progress = contentOffset.x / maxOffset;
    const index = Math.round(progress * (data.length - 1));
    setActiveIndex(index);
  };

  if (data.length === 0) return null;

  return (
    <>
      <View onLayout={handleLayout}>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          snapToInterval={snapInterval}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerClassName={cn('gap-5 pb-4', className)}
          renderItem={({ item, index }) => (
            <View style={{ width: itemWidth }}>{renderItem({ item, index })}</View>
          )}
        />
      </View>

      {shouldShowDots && (
        <View className="flex-row justify-center gap-3">
          {data.map((_, index) => (
            <View
              key={index}
              className={cn(
                'w-3 h-3 rounded-full bg-neutral-200',
                index === activeIndex && 'bg-neutral-600',
              )}
            />
          ))}
        </View>
      )}
    </>
  );
}
