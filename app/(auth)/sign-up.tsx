import { router } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { Pressable, View } from 'react-native';
import { useState } from 'react';
import { useThemeColor } from 'heroui-native';

import { AuthLayout } from '@/src/components/layouts/auth';
import { CheckboxField } from '@/src/components/ui/checkbox-field';
import { FormikTextField } from '@/src/components/form/formik-text-field';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { handleApiError } from '@/src/utils';
import { parseAuthResponse } from '@/src/api/parse-auth-response';
import { useSession } from '@/src/contexts/auth';
import { SignUpPayload } from '@/src/types/auth';
import { signUpValidationSchema } from '@/src/constants/validation';
import Apple from '@/assets/icons/apple.svg';
import Google from '@/assets/icons/google.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';

type SignUpFormValues = SignUpPayload & {
  confirmPassword: string;
};

export default function SignUp() {
  const { signUp, establishAuthSession } = useSession();
  const accentColor = useThemeColor('accent');
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
      router.replace(routes.app.search());
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
    <AuthLayout>
      <FormikProvider value={formik}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text aria-level={1} className="text-2xl text-center mb-2 font-semibold" role="heading">
            Create your account
          </Text>
        </View>

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
            <ArrowRight accessible={false} fill={accentColor} />
          </Button>
        </View>
      </FormikProvider>
    </AuthLayout>
  );
}
