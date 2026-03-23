import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Text } from '@/src/components/ui/text';

import { TalkMenuIcon, YelpEliteMenuIcon } from './me-leading-icons';
import { MeListRow } from './me-list-row';

const iconDark = '#18181b';

export function CommunitySection() {
  return (
    <View className="-mx-5 bg-white">
      <Text className="px-5 pb-2 pt-4 text-base font-bold text-neutral-900">Community</Text>
      <MeListRow label="Yelp Elite Squad" leading={<YelpEliteMenuIcon />} />
      <MeListRow
        label="Messages"
        leading={<Ionicons name="chatbubble-ellipses-outline" size={26} color={iconDark} />}
      />
      <MeListRow
        label="Find friends"
        leading={<Ionicons name="person-add-outline" size={26} color={iconDark} />}
      />
      <MeListRow
        label="Events"
        leading={<Ionicons name="calendar-outline" size={26} color={iconDark} />}
      />
      <MeListRow
        label="Activity feed"
        leading={<Ionicons name="pulse-outline" size={26} color={iconDark} />}
      />
      <MeListRow label="Talk" leading={<TalkMenuIcon />} isLast />
    </View>
  );
}
