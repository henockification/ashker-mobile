import { apiClient } from '@/src/api/client';
import { parseAuthResponse } from '@/src/api/parse-auth-response';
import { ParsedAuthResponse, SignInPayload, SignUpPayload, SignUpResponse } from '@/src/types/auth';

export const resetPassword = async (payload: SignInPayload) => {
  const { data } = await apiClient.post('auth/reset-password', payload);
  return data;
};

export const signIn = async (payload: SignInPayload): Promise<ParsedAuthResponse> => {
  const { data } = await apiClient.post('auth/sign-in', payload, {
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  });

  return parseAuthResponse(data);
};

export const signUp = async (payload: SignUpPayload): Promise<SignUpResponse> => {
  const { data } = await apiClient.post<SignUpResponse>('auth/sign-up', payload);
  return data;
};
