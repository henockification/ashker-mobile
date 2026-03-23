import { Ionicons } from '@expo/vector-icons';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { Text } from '@/src/components/ui/text';

interface AddBusinessLocationFieldsProps {
  defaultCountryCode?: string;
  variant?: 'web' | 'mobile';
}

interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

const REQUIRED_FIELDS = ['Name', 'Address', 'Category'] as const;
const OPTIONAL_FIELDS = ['Phone', 'Website', 'Notes for our Team'] as const;
const COUNTRY_OPTIONS = require('../../../data/add-business-countries.json') as CountryOption[];

const WebIFrame = 'iframe' as unknown as ComponentType<Record<string, unknown>>;

function FormField({
  label,
  placeholder,
  multiline = false,
  showUseCurrentLocation = false,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  multiline?: boolean;
  showUseCurrentLocation?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-semibold text-neutral-700">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`rounded-xl border border-neutral-200 bg-white px-4 text-base text-neutral-900 ${
          multiline ? 'min-h-[120px] py-3' : 'py-3'
        }`}
      />
      {showUseCurrentLocation ? (
        <Pressable className="mt-2 self-start rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1.5">
          <Text className="text-xs font-semibold text-neutral-700">Use current location</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function AddressMapPreview({ address }: { address: string }) {
  const mapsQuery = encodeURIComponent(address);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <View className="mb-4 overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <View className="border-b border-neutral-200 px-4 py-3">
        <Text className="text-sm font-semibold text-neutral-900">Pin business location</Text>
        <Text className="mt-1 text-xs text-neutral-600">
          Confirm the pin is placed correctly for this address.
        </Text>
      </View>
      <View className="h-[260px] w-full bg-neutral-100">
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
  defaultCountryCode = 'US',
  variant = Platform.OS === 'web' || typeof document !== 'undefined' ? 'web' : 'mobile',
}: AddBusinessLocationFieldsProps) {
  const defaultCountry = useMemo(
    () =>
      COUNTRY_OPTIONS.find((country) => country.code === defaultCountryCode) ?? COUNTRY_OPTIONS[0],
    [defaultCountryCode],
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(defaultCountry);
  const [countryOpen, setCountryOpen] = useState(false);
  const [address, setAddress] = useState('');

  if (variant === 'web') {
    return (
      <View className="pt-1">
        <Text className="mb-4 text-lg font-semibold text-neutral-900">Location details</Text>

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-semibold text-neutral-700">Country</Text>
          <Pressable
            className="flex-row items-center rounded-xl border border-neutral-200 bg-white px-4 py-3"
            onPress={() => setCountryOpen((current) => !current)}
          >
            <Text className="mr-2 text-lg">{selectedCountry.flag}</Text>
            <Text className="flex-1 text-base text-neutral-900">{selectedCountry.name}</Text>
            <Ionicons
              name={countryOpen ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="#a1a1aa"
            />
          </Pressable>
          {countryOpen ? (
            <View className="mt-2 overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {COUNTRY_OPTIONS.map((country, index) => {
                const selected = country.code === selectedCountry.code;
                return (
                  <Pressable
                    key={country.code}
                    className={`flex-row items-center px-4 py-3 ${
                      index < COUNTRY_OPTIONS.length - 1 ? 'border-b border-neutral-100' : ''
                    }`}
                    onPress={() => {
                      setSelectedCountry(country);
                      setCountryOpen(false);
                    }}
                  >
                    <Text className="mr-2 text-lg">{country.flag}</Text>
                    <Text className="flex-1 text-base text-neutral-800">{country.name}</Text>
                    {selected ? <Ionicons name="checkmark" size={18} color="#18181b" /> : null}
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        <View className="mb-1 border-t border-neutral-200 pt-4">
          <Text className="mb-3 text-sm font-semibold text-neutral-800">Required Information</Text>
          <FormField label="Name" placeholder="Business name" />
          <FormField
            label="Address"
            placeholder="Street, city, state"
            showUseCurrentLocation
            value={address}
            onChangeText={setAddress}
          />
          {address.trim().length > 3 ? <AddressMapPreview address={address} /> : null}
          <FormField label="Category" placeholder="e.g. Coffee Shop" />
        </View>

        <View className="mt-2 border-t border-neutral-200 pt-4">
          <Text className="mb-3 text-sm font-semibold text-neutral-800">Optional Details</Text>
          <FormField label="Phone" placeholder="+1 555 000 1234" />
          <FormField label="Website" placeholder="https://example.com" />
          <FormField
            label="Notes for our Team"
            placeholder="Anything helpful for verification..."
            multiline
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <View className="-mx-5 mb-4 bg-neutral-100 px-5 py-2">
        <Text className="text-sm font-semibold text-neutral-800">Country</Text>
      </View>
      <Pressable
        className="-mx-5 flex-row items-center border-b border-neutral-200 px-5 py-3"
        onPress={() => setCountryOpen((current) => !current)}
      >
        <Text className="flex-1 text-base text-neutral-800">{selectedCountry.name}</Text>
        <Text className="mr-2 text-lg">{selectedCountry.flag}</Text>
        <Ionicons name={countryOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#a1a1aa" />
      </Pressable>
      {countryOpen ? (
        <View className="-mx-5 mb-4 border-b border-neutral-200 bg-white">
          {COUNTRY_OPTIONS.map((country, index) => {
            const selected = country.code === selectedCountry.code;
            return (
              <Pressable
                key={country.code}
                className={`flex-row items-center px-5 py-3 ${
                  index < COUNTRY_OPTIONS.length - 1 ? 'border-b border-neutral-100' : ''
                }`}
                onPress={() => {
                  setSelectedCountry(country);
                  setCountryOpen(false);
                }}
              >
                <Text className="mr-2 text-lg">{country.flag}</Text>
                <Text
                  className={`flex-1 text-base ${selected ? 'font-semibold text-neutral-900' : 'text-neutral-700'}`}
                >
                  {country.name}
                </Text>
                {selected ? <Ionicons name="checkmark" size={18} color="#18181b" /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View className="mb-4" />
      )}

      <View className="-mx-5 mb-2 bg-neutral-100 px-5 py-2">
        <Text className="text-sm font-semibold text-neutral-800">Required Information</Text>
      </View>
      {REQUIRED_FIELDS.map((label) => (
        <Pressable
          key={label}
          className="-mx-5 flex-row items-center border-b border-neutral-200 px-5 py-3.5"
        >
          <Text className="flex-1 text-base text-neutral-400">{label}</Text>
          <Ionicons name="chevron-forward" size={16} color="#b4b4bb" />
        </Pressable>
      ))}

      <View className="-mx-5 mb-2 mt-4 bg-neutral-100 px-5 py-2">
        <Text className="text-sm font-semibold text-neutral-800">Optional Details</Text>
      </View>
      {OPTIONAL_FIELDS.map((label) => (
        <Pressable
          key={label}
          className="-mx-5 flex-row items-center border-b border-neutral-200 px-5 py-3.5"
        >
          <Text className="flex-1 text-base text-neutral-400">{label}</Text>
          <Ionicons name="chevron-forward" size={16} color="#b4b4bb" />
        </Pressable>
      ))}
    </>
  );
}
