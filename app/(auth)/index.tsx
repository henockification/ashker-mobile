import { Redirect, Slot, usePathname } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';

export default function AuthIndex() {
  const pathname = usePathname();

  if (pathname === '/') {
    return <Redirect href={ROUTES.signIn} />;
  }

  return <Slot />;
}