import { cn, useThemeColor } from 'heroui-native';
import React, { createContext, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';

import Close from '@/assets/icons/close.svg';

import { Button } from './button';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: 'bottom-sheet' | 'dialog';
}

const BottomSheetContext = createContext<{ onClose: () => void } | null>(null);

const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) {
    throw new Error('BottomSheet components must be used inside <BottomSheet>');
  }
  return ctx;
};

/**
 * @deprecated
 * This custom BottomSheet is part of the legacy UI.
 * * NOTES:
 * This component should be replaced with the BottomSheet component
 * from @heroui-native, which is available in newer versions.
 */
export const BottomSheet = ({ visible, onClose, children }: BottomSheetProps) => {
  return (
    <BottomSheetContext.Provider value={{ onClose }}>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        backdropOpacity={0.24}
        style={{ margin: 0 }}
        backdropTransitionOutTiming={1}
      >
        <View
          className={cn(
            'absolute bottom-0 w-full bg-white rounded-t-2xl max-h-[90%]',
            'md:relative md:mx-auto md:my-auto md:bottom-auto md:w-[540px] md:rounded-xl',
          )}
        >
          {children}
        </View>
      </Modal>
    </BottomSheetContext.Provider>
  );
};

BottomSheet.Close = function BottomSheetClose() {
  const { onClose } = useBottomSheet();
  const surfaceForegroundColor = useThemeColor('surface-foreground');

  return (
    <View className="items-end px-5 pt-5 -mr-3 -mt-2">
      <Button variant="ghost" onPress={onClose} isIconOnly size="md">
        <Close fill={surfaceForegroundColor} />
      </Button>
    </View>
  );
};

BottomSheet.Body = function BottomSheetBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn('px-5', className)}>{children}</View>;
};

BottomSheet.ScrollBody = function BottomSheetBody({
  children,
  className,
  contentContainerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentContainerClassName?: string;
}) {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      className={cn('px-5 pb-12', className)}
      contentContainerClassName={contentContainerClassName}
    >
      {children}
    </ScrollView>
  );
};

BottomSheet.Footer = function BottomSheetFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn('px-5 pt-5 pb-12 border-t-1 border-neutral-300 lg:items-center', className)}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      }}
    >
      {children}
    </View>
  );
};
