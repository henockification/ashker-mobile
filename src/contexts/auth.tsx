import { AxiosError } from 'axios';
import { router } from 'expo-router';
import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import { Toast } from 'toastify-react-native';

import { type AuthManager } from '@/src/api/auth-manager';
import {
  authManager as defaultAuthManager,
  isNetworkError,
  queryClient,
  registerLogoutHandler,
} from '@/src/api/client';
import { parseAuthResponse } from '@/src/api/parse-auth-response';
import { routes } from '@/src/constants/routes';
import { useSignIn } from '@/src/hooks/use-sign-in';
import { useSignUp } from '@/src/hooks/use-sign-up';
import { useStorageState } from '@/src/hooks/use-storage-state';
import {
  ParsedAuthResponse,
  RefreshResponse,
  SessionData,
  SignInPayload,
  SignInResponse,
  SignUpErrorResponse,
  SignUpPayload,
  SignUpResponse,
} from '@/src/types/auth';

const AuthContext = createContext<{
  signIn: (payload: SignInPayload) => Promise<SignInResponse>;
  signOut: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<SignUpResponse | SignUpErrorResponse>;
  establishAuthSession: (auth: ParsedAuthResponse) => void;

  accessToken?: string | null;
  refreshToken?: string | null;
  session: SessionData | null;

  isLoading: boolean;
  isAuthenticated: boolean;
  isAuthorized: boolean;
}>({
  signIn: () => {
    throw new Error('signIn must be used within SessionProvider');
  },
  signOut: () => {
    throw new Error('signOut must be used within SessionProvider');
  },
  signUp: () => {
    throw new Error('signUp must be used within SessionProvider');
  },
  establishAuthSession: () => {
    throw new Error('establishAuthSession must be used within SessionProvider');
  },

  accessToken: null,
  refreshToken: null,
  session: null,

  isLoading: false,
  isAuthenticated: false,
  isAuthorized: false,
});

export function useSession() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export type SessionProviderProps = PropsWithChildren<{
  authManager?: AuthManager;
}>;

export function SessionProvider({
  children,
  authManager = defaultAuthManager,
}: SessionProviderProps) {
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();

  const [[, accessToken], setAccessToken] = useStorageState('accessToken');
  const [[, refreshToken], setRefreshToken] = useStorageState('refreshToken');
  const [[isLoading, session], setSession] = useStorageState('session');

  const establishAuthSession = useCallback(
    (auth: ParsedAuthResponse) => {
      authManager.setTokens(auth.accessToken, auth.refreshToken);
      setAccessToken(auth.accessToken);
      setRefreshToken(auth.refreshToken ?? '');
      setSession(JSON.stringify(auth.user ?? { token: auth.accessToken }));
    },
    [authManager, setAccessToken, setRefreshToken, setSession],
  );

  const signIn = async (payload: SignInPayload) => {
    try {
      const auth = await signInMutation.mutateAsync(payload);
      establishAuthSession(auth);

      return { success: true };
    } catch (error) {
      if (isNetworkError(error)) {
        return { success: false, type: 'network' };
      }

      return { success: false, type: 'credentials' };
    }
  };

  const signUp = async (payload: SignUpPayload): Promise<SignUpResponse | SignUpErrorResponse> => {
    try {
      return await signUpMutation.mutateAsync(payload);
    } catch (error) {
      if (isNetworkError(error)) {
        // CORS, offline, DNS, SSL, etc.
        throw new Error('NETWORK_ERROR');
      } else if (
        (error as AxiosError).response?.data &&
        (error as AxiosError).response?.status === 409
      ) {
        return (error as AxiosError).response?.data as SignUpErrorResponse;
      }

      Toast.error('Error');

      throw error;
    }
  };

  const signOut = useCallback(async () => {
    authManager.clearTokens();
    queryClient.clear();

    setAccessToken(null);
    setRefreshToken(null);
    setSession(null);

    router.replace(routes.home());
  }, [authManager, setAccessToken, setRefreshToken, setSession]);

  useEffect(() => {
    registerLogoutHandler(signOut);
  }, [signOut]);

  useLayoutEffect(() => {
    authManager.setTokens(accessToken ?? null, refreshToken ?? null);
  }, [accessToken, authManager, refreshToken]);

  useEffect(() => {
    authManager.registerAuthCallbacks({
      onSessionExpired: () => {
        authManager.clearTokens();

        setAccessToken(null);
        setRefreshToken(null);
        setSession(null);

        queryClient.clear();

        router.replace(routes.home());
      },

      onTokensRefreshed: (newAccessToken: string, newRefreshToken: string | null) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
      },
    });

    return () => authManager.clearAuthCallbacks();
  }, [authManager, setAccessToken, setRefreshToken, setSession]);

  const userSession = useMemo(() => {
    if (!session) {
      return null;
    }

    try {
      return JSON.parse(session);
    } catch {
      return null;
    }
  }, [session]);

  const isAuthenticated = Boolean(userSession);
  const isAuthorized = isAuthenticated;

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        establishAuthSession,

        accessToken,
        refreshToken,
        session: userSession,

        isLoading,
        isAuthenticated,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
