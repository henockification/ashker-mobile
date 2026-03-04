import { View } from 'react-native';

import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';

export default function SearchScreen() {
  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="py-8">
        <Text className="text-xl font-semibold text-neutral-900 mb-2">
          No recommendations nearby
        </Text>
        <Text className="text-base text-neutral-600">
          Set your location above to explore another location.
        </Text>
      </View>
    </MainLayout>
  );
}
