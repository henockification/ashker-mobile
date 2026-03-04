import { Picker } from '@react-native-picker/picker';
import { cn } from 'heroui-native';
import React, { useRef, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import ChevronDown from '@/assets/icons/chevron-down.svg';

import { BottomSheet } from './bottom-sheet';

type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

interface DropdownProps<T extends string> {
  selected: T;
  onSelect: (value: T) => void;
  options: DropdownOption<T>[];
  disabled?: boolean;
  className?: string;
}

export function Dropdown<T extends string>({
  selected,
  onSelect,
  options,
  disabled = false,
  className,
}: DropdownProps<T>) {
  const buttonIconColor = String(useCSSVariable('--color-neutral-700'));
  const pickerRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [pickerWidth, setPickerWidth] = useState<number>(0);

  const openModalPicker = () => setModalVisible(true);
  const closeModalPicker = () => setModalVisible(false);

  const selectedLabel = options.find((o) => o.value === selected)?.label || 'Select';

  if (Platform.OS === 'ios') {
    return (
      <View>
        <Pressable
          onPress={openModalPicker}
          className="flex-row items-center gap-2 px-2"
          disabled={disabled}
        >
          <Text className="text-neutral-700 font-semibold text-base text-end">{selectedLabel}</Text>
          <ChevronDown stroke={buttonIconColor} />
        </Pressable>

        <BottomSheet visible={modalVisible} onClose={closeModalPicker}>
          <BottomSheet.Body>
            <Picker
              ref={pickerRef}
              selectedValue={selected}
              onValueChange={(v) => {
                onSelect(v);
                closeModalPicker();
              }}
              className="bg-white"
            >
              {options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </BottomSheet.Body>
        </BottomSheet>
      </View>
    );
  }

  return (
    <View className={cn('relative', className)}>
      {/* Hidden text used for measurement */}
      <Text
        pointerEvents="none"
        numberOfLines={1}
        className="absolute opacity-0 px-2"
        onLayout={(e) => {
          const extra = Platform.OS === 'ios' ? 0 : 48;
          setPickerWidth(Math.ceil(e.nativeEvent.layout.width) + extra);
        }}
      >
        {selectedLabel}
      </Text>

      <Picker
        ref={pickerRef}
        selectedValue={selected}
        onValueChange={(v) => onSelect(v)}
        className={cn('px-2', !disabled && 'cursor-pointer')}
        style={[
          { color: 'transparent' },
          Platform.OS === 'android' ? { height: 24, width: pickerWidth } : { width: pickerWidth },
        ]}
        enabled={!disabled}
      >
        {options.map((option) => (
          <Picker.Item label={option.label} value={option.value} key={option.value} />
        ))}
      </Picker>

      {Platform.OS === 'android' && (
        <Pressable
          className="absolute left-0 right-0 flex-1 top-0 px-2"
          pointerEvents="none"
          disabled={disabled}
        >
          <Text className="text-neutral-700 font-semibold text-base text-end">{selectedLabel}</Text>
        </Pressable>
      )}

      {Platform.OS === 'web' && (
        <Pressable
          className="absolute left-0 right-0 flex-1 flex-row items-center justify-center gap-2"
          pointerEvents="none"
          disabled={disabled}
        >
          <Text className="text-neutral-700 font-semibold text-base text-end">{selectedLabel}</Text>
          <ChevronDown stroke={buttonIconColor} />
        </Pressable>
      )}
    </View>
  );
}
