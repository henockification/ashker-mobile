import { View } from 'react-native';

import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';

export default function MeScreen() {
  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="py-8">
        <Text className="text-xl font-semibold text-neutral-900">Me</Text>
        <Text className="text-base text-neutral-600 mt-2">Your profile and settings.</Text>
      </View>
    </MainLayout>
  );
}
