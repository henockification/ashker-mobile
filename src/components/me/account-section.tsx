import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';

import { MeListRow } from './me-list-row';

const iconDark = '#18181b';

export function AccountSection() {
  return (
    <View className="-mx-5 bg-white">
      <Text className="px-5 pb-2 pt-4 text-base font-bold text-neutral-900">Account</Text>
      <MeListRow
        label="Preferences"
        leading={<Ionicons name="heart-outline" size={26} color={iconDark} />}
      />
      <MeListRow
        label="Profile"
        leading={<Ionicons name="person-circle-outline" size={26} color={iconDark} />}
      />
      <MeListRow
        label="Support"
        leading={<Ionicons name="help-buoy-outline" size={26} color={iconDark} />}
      />
      <MeListRow
        label="Settings"
        leading={<Ionicons name="settings-outline" size={26} color={iconDark} />}
        isLast
      />
    </View>
  );
}
