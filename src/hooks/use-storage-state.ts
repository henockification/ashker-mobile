import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  return useStorageStateInternal(key);
}

/**
 * Expiry-aware storage hook (for timers like resend OTP).
 *
 * Stores absolute timestamp (ms) and returns remaining seconds.
 */
export function useExpiryStorageState(key: string): UseStateHook<number> {
  return useStorageStateInternal(key, { isExpiry: true }) as UseStateHook<number>;
}

function useStorageStateInternal(key: string, options?: { isExpiry?: boolean }): UseStateHook<any> {
  const [state, setState] = useAsyncState<any>();

  useEffect(() => {
    const load = async () => {
      let value: string | null = null;

      if (Platform.OS === 'web') {
        try {
          if (typeof localStorage !== 'undefined') {
            value = localStorage.getItem(key);
          }
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      } else {
        value = await SecureStore.getItemAsync(key);
      }

      if (options?.isExpiry && value) {
        const expiry = parseInt(value, 10);
        const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));

        if (remaining <= 0) {
          setState(null);
          setStorageItemAsync(key, null);
        } else {
          setState(remaining);
        }
      } else {
        setState(value);
      }
    };

    load();
  }, [key, options?.isExpiry, setState]);

  const setValue = useCallback(
    (value: any) => {
      if (options?.isExpiry) {
        if (value === null) {
          setState(null);
          setStorageItemAsync(key, null);
        } else {
          const expiryTime = Date.now() + value * 1000;
          setState(value);
          setStorageItemAsync(key, expiryTime.toString());
        }
      } else {
        setState(value);
        setStorageItemAsync(key, value);
      }
    },
    [key, options?.isExpiry, setState],
  );

  return [state, setValue];
}