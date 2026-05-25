import type { TokenStore } from '@/src/api/token-store';
import {
  REFRESH_RETRY_COUNT,
  RETRY_BACKOFF_BASE_MS,
  RETRY_BACKOFF_MAX_MS,
  RETRY_JITTER_MS,
} from '@/src/constants/api';
import { ApiClient, RequestConfig } from '@/src/types/api';
import { AuthCallbacks, RefreshedTokens, RefreshTokensFn } from '@/src/types/auth';

class StaleRefreshError extends Error {
  constructor(tokenVersion: number) {
    super(`Stale refresh attempt for token version: ${tokenVersion}`);
  }
}

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const getErrorStatus = (error: unknown): number | undefined => {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return undefined;
  }

  const response = (error as { response?: { status?: number } }).response;

  return typeof response?.status === 'number' ? response.status : undefined;
};

const getRetryDelayMs = (attemptNumber: number): number => {
  const expoBackoff = RETRY_BACKOFF_BASE_MS * 2 ** (attemptNumber - 1);
  const jitter = Math.floor(Math.random() * RETRY_JITTER_MS);

  return Math.min(RETRY_BACKOFF_MAX_MS, expoBackoff + jitter);
};

export interface AuthManager {
  clearAuthCallbacks(): void;
  clearTokens(): void;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  handleUnauthorizedError(
    apiClient: ApiClient,
    error: unknown,
    originalRequest: RequestConfig | undefined,
    shouldSkipAuth: (url?: string) => boolean,
    logoutHandler: (() => void) | null,
  ): Promise<unknown>;
  registerAuthCallbacks(cb: AuthCallbacks): void;
  setTokens(accessToken: string | null, refreshToken: string | null): void;
}

export class DefaultAuthManager implements AuthManager {
  private callbacks: AuthCallbacks | null = null;
  private hasNotifiedSessionExpired = false;
  private isRefreshing = false;
  private refreshPromise: Promise<RefreshedTokens> | null = null;
  private tokenVersion = 0;

  constructor(
    private readonly store: TokenStore,
    private readonly refreshTokensFn: RefreshTokensFn,
  ) {}

  clearAuthCallbacks(): void {
    this.callbacks = null;
  }

  clearTokens(): void {
    this.store.clear();
    this.updateTokenVersion();
  }

  getAccessToken(): string | null {
    return this.store.getAccessToken();
  }

  getRefreshToken(): string | null {
    return this.store.getRefreshToken();
  }

  async handleUnauthorizedError(
    apiClient: ApiClient,
    responseError: unknown,
    originalRequest: RequestConfig | undefined,
    shouldSkipAuth: (url?: string) => boolean,
    logoutHandler: (() => void) | null,
  ): Promise<unknown> {
    const status = getErrorStatus(responseError);
    const url = originalRequest?.url ?? '';

    // Skip error handling for non-auth related statuses, for specific URLs, or if request has been
    //  already retried so there's no need to retry again
    if (
      status !== 401 ||
      shouldSkipAuth(url) ||
      !originalRequest ||
      originalRequest._retry === true
    ) {
      if (status === 401) {
        logoutHandler?.();
      }

      throw responseError;
    }

    const refreshToken = this.store.getRefreshToken();

    // Skip error handling if refresh token expired
    if (!refreshToken) {
      this.notifySessionExpired();
      logoutHandler?.();

      throw responseError;
    }

    try {
      const refreshedTokens = await this.refreshTokenWithLock(refreshToken);

      // Update the request with the new access token before re-sending the request
      originalRequest._retry = true;
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${refreshedTokens.accessToken}`;

      return await apiClient.request(originalRequest);
    } catch (error) {
      if (error instanceof StaleRefreshError) {
        logoutHandler?.();

        throw responseError;
      }

      this.notifySessionExpired();
      logoutHandler?.();

      throw responseError;
    }
  }

  registerAuthCallbacks(cb: AuthCallbacks): void {
    this.callbacks = cb;
  }

  setTokens(accessToken: string | null, refreshToken: string | null): void {
    this.store.setTokens(accessToken, refreshToken);
    this.updateTokenVersion();
    this.hasNotifiedSessionExpired = false;
  }

  private async attemptRefresh(
    refreshToken: string,
    retriesLeft: number,
  ): Promise<RefreshedTokens> {
    try {
      const data = await this.refreshTokensFn(refreshToken);

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? refreshToken,
      };
    } catch (error) {
      const status = getErrorStatus(error);

      if (retriesLeft > 0 && status !== 401 && status !== 403) {
        const attemptNumber = REFRESH_RETRY_COUNT - retriesLeft + 1;

        await delay(getRetryDelayMs(attemptNumber));

        return this.attemptRefresh(refreshToken, retriesLeft - 1);
      }

      throw error;
    }
  }

  private notifySessionExpired(): void {
    if (this.hasNotifiedSessionExpired) {
      return;
    }

    this.hasNotifiedSessionExpired = true;
    this.callbacks?.onSessionExpired();
  }

  private async refreshTokenWithLock(refreshToken: string): Promise<RefreshedTokens> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;

    const versionAtStart = this.tokenVersion;

    this.refreshPromise = (async () => {
      try {
        const refreshTokenUnchanged = this.store.getRefreshToken() === refreshToken;

        if (this.tokenVersion !== versionAtStart || !refreshTokenUnchanged) {
          throw new StaleRefreshError(this.tokenVersion);
        }

        const refreshedTokens = await this.attemptRefresh(refreshToken, REFRESH_RETRY_COUNT);

        this.setTokens(refreshedTokens.accessToken, refreshedTokens.refreshToken);

        this.callbacks?.onTokensRefreshed(
          refreshedTokens.accessToken,
          refreshedTokens.refreshToken,
        );

        return refreshedTokens;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private updateTokenVersion(): void {
    this.tokenVersion += 1;
  }
}