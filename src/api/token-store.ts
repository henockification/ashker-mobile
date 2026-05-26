export interface TokenStore {
  clear(): void;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setTokens(accessToken: string | null, refreshToken: string | null): void;
}

class InMemoryTokenStore implements TokenStore {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  clear(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  setTokens(accessToken: string | null, refreshToken: string | null): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export const tokenStore: TokenStore = new InMemoryTokenStore();
