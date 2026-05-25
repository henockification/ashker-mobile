import type { AuthApiResponse, ParsedAuthResponse } from '@/src/types/auth';

export function parseAuthResponse(data: unknown): ParsedAuthResponse {
  let parsed: AuthApiResponse | null = null;

  if (typeof data === 'string') {
    const trimmed = data.trim();

    try {
      parsed = JSON.parse(trimmed) as AuthApiResponse;
    } catch {
      return {
        accessToken: trimmed,
        refreshToken: null,
        user: null,
      };
    }
  } else if (data && typeof data === 'object') {
    parsed = data as AuthApiResponse;
  }

  const accessToken = parsed?.token ?? parsed?.accessToken;

  if (!accessToken) {
    throw new Error('Invalid auth response: missing token');
  }

  return {
    accessToken,
    refreshToken: parsed?.refreshToken ?? null,
    user: parsed?.user ?? null,
  };
}
