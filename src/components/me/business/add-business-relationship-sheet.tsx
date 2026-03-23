import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/src/components/ui/text';

import { AddBusinessLocationFields } from './add-business-location-fields';

const overlay = 'rgba(0,0,0,0.45)';
const buttonBg = '#e5e5e5';
const iconDark = '#18181b';

const isWeb = Platform.OS === 'web' || typeof document !== 'undefined';

/** Simple stand-in for the Yelp-style counter/people illustration; swap for an asset when available. */
function AddBusinessIllustration() {
  return (
    <View className="h-[200px] w-full flex-row items-end justify-center gap-4 px-4">
      <View className="items-center">
        <View className="mb-2 h-14 w-14 rounded-full bg-neutral-300" />
        <View className="h-16 w-12 rounded-lg bg-neutral-400" />
        <View className="mt-1 h-12 w-14 rounded-md bg-neutral-500" />
      </View>
      <View className="h-24 w-40 rounded-t-xl border border-neutral-200 bg-white px-2 pt-3">
        <View className="h-2 w-full rounded bg-neutral-200" />
        <View className="mt-2 flex-row items-center gap-2">
          <View className="h-10 w-10 rounded-full bg-neutral-300" />
          <View className="h-10 flex-1 rounded bg-neutral-100" />
        </View>
      </View>
    </View>
  );
}

export type BusinessRelationshipRole = 'customer' | 'employee';
type WebModalStep = 'relationship' | 'location';

interface AddBusinessRelationshipSheetProps {
  visible: boolean;
  onClose: () => void;
  /** Called when the user picks how they relate to the business. */
  onSelectRelationship?: (role: BusinessRelationshipRole) => void;
}

export function AddBusinessRelationshipSheet({
  visible,
  onClose,
  onSelectRelationship,
}: AddBusinessRelationshipSheetProps) {
  const insets = useSafeAreaInsets();
  const maxSheetHeight = useMemo(() => Dimensions.get('window').height * 0.72, []);
  const webMaxDialogHeight = useMemo(() => Dimensions.get('window').height * 0.9, []);
  const [webStep, setWebStep] = useState<WebModalStep>('relationship');
  const [relationship, setRelationship] = useState<BusinessRelationshipRole | null>(null);

  useEffect(() => {
    if (!visible) return;
    setWebStep('relationship');
    setRelationship(null);
  }, [visible]);

  const handleChoice = (role: BusinessRelationshipRole) => {
    onSelectRelationship?.(role);
    if (isWeb) {
      setRelationship(role);
      setWebStep('location');
      return;
    }

    onClose();
  };

  const body = (
    <>
      <View className="mb-4 flex-row items-start justify-between">
        <Text className="pr-8 text-xl font-bold text-neutral-900">Add a business</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          hitSlop={12}
          onPress={onClose}
          className="-mr-1 -mt-1 p-1"
        >
          <Ionicons name="close" size={28} color={iconDark} />
        </Pressable>
      </View>

      <View className="mb-6 overflow-hidden rounded-2xl bg-neutral-100 py-4">
        <AddBusinessIllustration />
      </View>

      <Text className="mb-6 px-1 text-center text-base leading-6 text-neutral-800">
        What&apos;s your relationship with the business you&apos;d like to add?
      </Text>

      <Pressable
        accessibilityRole="button"
        className="mb-3 w-full items-center rounded-xl py-4"
        style={{ backgroundColor: buttonBg }}
        onPress={() => handleChoice('customer')}
      >
        <Text className="text-base font-medium text-neutral-900">I&apos;m a customer</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        className="w-full items-center rounded-xl py-4"
        style={{ backgroundColor: buttonBg }}
        onPress={() => handleChoice('employee')}
      >
        <Text className="text-base font-medium text-neutral-900">I work at the business</Text>
      </Pressable>
    </>
  );

  const webRelationshipStep = (
    <>
      <View className="mb-4 flex-row items-start justify-between">
        <Text className="pr-8 text-xl font-bold text-neutral-900">Add a business</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          hitSlop={12}
          onPress={onClose}
          className="-mr-1 -mt-1 p-1"
        >
          <Ionicons name="close" size={28} color={iconDark} />
        </Pressable>
      </View>

      <View className="mb-4 overflow-hidden rounded-2xl bg-neutral-100 py-4">
        <AddBusinessIllustration />
      </View>

      <Text className="mb-5 px-1 text-center text-base leading-6 text-neutral-800">
        What&apos;s your relationship with the business you&apos;d like to add?
      </Text>

      <Pressable
        accessibilityRole="button"
        className="mb-3 w-full items-center rounded-xl py-4"
        style={{ backgroundColor: buttonBg }}
        onPress={() => handleChoice('customer')}
      >
        <Text className="text-base font-medium text-neutral-900">I&apos;m a customer</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        className="w-full items-center rounded-xl py-4"
        style={{ backgroundColor: buttonBg }}
        onPress={() => handleChoice('employee')}
      >
        <Text className="text-base font-medium text-neutral-900">I work at the business</Text>
      </Pressable>
    </>
  );

  const webLocationStep = (
    <>
      <View className="-mx-5 mb-4 border-b border-neutral-200 px-5 py-3">
        <View className="flex-row items-center justify-between">
          <Pressable accessibilityRole="button" onPress={onClose}>
            <Text className="text-base text-neutral-700">Cancel</Text>
          </Pressable>
          <Text className="text-xl font-bold text-neutral-900">Add Business</Text>
          <Pressable accessibilityRole="button" onPress={onClose}>
            <Text className="text-base font-semibold text-neutral-900">Add</Text>
          </Pressable>
        </View>
        {relationship ? (
          <Text className="mt-2 text-center text-xs text-neutral-500">
            Relationship: {relationship === 'customer' ? 'Customer' : 'I work at the business'}
          </Text>
        ) : null}
      </View>

      <AddBusinessLocationFields variant="web" />
    </>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType={isWeb ? 'fade' : 'slide'}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {isWeb ? (
        <View className="flex-1 justify-center px-5 py-8">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            className="absolute inset-0"
            style={{ backgroundColor: overlay }}
            onPress={onClose}
          />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            className="mx-auto w-full max-w-[720px] rounded-2xl bg-white px-5 pt-4 pb-6 shadow-2xl"
            style={{
              maxHeight: webMaxDialogHeight,
            }}
          >
            {webStep === 'relationship' ? webRelationshipStep : webLocationStep}
          </ScrollView>
        </View>
      ) : (
        <View className="flex-1 justify-end">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            className="absolute inset-0"
            style={{ backgroundColor: overlay }}
            onPress={onClose}
          />

          <View
            className="w-full overflow-hidden rounded-t-3xl bg-white px-5 pt-4"
            style={{
              maxHeight: maxSheetHeight,
              paddingBottom: Math.max(insets.bottom, 16) + 16,
            }}
          >
            {body}
          </View>
        </View>
      )}
    </Modal>
  );
}
