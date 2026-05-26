import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';

type TenantLandingFooterProps = {
  companyName: string;
  isAuthenticated: boolean;
  accentColor?: string | null;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
};

export function TenantLandingFooter({
  companyName,
  isAuthenticated,
  accentColor,
  onSignIn,
  onSignUp,
  onSignOut,
}: TenantLandingFooterProps) {
  const accent = accentColor ?? '#52525b';
  const year = new Date().getFullYear();

  return (
    <View className="mt-2 border-t border-neutral-200 pt-8 pb-4">
      {!isAuthenticated ? (
        <View className="mb-6 rounded-2xl border border-neutral-200 bg-white px-4 py-4">
          <Text className="mb-1 text-center text-base font-semibold text-neutral-900">
            Join {companyName}
          </Text>
          <Text className="mb-4 text-center text-sm text-neutral-600">
            Sign in to register for events and manage your tickets.
          </Text>
          <View className="flex-row gap-3">
            <Pressable
              onPress={onSignIn}
              className="flex-1 items-center rounded-xl py-3"
              style={{ backgroundColor: accent }}
            >
              <Text className="text-sm font-semibold text-white">Sign in</Text>
            </Pressable>
            <Pressable
              onPress={onSignUp}
              className="flex-1 items-center rounded-xl border border-neutral-200 bg-white py-3"
            >
              <Text className="text-sm font-semibold text-neutral-800">Create account</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={onSignOut}
          className="mb-6 self-center rounded-xl border border-neutral-200 bg-white px-6 py-2.5"
        >
          <Text className="text-sm font-semibold text-neutral-700">Sign out</Text>
        </Pressable>
      )}

      <Text className="text-center text-sm font-semibold text-neutral-800">{companyName}</Text>
      <Text className="mt-1 text-center text-xs text-neutral-500">
        © {year} · Powered by Ashker Events
      </Text>

      <Pressable onPress={() => router.push(routes.auth.signIn())} className="mt-3 self-center">
        <Text className="text-xs font-medium text-neutral-400">Need help? Contact support</Text>
      </Pressable>
    </View>
  );
}
