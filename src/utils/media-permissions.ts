import * as ImagePicker from 'expo-image-picker';
import { Linking, Platform } from 'react-native';

export type MediaPermissionResult = {
  granted: boolean;
  canAskAgain: boolean;
};

export async function getMediaLibraryPermission(): Promise<MediaPermissionResult> {
  if (Platform.OS === 'web') {
    return { granted: true, canAskAgain: true };
  }

  const { granted, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
  return { granted, canAskAgain: canAskAgain ?? true };
}

export async function getCameraPermission(): Promise<MediaPermissionResult> {
  if (Platform.OS === 'web') {
    return { granted: true, canAskAgain: true };
  }

  const { granted, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();
  return { granted, canAskAgain: canAskAgain ?? true };
}

export async function requestMediaLibraryPermission(): Promise<MediaPermissionResult> {
  if (Platform.OS === 'web') {
    return { granted: true, canAskAgain: true };
  }

  const { granted, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return { granted, canAskAgain: canAskAgain ?? true };
}

export async function requestCameraPermission(): Promise<MediaPermissionResult> {
  if (Platform.OS === 'web') {
    return { granted: true, canAskAgain: true };
  }

  const { granted, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();
  return { granted, canAskAgain: canAskAgain ?? true };
}

export async function hasMediaLibraryAccess(): Promise<boolean> {
  const { granted } = await getMediaLibraryPermission();
  return granted;
}

export async function pickPhotosAndVideos() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images', 'videos'],
    allowsMultipleSelection: true,
    quality: 0.5,
  });

  if (!result.canceled && result.assets?.length) {
    return result;
  }

  if (Platform.OS === 'web') {
    return result;
  }

  const pending = await ImagePicker.getPendingResultAsync();
  if (pending && !('code' in pending) && !pending.canceled && pending.assets?.length) {
    return pending;
  }

  return result;
}

export function openAppSettings(): void {
  void Linking.openSettings();
}
