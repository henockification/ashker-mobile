import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';

import { ReservationsMenuIcon } from './me-leading-icons';
import { MeListRow } from './me-list-row';

const iconDark = '#18181b';

export function YourActivitySection() {
  return (
    <View className="-mx-5 bg-white">
      <Text className="px-5 pb-2 pt-4 text-base font-bold text-neutral-900">Your activity</Text>
      <MeListRow label="Reservations" value="0" leading={<ReservationsMenuIcon />} />
      <MeListRow
        label="Activity"
        leading={<Ionicons name="pulse-outline" size={26} color={iconDark} />}
        isLast
      />
    </View>
  );
}
