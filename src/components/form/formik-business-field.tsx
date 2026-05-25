import { useField } from 'formik';
import { Pressable, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/src/components/ui/text';

interface FormikBusinessFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  showUseCurrentLocation?: boolean;
  onUseCurrentLocation?: () => void;
}

export function FormikBusinessField({
  name,
  label,
  placeholder = '',
  multiline = false,
  showUseCurrentLocation = false,
  onUseCurrentLocation,
}: FormikBusinessFieldProps) {
  const [field, meta, helpers] = useField<string>(name);
  const showError = meta.touched && !!meta.error;

  return (
    <View className="mb-4 last:mb-0">
      <Text className="mb-1.5 text-sm font-semibold text-neutral-800">{label}</Text>
      <TextInput
        value={field.value}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`rounded-xl border bg-neutral-50 px-4 text-base text-neutral-900 ${
          showError ? 'border-danger-600' : 'border-neutral-200'
        } ${multiline ? 'min-h-[112px] py-3' : 'py-3.5'}`}
      />
      {showUseCurrentLocation ? (
        <Pressable
          className="mt-2.5 flex-row items-center self-start rounded-full border border-primary-200 bg-white px-3.5 py-2"
          onPress={onUseCurrentLocation}
        >
          <Ionicons name="locate-outline" size={14} color="#c62828" />
          <Text className="ml-1.5 text-xs font-semibold text-primary-700">Use current location</Text>
        </Pressable>
      ) : null}
      {showError ? <Text className="mt-1.5 text-xs text-danger-600">{meta.error}</Text> : null}
    </View>
  );
}
