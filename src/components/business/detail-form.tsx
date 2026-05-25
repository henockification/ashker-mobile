import { Ionicons } from '@expo/vector-icons';
import { FormikProvider, useFormik } from 'formik';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { FormikBusinessField } from '@/src/components/form/formik-business-field';
import { FormikCategoryMultiSelect } from '@/src/components/form/formik-category-multi-select';
import { Button } from '@/src/components/ui/button';
import { Text } from '@/src/components/ui/text';
import {
  getAddBusinessValidationSchema,
  type BusinessRelationshipRole,
} from '@/src/constants/validation';

export type AddBusinessFormValues = {
  countryCode: string;
  city: string;
  businessName: string;
  address: string;
  categoryIds: string[];
  phone: string;
  website: string;
  notes: string;
};

export type AddBusinessSubmitValues = AddBusinessFormValues & {
  isCreatedByCustomer: boolean;
};

interface AddBusinessLocationFieldsProps {
  relationship: BusinessRelationshipRole;
  defaultCountryCode?: string;
  onSubmit?: (values: AddBusinessSubmitValues) => void | Promise<void>;
}

interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

const COUNTRY_OPTIONS = require('../../data/add-business-countries.json') as CountryOption[];

const WebIFrame = 'iframe' as unknown as ComponentType<Record<string, unknown>>;

const isWeb = Platform.OS === 'web' || typeof document !== 'undefined';

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm">
      <View className="border-b border-primary-100 bg-primary-50 px-4 py-3">
        <Text className="text-sm font-semibold text-primary-800">{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 text-xs leading-5 text-neutral-600">{subtitle}</Text>
        ) : null}
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}

