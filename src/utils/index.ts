// Utility functions
import { AxiosError, isAxiosError } from 'axios';
import { Toast } from 'toastify-react-native';

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
      message =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message ??
        fallbackMessage;
    }
  
    Toast.error(message);
  }