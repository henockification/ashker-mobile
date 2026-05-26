import { ExpoConfig } from 'expo/config';

import packageJson from './package.json';

const packageIdentifier = 'com.ashker-hub.app';
const projectId = '87bbdf20-136e-4b32-9d63-0de0fca08abe';

const getAppVariant = (): string => {
  switch (process.env.EXPO_PUBLIC_APP_VARIANT) {
    case 'dev':
    case 'stage':
      return ` (${process.env.EXPO_PUBLIC_APP_VARIANT})`;

    case 'prod':
      return '';

    default:
      return ' (local)';
  }
};

const config: ExpoConfig = {
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff',
      foregroundImage: './assets/app/icon.png',
    },
    edgeToEdgeEnabled: true,
    package: packageIdentifier,
    predictiveBackGestureEnabled: false,
  },
  extra: {
    eas: {
      projectId,
    },
    router: {},
  },
  icon: './assets/app/icon.png',
  ios: {
    bundleIdentifier: packageIdentifier,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    supportsTablet: true,
  },
  name: `ashker-hub${getAppVariant()}`,
  newArchEnabled: true,
  orientation: 'portrait',
  owner: 'ashker-events',
  plugins: [
    'expo-localization',
    'expo-notifications',
    'expo-router',
    'expo-secure-store',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Allow Ein1 to access your photos so you can add them to businesses.',
        cameraPermission:
          'Allow Ein1 to access your camera so you can take photos and videos.',
      },
    ],
  ],
  runtimeVersion: packageJson.version,
  scheme: 'ashker-hub',
  slug: 'ashker-hub',
  splash: {
    backgroundColor: '#fafafa',
    image: './assets/app/splash-icon.png',
  },
  updates: {
    url: `https://u.expo.dev/${projectId}`,
  },
  userInterfaceStyle: 'light',
  version: packageJson.version,
  web: {
    bundler: 'metro',
    favicon: './assets/app/favicon.png',
  },
};

export default config;