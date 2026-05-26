import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/src/components/ui/text';

import { Button } from './button';

function PhotosAccessIllustration() {
  return (
    <View className="h-28 w-32 items-center justify-center">
      <View
        className="absolute left-1 top-3 h-[72px] w-[58px] rounded-sm border-2 border-neutral-800 bg-white"
        style={{ transform: [{ rotate: '-10deg' }] }}
      />
      <View
        className="absolute right-1 top-0 h-[72px] w-[58px] items-center justify-center rounded-sm border-2 border-neutral-800 bg-white"
        style={{ transform: [{ rotate: '8deg' }] }}
      >
        <View className="h-9 w-9 bg-primary-600" />
      </View>
    </View>
  );
}

export type MediaAccessPromptProps = {
  appName?: string;
  onCancel: () => void;
  onEnableAccess: () => void;
  onTakePhotoOrVideo: () => void;
  isEnablingLibrary?: boolean;
  isRequestingCamera?: boolean;
};

export function MediaAccessPrompt({
  appName = 'Ein1',
  onCancel,
  onEnableAccess,
  onTakePhotoOrVideo,
  isEnablingLibrary = false,
  isRequestingCamera = false,
}: MediaAccessPromptProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View
        className="border-b border-neutral-200 px-4"
        style={{ paddingTop: Math.max(insets.top, 12), paddingBottom: 12 }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancel"
          onPress={onCancel}
          className="self-start py-1"
        >
          <Text className="text-base text-neutral-800">Cancel</Text>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <PhotosAccessIllustration />
        <Text className="mt-8 text-center text-xl font-bold text-neutral-900">
          No access to photos
        </Text>
        <Text className="mt-2 text-center text-base leading-6 text-neutral-500">
          Allow {appName} access to your library so you can add your photos.
        </Text>
      </View>

      <View className="gap-3 px-5" style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}>
        <Button
          className="w-full"
          isLoading={isEnablingLibrary}
          onPress={onEnableAccess}
          accessibilityLabel="Enable access to photos"
        >
          <Button.Label>Enable access</Button.Label>
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          isLoading={isRequestingCamera}
          onPress={onTakePhotoOrVideo}
          accessibilityLabel="Take photo or video"
        >
          <Button.Label>Take photo or video</Button.Label>
        </Button>
      </View>
    </View>
  );
}

export type MediaAccessPromptModalProps = MediaAccessPromptProps & {
  visible: boolean;
};

export function MediaAccessPromptModal({ visible, ...promptProps }: MediaAccessPromptModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={promptProps.onCancel}
    >
      <MediaAccessPrompt {...promptProps} />
    </Modal>
  );
}
