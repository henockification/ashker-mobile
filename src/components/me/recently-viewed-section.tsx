import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui/text';
import { routes } from '@/src/constants/routes';
import { useBusinesses } from '@/src/hooks/use-business';
import type { Business } from '@/src/types/business';

const THUMBNAIL_SIZE = 48;
const ROW_HORIZONTAL_PADDING = 20;
const THUMBNAIL_GAP = 12;
const DIVIDER_MARGIN_LEFT =
  ROW_HORIZONTAL_PADDING + THUMBNAIL_SIZE + THUMBNAIL_GAP;

function formatBusinessAddress(business: Business): string {
  const parts = [business.address, business.city, business.state, business.country].filter(
    (part): part is string => Boolean(part?.trim()),
  );

  return parts.join(', ');
}

function RecentlyViewedRow({
  business,
  isLast,
  onPress,
}: {
  business: Business;
  isLast: boolean;
  onPress: () => void;
}) {
  const address = formatBusinessAddress(business);

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${business.name}`}
        className="flex-row items-center px-5 py-3.5"
        onPress={onPress}
      >
        <View
          className="items-center justify-center rounded-lg bg-neutral-100"
          style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }}
        >
          <Ionicons name="business-outline" size={24} color="#71717a" />
        </View>

        <View className="ml-3 min-h-[48px] flex-1 justify-center pr-2">
          <Text className="text-base font-bold text-neutral-900">{business.name}</Text>
          {address ? (
            <Text className="mt-0.5 text-sm leading-5 text-neutral-500" numberOfLines={2}>
              {address}
            </Text>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Save ${business.name}`}
          hitSlop={8}
          onPress={() => {}}
        >
          <Ionicons name="bookmark-outline" size={22} color="#18181b" />
        </Pressable>
      </Pressable>

      {!isLast ? (
        <View
          className="mr-5 h-px bg-neutral-200"
          style={{ marginLeft: DIVIDER_MARGIN_LEFT }}
        />
      ) : null}
    </View>
  );
}

const RECENTLY_VIEWED_LIMIT = 10;

export function RecentlyViewedSection() {
  const { data, isLoading, isError } = useBusinesses();
  const businesses = useMemo(
    () =>
      [...(data?.businesses ?? [])]
        .sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, RECENTLY_VIEWED_LIMIT),
    [data?.businesses],
  );

  return (
    <View className="-mx-5 bg-white">
      <Text className="px-5 pb-2 pt-4 text-base font-bold text-neutral-900">Recently viewed</Text>

      {isLoading ? (
        <View className="items-center py-8">
          <ActivityIndicator size="small" color="#71717a" />
        </View>
      ) : null}

      {!isLoading && !isError && businesses.length === 0 ? (
        <Text className="px-5 pb-4 text-sm text-neutral-500">
          Businesses you view will show up here.
        </Text>
      ) : null}

      {!isLoading && !isError
        ? businesses.map((business, index) => (
            <RecentlyViewedRow
              key={business.id}
              business={business}
              isLast={index === businesses.length - 1}
              onPress={() => router.push(routes.app.business(business.id))}
            />
          ))
        : null}
    </View>
  );
}
