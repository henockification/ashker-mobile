import { jwtDecode } from 'jwt-decode';

import type { SessionData } from '@/src/types/auth';

type JwtPayload = {
  sub?: string;
  userId?: string;
  id?: string;
};

export function resolveAuthUserId(
  session: SessionData | null,
  accessToken?: string | null,
): string | null {
  if (session && typeof session === 'object' && 'id' in session && typeof session.id === 'string') {
    return session.id;
  }

  if (!accessToken) {
    return null;
  }

  try {
    const payload = jwtDecode<JwtPayload>(accessToken);
    return payload.sub ?? payload.userId ?? payload.id ?? null;
  } catch {
    return null;
  }
}
