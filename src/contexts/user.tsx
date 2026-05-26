import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { AuthApiUser, SessionData } from '../types/auth';
import { UserProfile } from '../types/user';
import { useSession } from './auth';

const isAuthUser = (session: SessionData | null): session is AuthApiUser =>
  Boolean(session && typeof session === 'object' && 'email' in session && 'name' in session);

type UserContextValue = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }

  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (isAuthUser(session)) {
      setUser({
        name: session.name,
        email: session.email,
        image: session.image ?? '',
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
