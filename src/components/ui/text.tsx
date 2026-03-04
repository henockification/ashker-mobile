import { cn } from 'heroui-native';
import { forwardRef } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

export const Text = forwardRef<RNText, RNTextProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <RNText
      ref={ref}
      className={cn('font-normal text-lg text-neutral-800', className)}
      {...restProps}
    />
  );
});

Text.displayName = 'Text';
