import { cn } from 'heroui-native';
import React, { useRef, useState } from 'react';
import {
  ActionSheetIOS,
  Modal,
  Platform,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { useCSSVariable } from 'uniwind';

import ChevronDown from '@/assets/icons/chevron-down.svg';

import { Text } from './text';

type Option = {
  key: string;
  label: string;
  action: () => void;
};

type SelectProps = {
  label: string;
  options: Option[];
  className?: string;
};

export function Select({ label, options, className }: SelectProps) {
  const iconColor = String(useCSSVariable('--color-neutral-600'));
  const anchorRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  const { width: screenW, height: screenH } = useWindowDimensions();

  const openIOS = () => {
    const labels = options.map((o) => o.label);
    const cancelButtonIndex = labels.length;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...labels, 'Cancel'],
        cancelButtonIndex,
      },
      (index) => {
        if (index === cancelButtonIndex) return;
        options[index].action();
      },
    );
  };

  const openDropdown = () => {
    anchorRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ x, y, w, h });
      setOpen(true);
    });
  };

  const onPress = () => {
    if (Platform.OS === 'ios') {
      openIOS();
    } else {
      openDropdown();
    }
  };

  return (
    <>
      {/* Button */}
      <View ref={anchorRef} collapsable={false}>
        <Pressable
          onPress={onPress}
          className={cn(
            'px-2 py-1 rounded-md flex-row items-center justify-between gap-2 bg-white',
            className,
          )}
        >
          <Text className="text-base font-semibold">{label}</Text>
          <ChevronDown stroke={iconColor} width={12} height={12} />
        </Pressable>
      </View>

      {/* Dropdown (Web / Android) */}
      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          <View className="flex-1 bg-black/20" />
        </Pressable>

        {anchor && (
          <View
            className="absolute bg-white border border-neutral-200 rounded-xl overflow-hidden"
            style={{
              left: Math.max(12, Math.min(anchor.x, screenW - 220)),
              top: Math.min(anchor.y + anchor.h + 8, screenH - 12),
              width: Math.min(220, screenW - 24),
            }}
          >
            {options.map((opt, i) => (
              <Pressable
                key={opt.key}
                onPress={() => {
                  setOpen(false);
                  opt.action();
                }}
                className={cn(
                  'px-4 py-3',
                  i !== options.length - 1 && 'border-b border-neutral-100',
                )}
              >
                <Text className="text-base">{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </Modal>
    </>
  );
}
