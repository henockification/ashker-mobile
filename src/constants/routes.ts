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

    // App tabs (main layout)
    search: '(app)',
    projects: '(app)/projects',
    collections: '(app)/collections',
    me: '(app)/me',
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
        search: () => `/${ROUTES.search}` as Href,
        projects: () => `/${ROUTES.projects}` as Href,
        collections: () => `/${ROUTES.collections}` as Href,
        me: () => `/${ROUTES.me}` as Href,
    },
} as const;