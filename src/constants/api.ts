export const PROFILE_FIELDS = {
  name: false,
  email: false,
  image: false,
} as const;

export const RETRY_BACKOFF_BASE_MS = 250;
export const RETRY_BACKOFF_MAX_MS = 2000;
export const RETRY_JITTER_MS = 150;
export const REFRESH_RETRY_COUNT = 3;

export const SKIP_AUTH_RELATIVE_PATHS = [
  'auth/refresh',
  'health',
  'login',
  'public',
  'api/tenant-events',
] as const;
