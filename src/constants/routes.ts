import type { Href } from 'expo-router';

export const ROUTES = {
  notFound: '+not-found',
  signIn: 'sign-in',
  signUp: 'sign-up',
  resetPassword: 'reset-password',
  resendEmail: 'resend-email',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];

export const routes = {
  notFound: () => `/${ROUTES.notFound}`,
  home: () => '/' as Href,

  auth: {
    signIn: () => `/${ROUTES.signIn}` as Href,
    signUp: () => `/${ROUTES.signUp}` as Href,
    resetPassword: () => `/${ROUTES.resetPassword}` as Href,
    resendEmail: () => `/${ROUTES.resendEmail}` as Href,
  },
} as const;
