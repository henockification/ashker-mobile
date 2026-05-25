import { Redirect } from 'expo-router';

import { routes } from '@/src/constants/routes';

export default function Index() {
  return <Redirect href={routes.app.home()} />;
}
