import { Redirect, router } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import Apple from '@/assets/icons/apple.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import Google from '@/assets/icons/google.svg';
import { parseAuthResponse } from '@/src/api/parse-auth-response';
import { FormikTextField } from '@/src/components/form/formik-text-field';
import { AuthLayout } from '@/src/components/layouts/auth';
import { TenantAuthHeader } from '@/src/components/tenant/tenant-auth-header';
import { Button } from '@/src/components/ui/button';
import { CheckboxField } from '@/src/components/ui/checkbox-field';
import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { signUpValidationSchema } from '@/src/constants/validation';
import { useSession } from '@/src/contexts/auth';
import { SignUpPayload } from '@/src/types/auth';
import { handleApiError } from '@/src/utils';

type SignUpFormValues = SignUpPayload & {
  confirmPassword: string;
};

function SignUpForm() {
  const { signUp, establishAuthSession } = useSession();
  const primaryColor = String(useCSSVariable('--color-primary-600'));
  const [isLoading, setLoading] = useState(false);

  const onSignUp = async (values: SignUpFormValues) => {
    try {
      setLoading(true);

      const response = await signUp({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        rememberMe: values.rememberMe,
        utcOffset: -new Date().getTimezoneOffset() / 60,
      });

      if ('error' in response) {
        formik.setFieldError('email', 'Email already exists');
        return;
      }

      establishAuthSession(parseAuthResponse(response));
      router.replace(routes.home());
    } catch (error) {
      if (error instanceof Error && error.message === 'NETWORK_ERROR') {
        handleApiError(error, 'Network error. Please try again.');
        return;
      }

      handleApiError(error, 'Unable to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
    onSubmit: onSignUp,
    validationSchema: signUpValidationSchema,
  });

  return (
    <AuthLayout showBackToHome>
      <FormikProvider value={formik}>
        <TenantAuthHeader title="Create your account" />

        <View style={{ gap: 12, marginBottom: 24, alignSelf: 'stretch' }}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#fff',
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#e5e5e5',
            }}
            onPress={() => {}}
          >
            <View
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Google width={20} height={20} />
            </View>
            <Text className="text-base font-semibold text-neutral-700">Continue with Google</Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#fff',
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#e5e5e5',
            }}
            onPress={() => {}}
          >
            <View
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Apple width={20} height={20} />
            </View>
            <Text className="text-base font-semibold text-neutral-700">Continue with Apple</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#e5e5e5' }} />
          <Text style={{ marginHorizontal: 12, fontSize: 14, color: '#737373' }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#e5e5e5' }} />
        </View>

        <View style={{ marginBottom: 12, alignSelf: 'stretch' }}>
          <FormikTextField name="name" type="text" label="Name" placeholder="Enter your name" />
        </View>

        <View style={{ marginBottom: 12, alignSelf: 'stretch' }}>
          <FormikTextField name="email" type="email" label="Email" placeholder="Enter your email" />
        </View>

        <View style={{ marginBottom: 12, alignSelf: 'stretch' }}>
          <FormikTextField
            name="password"
            type="password"
            label="Password"
            placeholder="Create a password"
          />
        </View>

        <View style={{ marginBottom: 16, alignSelf: 'stretch' }}>
          <FormikTextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Re-enter your password"
          />
        </View>

        <View style={{ marginBottom: 20, alignSelf: 'stretch' }}>
          <CheckboxField
            title="Remember me"
            isSelected={formik.values.rememberMe}
            onSelectedChange={(selected) => formik.setFieldValue('rememberMe', selected)}
            titleClassName="text-neutral-700"
          />
        </View>

        <Button
          accessibilityLabel="Sign up"
          isDisabled={!formik.isValid || !formik.dirty || isLoading}
          isLoading={isLoading}
          onPress={() => formik.submitForm()}
          role="button"
        >
          <Button.Label>Sign up</Button.Label>
        </Button>

        <View className="flex-row flex-wrap items-center self-center mt-4 gap-2">
          <Text>Already have an account?</Text>

          <Button
            accessibilityLabel="Sign in"
            onPress={() => {
              router.push(routes.auth.signIn());
            }}
            role="button"
            size="md"
            variant="ghost"
          >
            <Button.Label>Sign in</Button.Label>
            <ArrowRight accessible={false} fill={primaryColor} />
          </Button>
        </View>
      </FormikProvider>
    </AuthLayout>
  );
}

export default function SignUpScreen() {
  const { isAuthenticated, isLoading } = useSession();

  if (!isLoading && isAuthenticated) {
    return <Redirect href={routes.home()} />;
  }

  return <SignUpForm />;
}
