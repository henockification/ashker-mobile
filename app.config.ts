import { ExpoConfig } from 'expo/config';

import packageJson from './package.json';

const packageIdentifier = 'com.ashker.review';
const projectId = '';

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
      foregroundImage: './assets/app/adaptive-icon.png',
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
  name: `Project X${getAppVariant()}`,
  newArchEnabled: true,
  orientation: 'portrait',
  owner: 'project-x',
  plugins: ['expo-localization', 'expo-notifications', 'expo-router', 'expo-secure-store'],
  runtimeVersion: {
    policy: 'appVersion',
  },
  scheme: 'project-x',
  slug: packageJson.name,
  splash: {
    backgroundColor: '#163550',
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
