import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';

import { AddedBusinessesMenuIcon, ReviewsMenuIcon } from './me-leading-icons';
import { MeListRow } from './me-list-row';

export function ContributionsSection() {
  return (
    <View className="-mx-5 bg-white">
      <Text className="px-5 pb-2 pt-4 text-base font-bold text-neutral-900">Contributions</Text>
      <MeListRow label="Reviews" value="0" leading={<ReviewsMenuIcon />} />
      <MeListRow label="Added businesses" value="0" leading={<AddedBusinessesMenuIcon />} isLast />
    </View>
  );
}
