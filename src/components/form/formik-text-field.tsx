import { useField } from 'formik';
import { cn, TextField, useThemeColor } from 'heroui-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import Email from '@/assets/icons/email.svg';
import Eye from '@/assets/icons/eye.svg';
import Phone from '@/assets/icons/phone.svg';

type FormFieldType = 'text' | 'email' | 'password' | 'phone';

interface FormikTextFieldProps {
  name: string;
  type?: FormFieldType;
  label: string;
  placeholder?: string;
  description?: string;
  inputClassName?: string;
}

const inputConfigByType = {
  text: {
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    autoComplete: 'off',
  },
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
  },
  password: {
    keyboardType: 'default',
    autoCapitalize: 'none',
    autoComplete: 'password',
  },
  phone: {
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
    autoComplete: 'tel',
  },
} as const;

export const FormikTextField = ({
  type = 'text',
  label,
  name,
  placeholder = '',
  description,
  inputClassName,
}: FormikTextFieldProps) => {
  const [field, meta, helpers] = useField<string>(name);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fieldPlaceholderColor = useThemeColor('field-placeholder');
  const fieldBorderColor = useThemeColor('field-border');

  const showError = meta.touched && !!meta.error;
  const isEmail = type === 'email';
  const isPassword = type === 'password';
  const isPhoneNumber = type === 'phone';

  const inputConfig = inputConfigByType[type];

  return (
    <TextField isInvalid={showError}>
      <View className="relative w-full flex-row items-center">
        <TextField.Input
          className={cn(
            'rounded-md border-1 border-neutral-600 w-full',
            isEmail || isPhoneNumber ? 'pl-10' : isPassword && 'pr-10',
            inputClassName,
          )}
          value={field.value}
          placeholder={placeholder}
          onChangeText={helpers.setValue}
          onBlur={() => helpers.setTouched(true)}
          keyboardType={inputConfig.keyboardType}
          autoCapitalize={inputConfig.autoCapitalize}
          autoComplete={inputConfig.autoComplete}
          autoCorrect={false}
          spellCheck={false}
          secureTextEntry={isPassword && !isPasswordVisible}
        />

        <View className="absolute left-3">
          {isEmail && <Email stroke={fieldPlaceholderColor} />}
          {isPhoneNumber && <Phone fill={fieldPlaceholderColor} />}
        </View>

        <View className="absolute right-3">
          {isPassword && (
            <Pressable onPress={() => setIsPasswordVisible((val) => !val)}>
              <Eye stroke={!isPasswordVisible ? fieldPlaceholderColor : fieldBorderColor} />
            </Pressable>
          )}
        </View>
      </View>

      {description && <TextField.Description>{description}</TextField.Description>}

      {showError && <TextField.ErrorMessage>{meta.error}</TextField.ErrorMessage>}
    </TextField>
  );
};
