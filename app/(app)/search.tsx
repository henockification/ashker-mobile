import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import AddPlus from '@/assets/icons/add-plus.svg';
import Checklist from '@/assets/icons/checklist.svg';
import ChefHat from '@/assets/icons/chef-hat.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import SearchIcon from '@/assets/icons/search.svg';
import Tuning from '@/assets/icons/tuning.svg';
import { MainLayout } from '@/src/components/layouts/main';
import { MoreCategoriesDrawer } from '@/src/components/search/more-categories-drawer';
import { Text } from '@/src/components/ui/text';

const TOP_CATEGORIES = [
  { id: 'restaurants', label: 'Restaurants', Icon: ChefHat },
  { id: 'auto-repair', label: 'Auto Repair', Icon: Tuning },
  { id: 'movers', label: 'Movers', Icon: Checklist },
  { id: 'plumbers', label: 'Plumbers', Icon: Checklist },
  { id: 'cleaning', label: 'Cleaning', Icon: Checklist },
] as const;

const iconColor = '#27272a';

export default function SearchScreen() {
  const [moreDrawerVisible, setMoreDrawerVisible] = useState(false);

  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="pb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          style={{ marginHorizontal: -20, paddingHorizontal: 20 }}
        >
          {TOP_CATEGORIES.map(({ id, label, Icon }) => (
            <Pressable
              key={id}
              className="flex-row items-center rounded-full bg-neutral-100 px-4 py-2.5"
              style={{ marginRight: 12 }}
            >
              <Icon width={20} height={20} stroke={iconColor} fill={iconColor} />
              <Text className="ml-2 text-sm font-medium text-neutral-900">{label}</Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => setMoreDrawerVisible(true)}
            className="flex-row items-center rounded-full bg-neutral-100 px-4 py-2.5"
            style={{ marginRight: 12 }}
          >
            <AddPlus width={20} height={20} stroke={iconColor} fill={iconColor} />
            <Text className="ml-2 text-sm font-medium text-neutral-900">More</Text>
          </Pressable>
        </ScrollView>
      </View>

      <View className="mb-4">
        <View className="flex-row items-center rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <SearchIcon width={20} height={20} fill={iconColor} />
          <TextInput
            className="ml-3 flex-1 text-base text-neutral-900"
            placeholder="Search for painters"
            placeholderTextColor="#a1a1aa"
            returnKeyType="search"
          />
        </View>
        <Pressable className="mt-2 flex-row items-center">
          <Text className="text-sm text-neutral-600">Exploring: Location unavailable</Text>
          <View className="ml-1">
            <ChevronDown width={14} height={7} stroke={iconColor} />
          </View>
        </Pressable>
      </View>

      <View className="py-8">
        <Text className="mb-2 text-xl font-semibold text-neutral-900">
          No recommendations nearby
        </Text>
        <Text className="mb-6 text-base text-neutral-600">
          Set your location above to explore another location.
        </Text>
        <View className="overflow-hidden rounded-2xl bg-neutral-100" style={{ aspectRatio: 1.15 }}>
          <Image
            source={require('@/assets/illustrations/no-recommendation.png')}
            contentFit="contain"
            className="h-full w-full"
          />
        </View>
      </View>

      <MoreCategoriesDrawer
        visible={moreDrawerVisible}
        onClose={() => setMoreDrawerVisible(false)}
      />
    </MainLayout>
  );
}
