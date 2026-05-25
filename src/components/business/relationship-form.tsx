import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui/text';

export type RelationshipValues = {
  relationship: 'customer' | 'employee';
};

export type RelationshipRenderProps = {
  isValid: boolean;
};

interface RelationshipFormProps {
  children?: React.ReactNode | ((props: RelationshipRenderProps) => React.ReactNode);
  initialValues?: RelationshipValues;
  onSubmit: (values: RelationshipValues) => void;
}

const buttonBg = '#f4f4f5';

function AddBusinessIllustration() {
  return (
    <View className="h-[200px] w-full flex-row items-end justify-center gap-4 px-4">
      <View className="items-center">
        <View className="mb-2 h-14 w-14 rounded-full bg-neutral-300" />
        <View className="h-16 w-12 rounded-lg bg-neutral-400" />
        <View className="mt-1 h-12 w-14 rounded-md bg-neutral-500" />
      </View>
      <View className="h-24 w-40 rounded-t-xl border border-neutral-200 bg-white px-2 pt-3">
        <View className="h-2 w-full rounded bg-neutral-200" />
        <View className="mt-2 flex-row items-center gap-2">
          <View className="h-10 w-10 rounded-full bg-neutral-300" />
          <View className="h-10 flex-1 rounded bg-neutral-100" />
        </View>
      </View>
    </View>
  );
}

export const RelationshipForm = ({ onSubmit, initialValues, children }: RelationshipFormProps) => {
  const [selected, setSelected] = useState<RelationshipValues['relationship'] | null>(
    initialValues?.relationship ?? null,
  );

  const handleChoice = (relationship: RelationshipValues['relationship']) => {
    setSelected(relationship);
    onSubmit({ relationship });
  };

  const renderProps: RelationshipRenderProps = { isValid: selected !== null };

  return (
    <>
      <View className="mb-6 overflow-hidden rounded-2xl bg-neutral-100 py-4">
        <AddBusinessIllustration />
      </View>

      <Text className="mb-6 px-1 text-center text-base leading-6 text-white">
        What&apos;s your relationship with the business you&apos;d like to add?
      </Text>

      <Pressable
        accessibilityRole="button"
        className="mb-3 w-full items-center rounded-xl py-4"
        style={{
          backgroundColor: buttonBg,
          borderWidth: selected === 'customer' ? 2 : 0,
          borderColor: selected === 'customer' ? '#c62828' : 'transparent',
        }}
        onPress={() => handleChoice('customer')}
      >
        <Text className="text-base font-medium text-neutral-900">I&apos;m a customer</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        className="w-full items-center rounded-xl py-4"
        style={{
          backgroundColor: buttonBg,
          borderWidth: selected === 'employee' ? 2 : 0,
          borderColor: selected === 'employee' ? '#c62828' : 'transparent',
        }}
        onPress={() => handleChoice('employee')}
      >
        <Text className="text-base font-medium text-neutral-900">I work at the business</Text>
      </Pressable>

      {typeof children === 'function' ? children(renderProps) : children}
    </>
  );
};
