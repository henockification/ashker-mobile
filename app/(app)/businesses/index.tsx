import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';
import { type Business, MOCK_BUSINESSES } from '@/src/data/mock-businesses';

const FILTERS = ['All', 'Trending', 'Saved by friends', 'Nearby'] as const;

function BusinessCard({ business, onPress }: { business: Business; onPress: () => void }) {
  return (
    <Pressable
      className="mb-3 rounded-2xl border border-neutral-200 bg-white p-4"
      onPress={onPress}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-semibold text-neutral-900">{business.name}</Text>
          <Text className="mt-1 text-sm text-neutral-600">
            {business.category} - {business.city}
          </Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text className="ml-1 text-sm text-neutral-700">
              {business.rating} ({business.reviews} reviews) - {business.price}
            </Text>
          </View>
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
          <Ionicons name="storefront-outline" size={20} color="#18181b" />
        </View>
      </View>
      <View className="mt-3 flex-row items-center justify-between border-t border-neutral-200 pt-3">
        <Text className="text-xs text-neutral-600">{business.savedBy} saves from your network</Text>
        <Ionicons name="chevron-forward" size={16} color="#71717a" />
      </View>
    </Pressable>
  );
}

export default function BusinessesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');

  const filteredBusinesses = useMemo(() => {
    const text = query.trim().toLowerCase();
    const byQuery = text
      ? MOCK_BUSINESSES.filter(
          (item) =>
            item.name.toLowerCase().includes(text) ||
            item.category.toLowerCase().includes(text) ||
            item.city.toLowerCase().includes(text),
        )
      : MOCK_BUSINESSES;

    if (activeFilter === 'Trending') return [...byQuery].sort((a, b) => b.savedBy - a.savedBy);
    if (activeFilter === 'Nearby') return byQuery.filter((item) => item.city === 'Addis Ababa');
    if (activeFilter === 'Saved by friends') return byQuery.filter((item) => item.savedBy >= 60);

    return byQuery;
  }, [activeFilter, query]);

  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="pb-8">
        <Text className="text-2xl font-bold text-neutral-900">Businesses</Text>
        <Text className="mt-2 text-base text-neutral-600">
          Browse businesses from your interests and saved collections.
        </Text>

        <View className="mt-4 flex-row items-center rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <Ionicons name="search" size={18} color="#52525b" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            className="ml-2 flex-1 text-base text-neutral-900"
            placeholder="Search businesses"
            placeholderTextColor="#a1a1aa"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          className="mt-1"
        >
          {FILTERS.map((filter) => {
            const active = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className="mr-2 rounded-full px-4 py-2"
                style={{ backgroundColor: active ? '#18181b' : '#f4f4f5' }}
              >
                <Text
                  className={`text-sm ${active ? 'font-semibold text-white' : 'text-neutral-700'}`}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="mt-3">
          {filteredBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onPress={() => router.push(`/businesses/${business.id}`)}
            />
          ))}
          {filteredBusinesses.length === 0 ? (
            <View className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <Text className="text-base font-semibold text-neutral-900">No businesses found</Text>
              <Text className="mt-1 text-sm text-neutral-600">
                Try a different search or change filters.
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </MainLayout>
  );
}
