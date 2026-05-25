import { QueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { RefreshResponse } from '../types/auth';
import { SKIP_AUTH_RELATIVE_PATHS } from '../constants/api';
import { ApiSettings } from '../types/api';
import { AuthManager, DefaultAuthManager } from './auth-manager';
import { tokenStore } from './token-store';

let logoutHandler: (() => void) | null = null;

export const getApiSettings = (): ApiSettings => {
  const hostname = process.env.EXPO_PUBLIC_RETAIN_HOST_NAME;

  switch (hostname) {
    case '127.0.0.1':
    case 'localhost':
      return {
        apiBaseUrl: 'https://api.ein1.app',
        homeDomain: 'www.ein1.app',
      };

    default: {
      return {
        apiBaseUrl: 'https://api.ein1.app',
        homeDomain: 'www.ein1.app',
      };
    }
  }
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