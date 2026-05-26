import * as Yup from 'yup';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S{8,}$/;

export const signUpValidationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  rememberMe: Yup.boolean(),
});

export type BusinessRelationshipRole = 'customer' | 'employee';

export const getAddBusinessValidationSchema = (relationship: BusinessRelationshipRole) =>
  Yup.object({
    countryCode: Yup.string().required('Country is required'),
    city: Yup.string().trim().required('City is required'),
    businessName: Yup.string().trim().required('Business name is required'),
    address: Yup.string().trim().required('Address is required'),
    categoryIds: Yup.array().of(Yup.string().required()).min(1, 'Select at least one category'),
    phone:
      relationship === 'employee'
        ? Yup.string().trim().required('Phone number is required')
        : Yup.string().trim(),
    website: Yup.string()
      .trim()
      .test('url', 'Enter a valid URL (include https://)', (value) => {
        if (!value) return true;
        return /^https?:\/\/.+/i.test(value);
      }),
    notes: Yup.string().trim(),
  });

export const signInValidationSchema = Yup.object({
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const guestEmailValidationSchema = Yup.object({
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
});
