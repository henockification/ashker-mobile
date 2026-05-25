import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import IconMore from '@/assets/icons/icon-more.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { MainLayout } from '@/src/components/layouts/main';
import { MoreCategoriesDrawer } from '@/src/components/search/more-categories-drawer';
import { Text } from '@/src/components/ui/text';
import { useCategories } from '@/src/hooks/use-categories';
import { RegistryIcon } from '@/src/utils/iconRegistry';

const iconColor = '#27272a';
const TOP_CATEGORY_COUNT = 4;
const categoryChipIconSize = 16;
const categoryChipGap = 8;

export default function SearchScreen() {
  const [moreDrawerVisible, setMoreDrawerVisible] = useState(false);
  const { data: categories = [] } = useCategories();

  const topCategories = useMemo(
    () =>
      categories
        .filter((category) => category.isActive && category.parentCategory !== null && category.icon !== null)
        .slice(0, TOP_CATEGORY_COUNT),
    [categories],
  );

  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="pb-4">
        <View
          className="flex-row items-start py-0"
          style={{ gap: categoryChipGap }}
        >
          {topCategories.map((category) => (
            <Pressable
              key={category.id}
              className="min-w-0 flex-1 flex-col items-center"
            >
              <View className="items-center justify-center rounded-full bg-neutral-100 p-2">
                <RegistryIcon
                  icon={category.icon}
                  width={categoryChipIconSize}
                  height={categoryChipIconSize}
                  color={iconColor}
                />
              </View>
              <Text
                className="mt-1 text-center text-xs font-medium text-neutral-900"
                numberOfLines={2}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => setMoreDrawerVisible(true)}
            className="min-w-0 flex-1 flex-col items-center"
          >
            <View className="items-center justify-center rounded-full bg-neutral-100 p-2">
              <IconMore width={categoryChipIconSize} height={categoryChipIconSize} color={iconColor} />
            </View>
            <Text className="mt-1 text-center text-xs font-medium text-neutral-900">More</Text>
          </Pressable>
        </View>
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
