import { View } from 'react-native';

import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';

export default function CollectionsScreen() {
  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="py-8">
        <Text className="text-xl font-semibold text-neutral-900">Collections</Text>
        <Text className="text-base text-neutral-600 mt-2">Your collections will appear here.</Text>
      </View>
    </MainLayout>
  );
}
