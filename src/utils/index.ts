// Utility functions
import { AxiosError, isAxiosError } from 'axios';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Toast } from 'toastify-react-native';

export function getAppVersionString() {
  const version = Constants.expoConfig?.version;
  const updateId = Updates.updateId?.slice(0, 8);
  return updateId ? `v${version} (${updateId})` : `v${version}`;
}

export const getFirstLetter = (value?: string | null) => value?.trim().charAt(0) ?? '';

export const capitalize = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export function handleApiError(
  error: any,
  fallbackMessage = 'Something went wrong. Please try again.',
) {
  let message = fallbackMessage;

  if (isAxiosError(error)) {
    if (error.response?.status === 413) {
      message = 'This file is too large to upload. Try a smaller photo or a shorter video.';
    } else {
      message =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message ??
        fallbackMessage;
    }
  }

  Toast.error(message);
}
