import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { cn, useThemeColor } from 'heroui-native';
import { useCallback, useState } from 'react';
import { AccessibilityInfo, BackHandler, Keyboard } from 'react-native';
import { KeyboardAvoidingView, KeyboardController } from 'react-native-keyboard-controller';
import { useCSSVariable } from 'uniwind';

import Close from '@/assets/icons/close.svg';
import { useDialogControls } from '@/src/hooks/use-dialog-controls';

import { Button } from '../ui/button';
import { Popup, PopupAction, PopupConfig } from '../ui/popup';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  variant?: 'light' | 'dark';
  showConfirmOnClose?: boolean;
  popupConfig?: PopupConfig;
}

KeyboardController.preload();

export const FullScreenModalLayout = ({
  children,
  className,
  onClose,
  variant = 'light',
  showConfirmOnClose = false,
  popupConfig,
}: AuthLayoutProps) => {
  const isPresented = router.canGoBack();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const surfaceForegroundColor = useThemeColor('surface-foreground');
  const iconColor = String(useCSSVariable('--color-white'));

  const handleClosePress = useCallback(() => {
    if (showConfirmOnClose) {
      Keyboard.dismiss();
      setIsPopupOpen(true);
      AccessibilityInfo.announceForAccessibility('Confirm exit notice');
    } else {
      if (onClose) {
        onClose();
      } else {
        router.back();
      }
    }
  }, [onClose, showConfirmOnClose]);

  useDialogControls(true, handleClosePress);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        handleClosePress();

        return true;
      });

      return () => subscription.remove();
    }, [handleClosePress]),
  );

  const defaultPrimaryAction = () => setIsPopupOpen(false);
  const defaultSecondaryAction = onClose ? onClose : router.back;

  const mergedActions: PopupAction[] = (
    popupConfig?.actionButtons ?? [{ label: 'Complete' }, { label: 'Skip', type: 'link' }]
  ).map((action, index) => ({
    ...action,
    onPress: action.onPress ?? (index === 0 ? defaultPrimaryAction : defaultSecondaryAction),
  }));

  const PopupContent = {
    title: popupConfig?.title ?? '',
    description: popupConfig?.description ?? '',
    actionButtons: mergedActions,
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className={cn('flex-1 bg-white', className)}
      collapsable={false}
      role="main"
    >
      {(onClose || isPresented) && (
        <>
          <StatusBar style={variant === 'light' ? 'dark' : 'light'} />
          <Button
            variant="ghost"
            className="absolute top-0 native:top-8 right-0 my-4 mx-3 z-10"
            onPress={handleClosePress}
            isIconOnly
            accessibilityRole="button"
            accessibilityLabel={'Close screen'}
            accessibilityHint={showConfirmOnClose ? 'Close with confirm hint' : 'Close hint'}
          >
            <Close
              fill={variant === 'light' ? surfaceForegroundColor : iconColor}
              accessible={false}
            />
          </Button>
          <Popup
            isOpen={isPopupOpen}
            setOpen={setIsPopupOpen}
            title={PopupContent.title}
            description={PopupContent.description}
            actionButtons={PopupContent.actionButtons}
          />
        </>
      )}
      {children}
    </KeyboardAvoidingView>
  );
};
