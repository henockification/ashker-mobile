import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';

const iconDark = '#18181b';
const collectionChip = '#f4f4f5';

type FeedCard = {
  id: string;
  place: string;
  location: string;
  collection: string;
  summary: string;
  tags: string[];
  vibeIcon: React.ComponentProps<typeof Ionicons>['name'];
};

const INTEREST_COLLECTIONS = [
  'Coffee spots',
  'Date night',
  'Weekend brunch',
  'Outdoor hangs',
  'Live music',
] as const;

const FEED_ITEMS: FeedCard[] = [
  {
    id: '1',
    place: 'Dawn & Oak Cafe',
    location: 'Austin, TX',
    collection: 'Coffee spots',
    summary: 'People in your saved coffee collection keep adding this one for quiet work mornings.',
    tags: ['Wifi', 'Calm', 'Open early'],
    vibeIcon: 'cafe-outline',
  },
  {
    id: '2',
    place: 'Luna Terrace',
    location: 'Chicago, IL',
    collection: 'Date night',
    summary: 'Trending with users who bookmark rooftop date spots. Most saves happen after 7pm.',
    tags: ['Rooftop', 'Cocktails', 'City view'],
    vibeIcon: 'moon-outline',
  },
  {
    id: '3',
    place: 'Riverside Public Market',
    location: 'Portland, OR',
    collection: 'Weekend brunch',
    summary: 'Featured by people following your brunch collections for diverse food stalls.',
    tags: ['Family friendly', 'Bakery', 'Local picks'],
    vibeIcon: 'restaurant-outline',
  },
];

const QUICK_FEED_SIGNALS = [
  { id: 'saved', label: 'Saved by similar users', icon: 'people-outline' as const },
  { id: 'nearby', label: 'From places near your interests', icon: 'location-outline' as const },
  { id: 'new', label: 'New in your collections', icon: 'sparkles-outline' as const },
] as const;

function FeedCardItem({ card }: { card: FeedCard }) {
  return (
    <Pressable className="mb-4 rounded-2xl border border-neutral-200 bg-white p-4">
      <View className="mb-3 flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-semibold text-neutral-900">{card.place}</Text>
          <View className="mt-1 flex-row items-center">
            <Ionicons name="location-outline" size={15} color="#52525b" />
            <Text className="ml-1 text-sm text-neutral-600">{card.location}</Text>
          </View>
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
          <Ionicons name={card.vibeIcon} size={20} color={iconDark} />
        </View>
      </View>

      <View className="mb-3 self-start rounded-full bg-blue-100 px-3 py-1.5">
        <Text className="text-xs font-semibold text-blue-800">From {card.collection}</Text>
      </View>

      <Text className="text-sm leading-6 text-neutral-700">{card.summary}</Text>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {card.tags.map((tag) => (
          <View key={tag} className="rounded-full bg-neutral-100 px-3 py-1.5">
            <Text className="text-xs text-neutral-700">{tag}</Text>
          </View>
        ))}
      </View>

      <View className="mt-4 flex-row items-center justify-between border-t border-neutral-200 pt-3">
        <Pressable className="flex-row items-center">
          <Ionicons name="bookmark-outline" size={18} color={iconDark} />
          <Text className="ml-1 text-sm text-neutral-800">Save</Text>
        </Pressable>
        <Pressable className="flex-row items-center">
          <Ionicons name="share-social-outline" size={18} color={iconDark} />
          <Text className="ml-1 text-sm text-neutral-800">Share</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function FeedScreen() {
  const [selectedCollection, setSelectedCollection] = useState<string>(INTEREST_COLLECTIONS[0]);

  const visibleCards = useMemo(
    () => FEED_ITEMS.filter((item) => item.collection === selectedCollection),
    [selectedCollection],
  );

  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="pb-8">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-neutral-900">Your feed</Text>
          <Text className="mt-2 text-base leading-6 text-neutral-600">
            Personalized updates from collections and places you are interested in.
          </Text>
        </View>

        <View className="mb-5 rounded-2xl bg-neutral-100 p-4">
          <Text className="mb-3 text-sm font-semibold text-neutral-800">
            Why you are seeing this
          </Text>
          {QUICK_FEED_SIGNALS.map((signal) => (
            <View key={signal.id} className="mb-2 flex-row items-center last:mb-0">
              <Ionicons name={signal.icon} size={18} color={iconDark} />
              <Text className="ml-2 text-sm text-neutral-700">{signal.label}</Text>
            </View>
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          style={{ marginHorizontal: -20, paddingHorizontal: 20 }}
        >
          {INTEREST_COLLECTIONS.map((collection) => {
            const active = collection === selectedCollection;
            return (
              <Pressable
                key={collection}
                onPress={() => setSelectedCollection(collection)}
                className="mr-3 rounded-full px-4 py-2.5"
                style={{ backgroundColor: active ? '#18181b' : collectionChip }}
              >
                <Text
                  className={`text-sm ${active ? 'font-semibold text-white' : 'text-neutral-700'}`}
                >
                  {collection}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="mt-4">
          {visibleCards.length > 0 ? (
            visibleCards.map((card) => <FeedCardItem key={card.id} card={card} />)
          ) : (
            <View className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <Text className="text-lg font-semibold text-neutral-900">No updates yet</Text>
              <Text className="mt-2 text-base text-neutral-600">
                Follow more collections to see places picked for your interests.
              </Text>
            </View>
          )}
        </View>
      </View>
    </MainLayout>
  );
}
