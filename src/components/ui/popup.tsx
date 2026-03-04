import { cn, Dialog, useThemeColor } from 'heroui-native';
import React, { ReactElement } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import Close from '@/assets/icons/close.svg';

import { Button } from './button';
import { Text } from './text';

type ActionButtonType = 'accent' | 'default' | 'danger' | 'muted' | 'link';

export type PopupAction = {
  label: string;
  onPress?: () => void;
  type?: ActionButtonType;
  disabled?: boolean;
  isLoading?: boolean;
};

export type PopupConfig = {
  title: string;
  description?: string;
  actionButtons: PopupAction[];
  actionButtonsClassName?: string;
  children?: ReactElement;
};

interface PopupProps extends PopupConfig {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const BUTTON_STYLES: Record<
  NonNullable<PopupAction['type']>,
  {
    variant: 'primary' | 'secondary' | 'ghost';
    className?: string;
    labelClassName?: string;
  }
> = {
  default: {
    variant: 'secondary',
    className: 'bg-surface',
    labelClassName: 'text-surface-foreground',
  },
  accent: {
    variant: 'primary',
  },
  danger: {
    variant: 'primary',
    className: 'bg-danger-700',
  },
  muted: {
    variant: 'primary',
    className: 'bg-neutral-700',
  },
  link: {
    variant: 'ghost',
  },
};

export const Popup = ({
  isOpen,
  setOpen,
  title,
  description,
  actionButtons,
  actionButtonsClassName,
  children,
}: PopupProps) => {
  const surfaceForegroundColor = useThemeColor('surface-foreground');

  const resolveButtonType = (button: PopupAction, index: number): ActionButtonType => {
    if (button.type) {
      return button.type;
    }

    return index === 0 ? 'accent' : 'default';
  };

  return (
    <Dialog isOpen={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal className="items-center">
        <Dialog.Overlay isCloseOnPress={Platform.OS === 'web'} />

        <KeyboardAvoidingView behavior="padding">
          <Dialog.Content
            className="
            rounded-xl
            p-7 lg:p-12
            w-full
            md:max-w-[400px] lg:max-w-[500px]
            gap-5
          "
          >
            <Dialog.Close className="self-end -mt-2 -mr-2">
              <Close fill={surfaceForegroundColor} />
            </Dialog.Close>

            <Dialog.Title className="flex self-center">
              <Text className="text-2xl text-center text-neutral-800 font-semibold">{title}</Text>
            </Dialog.Title>

            {description && (
              <Dialog.Description className="flex self-center">
                <Text className="text-center text-neutral-900">{description}</Text>
              </Dialog.Description>
            )}

            {children}

            <View className={cn('gap-5 mt-4', actionButtonsClassName)}>
              {actionButtons.map((button, index) => {
                const type = resolveButtonType(button, index);
                const styles = BUTTON_STYLES[type];

                return (
                  <Button
                    key={index}
                    onPress={button.onPress ?? (() => setOpen(false))}
                    className={styles.className}
                    variant={styles.variant}
                    isDisabled={button.disabled}
                    isLoading={button.isLoading}
                  >
                    <Button.Label className={styles.labelClassName}>{button.label}</Button.Label>
                  </Button>
                );
              })}
            </View>
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
};
