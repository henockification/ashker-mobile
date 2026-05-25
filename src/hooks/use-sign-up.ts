import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/src/api/auth';
import { SignUpPayload } from '@/src/types/auth';

export function useSignUp() {
  return useMutation({
    mutationFn: (payload: SignUpPayload) => signUp(payload),
  });
}