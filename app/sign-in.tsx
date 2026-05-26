import { Redirect, router } from 'expo-router';

import { TenantAuthOptions } from '@/src/components/auth/tenant-auth-options';
import { AuthLayout } from '@/src/components/layouts/auth';
import { routes } from '@/src/constants/routes';
import { useSession } from '@/src/contexts/auth';

export default function SignInScreen() {
  const { isAuthenticated, isLoading } = useSession();

  if (!isLoading && isAuthenticated) {
    return <Redirect href={routes.home()} />;
  }

  return (
    <AuthLayout showBackToHome>
      <TenantAuthOptions mode="sign-in" onSwitchMode={() => router.replace(routes.auth.signUp())} />
    </AuthLayout>
  );
}
