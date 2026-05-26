import { router } from 'expo-router';

import { routes } from '@/src/constants/routes';

/** Return to the tenant landing screen from auth screens. */
export const navigateToHome = (): void => {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace(routes.home());
};