function CountryPicker({
  selectedCountry,
  countryOpen,
  error,
  onToggle,
  onSelect,
}: {
  selectedCountry: CountryOption;
  countryOpen: boolean;
  error?: string;
  onToggle: () => void;
  onSelect: (country: CountryOption) => void;
}) {
  return (
    <View>
      <Pressable
        className={`flex-row items-center rounded-xl border bg-neutral-50 px-4 py-3.5 ${
          error ? 'border-danger-600' : 'border-neutral-200'
        }`}
        onPress={onToggle}
      >
        <Text className="mr-2 text-xl">{selectedCountry.flag}</Text>
        <Text className="flex-1 text-base text-neutral-900">{selectedCountry.name}</Text>
        <Ionicons name={countryOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#71717a" />
      </Pressable>
      {error ? <Text className="mt-1.5 text-xs text-danger-600">{error}</Text> : null}
      {countryOpen ? (
        <View className="mt-2 max-h-52 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {COUNTRY_OPTIONS.map((country, index) => {
            const selected = country.code === selectedCountry.code;
            return (
              <Pressable
                key={country.code}
                className={`flex-row items-center px-4 py-3 ${
                  index < COUNTRY_OPTIONS.length - 1 ? 'border-b border-neutral-100' : ''
                } ${selected ? 'bg-primary-50' : ''}`}
                onPress={() => onSelect(country)}
              >
                <Text className="mr-2 text-lg">{country.flag}</Text>
                <Text
                  className={`flex-1 text-base ${selected ? 'font-semibold text-primary-800' : 'text-neutral-700'}`}
                >
                  {country.name}
                </Text>
                {selected ? <Ionicons name="checkmark-circle" size={20} color="#c62828" /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

function AddressMapPreview({ address }: { address: string }) {
  const mapsQuery = encodeURIComponent(address);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <View className="mt-1 overflow-hidden rounded-xl border border-neutral-200">
      <View className="border-b border-neutral-100 bg-neutral-50 px-3 py-2.5">
        <Text className="text-sm font-semibold text-neutral-900">Pin business location</Text>
        <Text className="mt-0.5 text-xs text-neutral-600">
          Confirm the pin matches this address.
        </Text>
      </View>
      <View className="h-[220px] w-full bg-neutral-100">
        <WebIFrame
          title="Business location map"
          src={mapsEmbedUrl}
          style={{ border: 0, width: '100%', height: '100%' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </View>
    </View>
  );
}

export function AddBusinessLocationFields({
  relationship,
  defaultCountryCode = 'ETH',
  onSubmit,
}: AddBusinessLocationFieldsProps) {
  const defaultCountry = useMemo(
    () =>
      COUNTRY_OPTIONS.find((country) => country.code === defaultCountryCode) ?? COUNTRY_OPTIONS[0],
    [defaultCountryCode],
  );

  const validationSchema = useMemo(
    () => getAddBusinessValidationSchema(relationship),
    [relationship],
  );

  const isEmployee = relationship === 'employee';
  const isCreatedByCustomer = relationship === 'customer';

  const [countryOpen, setCountryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<AddBusinessFormValues>({
    initialValues: {
      countryCode: defaultCountry.code,
      city: '',
      businessName: '',
      address: '',
      categoryIds: [],
      phone: '',
      website: '',
      notes: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!onSubmit) return;

      try {
        setIsSubmitting(true);
        await onSubmit({
          businessName: values.businessName.trim(),
          address: values.address.trim(),
          categoryIds: values.categoryIds,
          phone: values.phone.trim(),
          website: values.website.trim(),
          notes: values.notes.trim(),
          countryCode: values.countryCode,
          city: values.city.trim(),
          isCreatedByCustomer,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const selectedCountry =
    COUNTRY_OPTIONS.find((country) => country.code === formik.values.countryCode) ?? defaultCountry;

  const countryError =
    formik.touched.countryCode && formik.errors.countryCode
      ? String(formik.errors.countryCode)
      : undefined;

  const handleCountrySelect = (country: CountryOption) => {
    void formik.setFieldValue('countryCode', country.code);
    void formik.setFieldTouched('countryCode', true);
    setCountryOpen(false);
  };

  return (
    <FormikProvider value={formik}>
      <View>
        <SectionCard title="Where is it?" subtitle="We use this to place the business on the map.">
          <View className="flex-row items-start gap-3">
            <View className="flex-1">
              <Text className="mb-1.5 text-sm font-semibold text-neutral-800">Country</Text>
              <CountryPicker
                selectedCountry={selectedCountry}
                countryOpen={countryOpen}
                error={countryError}
                onToggle={() => setCountryOpen((current) => !current)}
                onSelect={handleCountrySelect}
              />
            </View>
            <View className="flex-1">
              <FormikBusinessField name="city" label="City" placeholder="e.g. Addis Ababa" />
            </View>
          </View>
        </SectionCard>

        <SectionCard
          title="Required information"
          subtitle="Help people find and recognize this business."
        >
          <FormikBusinessField
            name="businessName"
            label="Business name"
            placeholder="e.g. Joe's Coffee"
          />
          <FormikBusinessField
            name="address"
            label="Address"
            placeholder="Street, city, state"
            showUseCurrentLocation
            onUseCurrentLocation={() => {}}
          />
          {isWeb && formik.values.address.trim().length > 3 ? (
            <AddressMapPreview address={formik.values.address} />
          ) : null}
          <FormikCategoryMultiSelect name="categoryIds" label="Categories" />
          {isEmployee ? (
            <FormikBusinessField
              name="phone"
              label="Phone number"
              placeholder="+1 555 000 1234"
            />
          ) : null}
        </SectionCard>

        <SectionCard
          title="Optional details"
          subtitle={
            isEmployee
              ? 'More context helps our team verify faster.'
              : 'Phone and other details are optional.'
          }
        >
          {!isEmployee ? (
            <FormikBusinessField
              name="phone"
              label="Phone number (optional)"
              placeholder="+1 555 000 1234"
            />
          ) : null}
          <FormikBusinessField name="website" label="Website" placeholder="https://example.com" />
          <FormikBusinessField
            name="notes"
            label="Notes for our team"
            placeholder="Hours, suite number, or anything helpful..."
            multiline
          />
        </SectionCard>

        <View className="mb-4 flex-row items-start gap-2 rounded-xl border border-primary-300 bg-primary-200 px-3.5 py-3">
          <Ionicons name="information-circle-outline" size={18} color="#a32222" />
          <Text className="flex-1 text-xs leading-5 text-primary-800">
            Submissions are reviewed before appearing in search. Accurate details speed up approval.
          </Text>
        </View>

        <Button
          variant="secondary"
          className="w-full border border-primary-300 bg-primary-200"
          isLoading={isSubmitting}
          onPress={() => formik.handleSubmit()}
          accessibilityLabel="Add business"
        >
          <Button.Label className="text-primary-800">Add</Button.Label>
        </Button>
      </View>
    </FormikProvider>
  );
}
