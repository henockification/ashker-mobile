import type { Href } from 'expo-router';

export const ROUTES = {
  notFound: '+not-found',
  faq: 'faq',
  contactSupport: 'contact-support',

  // Auth (route group — URLs omit the group segment)
  signIn: 'sign-in',
  signUp: 'sign-up',
  resetPassword: 'reset-password',
  resendEmail: 'resend-email',

  // Main app (public browse + signed-in features)
  search: 'search',
  businesses: 'businesses',
  feed: 'feed',
  projects: 'projects',
  collections: 'collections',
  me: 'me',
  addBusiness: 'add-business',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];

export const routes = {
  notFound: () => `/${ROUTES.notFound}`,
  faq: () => `/${ROUTES.faq}`,
  contactSupport: () => `/${ROUTES.contactSupport}`,

  auth: {
    signIn: () => `/${ROUTES.signIn}`,
    signUp: () => `/${ROUTES.signUp}`,
    resetPassword: () => `/${ROUTES.resetPassword}`,
    resendEmail: () => `/${ROUTES.resendEmail}`,
  },

  app: {
    /** Default home — search (Yelp-style, no sign-in required). */
    home: () => `/${ROUTES.search}` as Href,
    search: () => `/${ROUTES.search}` as Href,
    businesses: () => `/${ROUTES.businesses}` as Href,
    business: (id: string) => `/${ROUTES.businesses}/${id}` as Href,
    projects: () => `/${ROUTES.projects}` as Href,
    collections: () => `/${ROUTES.collections}` as Href,
    me: () => `/${ROUTES.me}` as Href,
    addBusiness: () => `/${ROUTES.addBusiness}` as Href,
  },
} as const;
