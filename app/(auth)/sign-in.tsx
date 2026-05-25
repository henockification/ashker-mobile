import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { Pressable, View } from 'react-native';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { AuthLayout } from '@/src/components/layouts/auth';
import { FormikTextField } from '@/src/components/form/formik-text-field';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { handleApiError } from '@/src/utils';
import Apple from '@/assets/icons/apple.svg';
import Google from '@/assets/icons/google.svg';
import { useSession } from '@/src/contexts/auth';
import { useState } from 'react';
import { useThemeColor } from 'heroui-native';
import { SignInPayload } from '@/src/types/auth';
import { signInValidationSchema } from '@/src/constants/validation';
import { CheckboxField } from '@/src/components/ui/checkbox-field';


export default function SignIn() {
  const { signIn } = useSession();
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const accentColor = useThemeColor('accent');

  const onSignIn = async (values: SignInPayload) => {
    try {
      setLoading(true);

      const result = await signIn({
        ...values,
        rememberMe: isCheckboxSelected,
      });

      if (result.success) {
        router.replace(routes.app.home());
      } else {
        if (result.type === 'network') {
          handleApiError(undefined, 'Unable to sign in. Please try again.');
        } else {
          handleApiError(undefined, 'Unable to sign in. Please try again.');
        }
      }
    } catch {
      handleApiError(undefined, 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      email: '',
      rememberMe: false,
      password: '',
    },
    onSubmit: onSignIn,
    validationSchema: signInValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const isSubmitDisabled = !formik.values.email || formik.isSubmitting;

  return (
    <AuthLayout>
      <FormikProvider value={formik}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text className="text-2xl font-semibold mb-1 text-center">
            Welcome to Ein1
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
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff', borderRadius: 9999, borderWidth: 1, borderColor: '#e5e5e5' }}
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

        <View className='gap-6 mb-5 self-stretch'>
          <FormikTextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email to login or sign up"
          />
          <FormikTextField label="Password" name="password" type="password" placeholder="Enter your password" />
        </View>

        <View className="flex-row flex-wrap items-center justify-between self-stretch mb-9">
          <View className="flex-1">
            <CheckboxField
              isSelected={isCheckboxSelected}
              onSelectedChange={setIsCheckboxSelected}
              title="Remember me"
              titleClassName="text-lg native:leading-[24px]"
              variant="secondary"
            />
          </View>

          <Button
            accessibilityLabel="Forgot password"
            onPress={() => {
              router.push(routes.auth.resetPassword());
            }}
            role="button"
            variant="ghost"
          >
            <Button.Label className="no-underline">Forgot password</Button.Label>
          </Button>
        </View>

        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={formik.submitForm}
          role="button"
          accessibilityLabel="Sign in"
        >
          <Button.Label>Sign in</Button.Label>
        </Button>

        <View className="flex-row flex-wrap items-center self-center mt-4 gap-2">
          <Text>Don't have an account?</Text>

          <Button
            accessibilityLabel="Sign up"
            onPress={() => {
              router.push(routes.auth.signUp());
            }}
            role="button"
            size="md"
            variant="ghost"
          >
            <Button.Label>Sign up</Button.Label>
            <ArrowRight accessible={false} fill={accentColor} />
          </Button>
        </View>

        <Text className="mt-6 text-xs text-neutral-900 text-center leading-5">
          By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
        </Text>
      </FormikProvider>
    </AuthLayout>
  );
}