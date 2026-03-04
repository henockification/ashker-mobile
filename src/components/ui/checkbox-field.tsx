import { Checkbox, cn, FormField } from 'heroui-native';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import Check from '@/assets/icons/check.svg';

import { Text } from './text';

interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  variant?: 'primary' | 'secondary';
  children?: ReactElement;
  disableToggle?: boolean;
}

export const CheckboxField = ({
  isSelected,
  onSelectedChange,
  title,
  description,
  className,
  titleClassName,
  variant = 'primary',
  children,
  disableToggle = false,
}: CheckboxFieldProps) => {
  const iconColor = String(useCSSVariable('--color-white'));

  return (
    <FormField
      className={cn(variant === 'primary' && 'gap-3', 'items-start', className)}
      isSelected={isSelected}
      onSelectedChange={(v) => {
        if (disableToggle) {
          return;
        }
        onSelectedChange(v);
      }}
    >
      <FormField.Indicator>
        <Checkbox
          className={cn(
            'border-1 rounded-md items-center justify-center bg-transparent',
            variant === 'secondary' ? 'border-field-border' : 'border-accent',
            isSelected && (variant === 'secondary' ? 'bg-field-border' : 'bg-accent'),
          )}
        >
          {isSelected && <Check width={12} height={10} stroke={iconColor} />}
        </Checkbox>
      </FormField.Indicator>

      <View className="flex-shrink-0 flex-1">
        <FormField.Label>
          <Text className={cn('font-normal', titleClassName)}>{title}</Text>
        </FormField.Label>

        {description && (
          <FormField.Description>
            <Text className="text-neutral-700 text-sm">{description}</Text>
          </FormField.Description>
        )}
        {children}
      </View>
    </FormField>
  );
};
