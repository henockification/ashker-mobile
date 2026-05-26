import { View } from 'react-native';
import { Toast } from 'toastify-react-native';

import Google from '@/assets/icons/google.svg';
import LinkedIn from '@/assets/icons/linkedin.svg';
import { AuthDivider } from '@/src/components/auth/auth-divider';
import { AuthLegalNotice } from '@/src/components/auth/auth-legal-notice';
import { AuthModeSwitch } from '@/src/components/auth/auth-mode-switch';
import { GuestEmailForm } from '@/src/components/auth/guest-email-form';
import { SocialAuthButton } from '@/src/components/auth/social-auth-button';
import { TenantAuthHeader } from '@/src/components/tenant/tenant-auth-header';

export type TenantAuthMode = 'sign-in' | 'sign-up';

type TenantAuthOptionsProps = {
  mode: TenantAuthMode;
  onSwitchMode: () => void;
};

const copyByMode = {
  'sign-in': {
    title: 'Sign in',
    subtitle: 'Access your account',
    guestSubmitLabel: 'Continue as guest',
    switchPrompt: "Don't have an account?",
    switchAction: 'Create account',
  },
  'sign-up': {
    title: 'Create account',
    subtitle: 'Join with your professional identity',
    guestSubmitLabel: 'Continue as guest',
    switchPrompt: 'Already have an account?',
    switchAction: 'Sign in',
  },
} as const;

const notifyComingSoon = (provider: string) => {
  Toast.info(`${provider} sign-in is coming soon.`);
};

export function TenantAuthOptions({ mode, onSwitchMode }: TenantAuthOptionsProps) {
  const copy = copyByMode[mode];

  return (
    <>
      <TenantAuthHeader title={copy.title} subtitle={copy.subtitle} />

      <View className="gap-3 self-stretch">
        <SocialAuthButton
          label="Continue with Google"
          icon={<Google width={20} height={20} />}
          onPress={() => notifyComingSoon('Google')}
        />
        <SocialAuthButton
          label="Continue with LinkedIn"
          icon={<LinkedIn width={20} height={20} />}
          onPress={() => notifyComingSoon('LinkedIn')}
        />
      </View>

      <AuthDivider label="or continue as guest" />

      <GuestEmailForm
        submitLabel={copy.guestSubmitLabel}
        onSubmit={() => notifyComingSoon('Guest')}
      />

      <AuthModeSwitch
        prompt={copy.switchPrompt}
        actionLabel={copy.switchAction}
        onPress={onSwitchMode}
      />

      <AuthLegalNotice />
    </>
  );
}
