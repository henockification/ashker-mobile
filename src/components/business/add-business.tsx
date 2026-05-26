import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { useCreateBusiness } from '@/src/hooks/use-business';
import { handleApiError } from '@/src/utils';

import { FullScreenModalLayout } from '../layouts/full-screen-modal';
import { AddBusinessLocationFields, type AddBusinessSubmitValues } from './detail-form';
import { toCreateBusinessPayload } from './helpers/business.helpers';
import { RelationshipForm, type RelationshipValues } from './relationship-form';

export type BusinessRelationshipRole = RelationshipValues['relationship'];

export function AddBusinessScreen() {
  const isPresented = router.canGoBack();
  const createBusiness = useCreateBusiness();
  const [step, setStep] = useState<'relationship' | 'location'>('relationship');
  const [relationship, setRelationship] = useState<BusinessRelationshipRole | null>(null);

  const onClose = () => {
    if (isPresented) {
      router.back();
    } else {
      router.replace(routes.home());
    }
  };

  const onRelationshipSubmit = (values: RelationshipValues) => {
    setRelationship(values.relationship);
    setStep('location');
  };

  const onAddBusiness = async (values: AddBusinessSubmitValues) => {
    try {
      const business = await createBusiness.mutateAsync(toCreateBusinessPayload(values));
      router.replace(routes.home());
    } catch (error) {
      handleApiError(error, 'Unable to add this business. Please try again.');
      throw error;
    }
  };

  return (
    <FullScreenModalLayout variant="dark" className="bg-primary-800" onClose={onClose}>
      <ScrollView
        className="flex-1 bg-primary-800"
        contentContainerClassName="grow px-5 pb-10 pt-14 bg-primary-800"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 text-xl font-bold text-white">Add a business</Text>

        {step === 'relationship' ? (
          <RelationshipForm
            initialValues={relationship ? { relationship } : undefined}
            onSubmit={onRelationshipSubmit}
          />
        ) : (
          <View>
            <Text className="mb-1 text-sm font-semibold text-primary-100">
              {relationship === 'employee' ? 'You work at this business' : "You're a customer"}
            </Text>
            <Text className="mb-5 text-base leading-6 text-white/90">
              Tell us about the business you&apos;d like to add.
            </Text>
            {relationship ? (
              <AddBusinessLocationFields relationship={relationship} onSubmit={onAddBusiness} />
            ) : null}
          </View>
        )}
      </ScrollView>
    </FullScreenModalLayout>
  );
}
