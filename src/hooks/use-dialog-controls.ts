import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Platform } from 'react-native';

export function useDialogControls(isOpen: boolean, setOpen: (open: boolean) => void) {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'web' || !isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown, true);

      return () => {
        window.removeEventListener('keydown', handleKeyDown, true);
      };
    }, [isOpen, setOpen]),
  );
}