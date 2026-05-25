import { ExpoConfig } from 'expo/config';

import packageJson from './package.json';

const packageIdentifier = 'com.ein1.app';
const projectId = '55965636-abf7-4c09-9286-defa3ae63492';

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
  name: `ein1${getAppVariant()}`,
  newArchEnabled: true,
  orientation: 'portrait',
  owner: 'ein1',
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
  scheme: 'ein1',
  slug: 'ein1',
  splash: {
    backgroundColor: '#7d1c1c',
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