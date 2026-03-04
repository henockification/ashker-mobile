import type { Href } from 'expo-router';

export const ROUTES = {
    notFound: '+not-found',
    faq: 'faq',
    contactSupport: 'contact-support',
    // Auth Screens
    signIn: 'sign-in',
    signUp: 'sign-up',
    resetPassword: 'reset-password',
    resendEmail: 'resend-email',
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
} as const;