import { router } from 'expo-router';

import { routes } from '@/src/constants/routes';

/** Return to the tenant landing screen from auth screens (never router.back). */
export const navigateToHome = (): void => {
  const home = routes.home();

  if (router.canDismiss()) {
    router.dismissTo(home);
    return;
  }

  router.replace(home);
};
