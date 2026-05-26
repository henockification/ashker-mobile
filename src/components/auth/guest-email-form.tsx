import { FormikProvider, useFormik } from 'formik';
import { View } from 'react-native';

import { FormikTextField } from '@/src/components/form/formik-text-field';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import { guestEmailValidationSchema } from '@/src/constants/validation';

type GuestEmailFormProps = {
  submitLabel?: string;
  isLoading?: boolean;
  onSubmit: (email: string) => void;
};

export function GuestEmailForm({
  submitLabel = 'Continue as guest',
  isLoading = false,
  onSubmit,
}: GuestEmailFormProps) {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: guestEmailValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => onSubmit(values.email.trim()),
  });

  return (
    <FormikProvider value={formik}>
      <View className="self-stretch">
        <Text className="mb-1 text-sm font-semibold text-neutral-900">Continue as guest</Text>
        <Text className="mb-4 text-sm leading-5 text-neutral-600">
          Enter your work email to browse events without creating a password.
        </Text>

        <FormikTextField
          name="email"
          type="email"
          label="Email address"
          placeholder="you@company.com"
        />

        <Button
          accessibilityLabel={submitLabel}
          className="mt-5"
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={() => formik.submitForm()}
          role="button"
          variant="secondary"
        >
          <Button.Label>{submitLabel}</Button.Label>
        </Button>
      </View>
    </FormikProvider>
  );
}
