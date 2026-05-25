const API_BASE = (process.env.EXPO_PUBLIC_API_URL ?? 'https://api.ein1.app').replace(/\/$/, '');

export function resolveBusinessMediaUrl(storageKey: string): string {
  if (/^https?:\/\//i.test(storageKey)) {
    return storageKey;
  }

  return `${API_BASE}/${storageKey.replace(/^\//, '')}`;
}
