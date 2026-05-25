export type ApiError = {
  code: string;
  message: string;
};

export type AuthCallbacks = {
  onSessionExpired: () => void;
  onTokensRefreshed: (accessToken: string, refreshToken: string | null) => void;
};

export type NormalizedSignInResponse = {
  accessToken: string;
  refreshToken?: string;
  success?: boolean;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
  success?: boolean;
};

export type RefreshedTokens = {
  accessToken: string;
  refreshToken: string | null;
};

export type RefreshTokensFn = (refreshToken: string) => Promise<RefreshResponse>;

export type ResetPasswordPayload = {
  emailAddress: string;
};

export type SignInPayload = {
  email: string;
  rememberMe: boolean;
  password: string;
};

export type SignInResponse = {
  success: boolean;
  userId?: number;
  type?: string;
};

export type SignUpPayload = {
  email: string;
  name: string;
  password: string;
  rememberMe: boolean;
  utcOffset?: number;
};

export type SignUpErrorResponse = {
  error: string;
};

export type AuthApiUser = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
};

/** Parsed session stored after sign-in / sign-up (user profile or token fallback). */
export type SessionData = AuthApiUser | { token: string };

export type AuthApiResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  redirect?: boolean;
  user?: AuthApiUser;
};

export type ParsedAuthResponse = {
  accessToken: string;
  refreshToken: string | null;
  user: AuthApiUser | null;
};

export type SignUpResponse = AuthApiResponse;