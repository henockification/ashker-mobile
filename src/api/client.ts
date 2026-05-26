import { QueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';

import { SKIP_AUTH_RELATIVE_PATHS } from '../constants/api';
import { getApiBaseUrl, getTenantOrigin } from '../constants/tenant';
import { ApiSettings } from '../types/api';
import { RefreshResponse } from '../types/auth';
import { AuthManager, DefaultAuthManager } from './auth-manager';
import { tokenStore } from './token-store';

let logoutHandler: (() => void) | null = null;

export const getApiSettings = (): ApiSettings => {
  const apiBaseUrl = getApiBaseUrl();
  const tenantOrigin = getTenantOrigin();

  let homeDomain = 'ashker.events';
  if (tenantOrigin) {
    try {
      homeDomain = new URL(tenantOrigin).host;
    } catch {
      // keep default
    }
  }

  return { apiBaseUrl, homeDomain };
};

const getRelativeApiPath = (url?: string): string | null => {
  if (!url) {
    return null;
  }

  try {
    const baseUrl = apiClient.defaults.baseURL;
    const absolute = new URL(url, baseUrl);
    const basePath = new URL(baseUrl as string).pathname;
    const fullPath = absolute.pathname;

    const relativeFromBase = fullPath.startsWith(basePath)
      ? fullPath.slice(basePath.length)
      : fullPath;

    return relativeFromBase.replace(/^\/+/, '').replace(/\/+$/, '') || null;
  } catch {
    return url.replace(/^\/+/, '').replace(/\/+$/, '') || null;
  }
};

const shouldSkipAuth = (url?: string): boolean => {
  const relativePath = getRelativeApiPath(url);

  if (!relativePath) {
    return false;
  }

  return SKIP_AUTH_RELATIVE_PATHS.some(
    (skipPath) => relativePath === skipPath || relativePath.startsWith(`${skipPath}/`),
  );
};

const settings = getApiSettings();

const normalizeApiBaseUrl = (url: string) => `${url.replace(/\/$/, '')}/`;

export const apiClient = axios.create({
  baseURL: normalizeApiBaseUrl(settings.apiBaseUrl),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const isNetworkError = (error: unknown) => isAxiosError(error) && !error.response;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const refreshTokens = async (refreshToken: string): Promise<RefreshResponse> => {
  const { data } = await apiClient.post<RefreshResponse>('auth/refresh', { refreshToken });
  return data;
};

export const registerLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

apiClient.interceptors.request.use((config) => {
  const tenantOrigin = getTenantOrigin();

  if (tenantOrigin) {
    config.headers.Origin = tenantOrigin;
    config.headers.Referer = tenantOrigin;
  }

  if (shouldSkipAuth(config.url)) {
    return config;
  }

  const accessToken = authManager.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = isAxiosError(error) ? error.config : undefined;

    return authManager.handleUnauthorizedError(
      apiClient,
      error,
      originalRequest,
      shouldSkipAuth,
      logoutHandler,
    );
  },
);

export const authManager: AuthManager = new DefaultAuthManager(tokenStore, refreshTokens);
