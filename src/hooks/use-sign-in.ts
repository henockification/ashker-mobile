import { useMutation } from '@tanstack/react-query';

import { signIn } from '@/src/api/auth';
import { SignInPayload } from '@/src/types/auth';

export function useSignIn() {
  return useMutation({
    mutationFn: (payload: SignInPayload) => signIn(payload),
  });
}
