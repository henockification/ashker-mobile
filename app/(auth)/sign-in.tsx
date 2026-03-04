import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { Platform, Pressable, View } from 'react-native';

import { AuthLayout } from '@/src/components/layouts/auth';
import { FormikTextField } from '@/src/components/form/formik-text-field';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { handleApiError } from '@/src/utils';
import Apple from '@/assets/icons/apple.svg';
import Google from '@/assets/icons/google.svg';

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
        router.replace(routes.app.search());
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
        <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
          <Pressable onPress={() => router.replace(routes.app.search())}>
            <Text className="text-base text-primary-600">Skip</Text>
          </Pressable>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          {Platform.OS === 'web' ? (
            <View style={{ width: 64, height: 64, marginBottom: 24, backgroundColor: '#e5e5e5', borderRadius: 8 }} />
          ) : (
            <Image
              source={require('@/assets/app/icon.png')}
              style={{ width: 64, height: 64, marginBottom: 24 }}
              contentFit="contain"
            />
          )}
          <Text className="text-2xl font-semibold mb-1 text-center">
            Welcome to Project X
          </Text>
          <Text className="text-base text-neutral-600 text-center">
            Discover experiences near you.
          </Text>
        </View>

        <View style={{ gap: 12, marginBottom: 24, alignSelf: 'stretch' }}>
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff', borderRadius: 9999, borderWidth: 1, borderColor: '#e5e5e5' }}
            onPress={() => {}}
          >
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
              <Google />
            </View>
            <Text className="text-base font-semibold text-neutral-700">Continue with Google</Text>
          </Pressable>

          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff', borderRadius: 9999, borderWidth: 1, borderColor: '#e5e5e5' }}
            onPress={() => {}}
          >
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
              <Apple />
            </View>
            <Text className="text-base font-semibold text-neutral-700">Continue with Apple</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#e5e5e5' }} />
          <Text style={{ marginHorizontal: 12, fontSize: 14, color: '#737373' }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#e5e5e5' }} />
        </View>

        <View style={{ marginBottom: 16, alignSelf: 'stretch' }}>
          <FormikTextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email to login or sign up"
          />
        </View>

        <Button
          onPress={() => formik.submitForm()}
          isDisabled={isSubmitDisabled}
          isLoading={formik.isSubmitting}
        >
          <Button.Label>Continue with email</Button.Label>
        </Button>

        <Text className="mt-6 text-xs text-neutral-900 text-center leading-5">
          By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
        </Text>
      </FormikProvider>
    </AuthLayout>
  );
}