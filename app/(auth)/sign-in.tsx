import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { View } from 'react-native';

import { AuthLayout } from '@/src/components/layouts/auth';
import { FormikTextField } from '@/src/components/form/formik-text-field';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { handleApiError } from '@/src/utils';

type SignInValues = {
  email: string;
};

export default function SignIn() {
  const formik = useFormik<SignInValues>({
    initialValues: {
      email: '',
    },
    onSubmit: async () => {
      try {
        // TODO: Implement real sign-in with email.
        // For now, just navigate to the main app shell.
        router.push('/');
      } catch (e) {
        handleApiError(e, 'Unable to sign in. Please try again.');
        throw new Error('login failed', { cause: e });
      }
    },
  });

  const isSubmitDisabled = !formik.values.email || formik.isSubmitting;

  return (
    <AuthLayout>
      <FormikProvider value={formik}>
        <View className="items-end mb-4">
          <Button
            variant="ghost"
            size="md"
            onPress={() => {
              // Optional: allow skipping auth and going to the app.
              router.push('/');
            }}
          >
            <Button.Label className="no-underline">Skip</Button.Label>
          </Button>
        </View>

        <View className="items-center mb-8">
          <Image
            source={require('@/assets/app/icon.png')}
            style={{ width: 64, height: 64, marginBottom: 24 }}
            contentFit="contain"
          />
          <Text className="text-2xl font-semibold mb-1 text-center">
            Welcome to Project X
          </Text>
          <Text className="text-base text-neutral-600 text-center">
            Discover experiences near you.
          </Text>
        </View>

        <View className="gap-3 mb-6 self-stretch">
          <Button
            variant="secondary"
            onPress={() => {
              // TODO: Hook up Google auth.
            }}
            className="flex-row items-center justify-center"
          >
            <Button.Label className="flex-row items-center gap-3">
              <View className="w-5 h-5 rounded-full bg-white items-center justify-center mr-2">
                <Text className="text-xs font-bold text-neutral-800">G</Text>
              </View>
              Continue with Google
            </Button.Label>
          </Button>

          <Button
            variant="secondary"
            onPress={() => {
              // TODO: Hook up Apple auth.
            }}
            className="flex-row items-center justify-center"
          >
            <Button.Label className="flex-row items-center gap-3">
              <View className="w-5 h-5 rounded-full bg-neutral-900 items-center justify-center mr-2">
                <Text className="text-xs font-bold text-white"></Text>
              </View>
              Continue with Apple
            </Button.Label>
          </Button>
        </View>

        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text className="mx-3 text-neutral-500">or</Text>
          <View className="flex-1 h-px bg-neutral-200" />
        </View>

        <View className="gap-4 mb-4 self-stretch">
          <FormikTextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email to login or sign up"
          />
        </View>

        <Button
          isDisabled={isSubmitDisabled}
          isLoading={formik.isSubmitting}
          onPress={() => formik.submitForm()}
        >
          <Button.Label>Continue with email</Button.Label>
        </Button>

        <Text className="mt-6 text-xs text-neutral-500 text-center leading-5">
          By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
        </Text>
      </FormikProvider>
    </AuthLayout>
  );
}

