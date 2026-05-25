import type { ImagePickerAsset } from 'expo-image-picker';
import { useCallback, useState } from 'react';

import {
  hasMediaLibraryAccess,
  openAppSettings,
  pickPhotosAndVideos,
  requestCameraPermission,
  requestMediaLibraryPermission,
} from '@/src/utils/media-permissions';

export function useMediaAccessPrompt() {
  const [visible, setVisible] = useState(false);
  const [isEnablingLibrary, setIsEnablingLibrary] = useState(false);
  const [isRequestingCamera, setIsRequestingCamera] = useState(false);
  const [isOpeningPicker, setIsOpeningPicker] = useState(false);

  const close = useCallback(() => setVisible(false), []);
  const showPrompt = useCallback(() => setVisible(true), []);

  const openPicker = useCallback(async (): Promise<ImagePickerAsset[]> => {
    setIsOpeningPicker(true);
    try {
      const result = await pickPhotosAndVideos();
      if (result.canceled || !result.assets?.length) {
        return [];
      }

      return result.assets;
    } finally {
      setIsOpeningPicker(false);
    }
  }, []);

  const openIfNeeded = useCallback(async (): Promise<ImagePickerAsset[]> => {
    try {
      const granted = await hasMediaLibraryAccess();
      if (!granted) {
        setVisible(true);
        return [];
      }

      return await openPicker();
    } catch {
      setVisible(true);
      return [];
    }
  }, [openPicker]);

  const handleEnableAccess = useCallback(async (): Promise<ImagePickerAsset[]> => {
    setIsEnablingLibrary(true);
    try {
      const result = await requestMediaLibraryPermission();
      if (result.granted) {
        setVisible(false);
        return await openPicker();
      }

      if (!result.canAskAgain) {
        openAppSettings();
      }

      return [];
    } catch {
      return [];
    } finally {
      setIsEnablingLibrary(false);
    }
  }, [openPicker]);

  const handleTakePhotoOrVideo = useCallback(async (): Promise<boolean> => {
    setIsRequestingCamera(true);
    try {
      const result = await requestCameraPermission();
      if (result.granted) {
        setVisible(false);
        return true;
      }

      if (!result.canAskAgain) {
        openAppSettings();
      }

      return false;
    } catch {
      return false;
    } finally {
      setIsRequestingCamera(false);
    }
  }, []);

  return {
    visible,
    close,
    showPrompt,
    openIfNeeded,
    handleEnableAccess,
    handleTakePhotoOrVideo,
    isEnablingLibrary,
    isRequestingCamera,
    isOpeningPicker,
  };
}
