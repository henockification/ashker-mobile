const DEFAULT_API_URL = 'https://api.ashker.events';

export const getTenantOrigin = (): string | undefined => {
  const origin = process.env.EXPO_PUBLIC_TENANT_ORIGIN?.trim();
  return origin || undefined;
};

export const getApiBaseUrl = (): string => {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.trim();
  return (fromEnv || DEFAULT_API_URL).replace(/\/$/, '');
};
