import { Platform } from 'react-native';

export const defaultHederHeight = Platform.select({
    ios: 58,
    android: 58,
    default: 64,
  });