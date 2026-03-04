import { View } from 'react-native';

import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';

export default function ProjectsScreen() {
  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="py-8">
        <Text className="text-xl font-semibold text-neutral-900">Projects</Text>
        <Text className="text-base text-neutral-600 mt-2">Your projects will appear here.</Text>
      </View>
    </MainLayout>
  );
}
