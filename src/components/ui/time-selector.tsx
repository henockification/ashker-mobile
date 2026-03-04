import { cn, ErrorView, TextField } from 'heroui-native';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useMaskedInputProps } from 'react-native-mask-input';

import { Text } from '@/src/components/ui/text';

import { Dropdown } from './dropdown';

export type TimeValue = {
  hour: string;
  minute: string;
  period: string;
};

interface TimeSelectorProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  onBlur?: () => void;
  disabled?: boolean;
  hourError?: string;
  minuteError?: string;
  periodError?: string;
}

const HOUR_MASK = [/[0-1]/, /[0-9]/];
const MINUTE_MASK = [/[0-5]/, /[0-9]/];

export const TimeSelector = ({
  value,
  onChange,
  disabled,
  onBlur,
  hourError,
  minuteError,
  periodError,
}: TimeSelectorProps) => {
  const hasError = Boolean(hourError || minuteError || periodError);

  const update = (patch: Partial<TimeValue>) => onChange({ ...value, ...patch });

  const maskedHourInputProps = useMaskedInputProps({
    value: value.hour,
    onChangeText: (masked) => update({ hour: masked }),
    mask: HOUR_MASK,
  });
  const maskedMinutesInputProps = useMaskedInputProps({
    value: value.minute,
    onChangeText: (masked) => update({ minute: masked }),
    mask: MINUTE_MASK,
  });

  return (
    <>
      <View className={cn('flex-row items-center gap-2', disabled && 'opacity-50')}>
        <TextField isInvalid={hasError} isDisabled={disabled}>
          <TextField.Input
            className="rounded-md border-2 border-neutral-600 w-[52px] h-[47px]"
            keyboardType="number-pad"
            autoCorrect={false}
            spellCheck={false}
            onBlur={onBlur}
            {...maskedHourInputProps}
          />
        </TextField>
        <Text>:</Text>
        <TextField isInvalid={hasError} isDisabled={disabled}>
          <TextField.Input
            className="rounded-md border-2 border-neutral-600 w-[52px] h-[47px]"
            keyboardType="number-pad"
            autoCorrect={false}
            spellCheck={false}
            onBlur={onBlur}
            {...maskedMinutesInputProps}
          />
        </TextField>

        <View
          className={cn(
            'flex-row rounded-md border-2 border-neutral-600 overflow-hidden ml-2 h-[47px] justify-center items-center',
            disabled && 'opacity-50',
          )}
        >
          {Platform.OS === 'web' ? (
            <Dropdown
              options={[
                { value: 'AM', label: 'AM' },
                { value: 'PM', label: 'PM' },
              ]}
              onSelect={(val) => update({ period: val })}
              selected={value.period}
              disabled={disabled}
            />
          ) : (
            <>
              {['AM', 'PM'].map((period) => {
                const selected = value.period === period;

                return (
                  <Pressable
                    key={period}
                    onPress={() => update({ period })}
                    disabled={disabled}
                    className={cn(
                      'px-3 h-full items-center justify-center',
                      selected ? 'bg-neutral-600' : 'bg-transparent',
                    )}
                  >
                    <Text
                      className={cn('font-semibold', selected ? 'text-white' : 'text-neutral-700')}
                    >
                      {period}
                    </Text>
                  </Pressable>
                );
              })}
            </>
          )}
        </View>
      </View>

      <ErrorView isInvalid={hasError}>{hourError ?? minuteError ?? periodError}</ErrorView>
    </>
  );
};
