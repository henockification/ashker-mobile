import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainLayout } from '@/src/components/layouts/main';
import { AddBusinessRelationshipSheet, MeProfileLists } from '@/src/components/me';
import { Text } from '@/src/components/ui/text';

const iconMuted = '#52525b';
const iconDark = '#18181b';

type ImpactTab = 'reviews' | 'photos';

const QUICK_ACTIONS = [
  { id: 'review', label: 'Add Review', icon: 'star-outline' as const },
  { id: 'photo', label: 'Add Photo', icon: 'camera-outline' as const },
  { id: 'checkin', label: 'Check In', icon: 'ribbon-outline' as const },
  { id: 'business', label: 'Add Business', icon: 'storefront-outline' as const },
];

export default function MeScreen() {
  const insets = useSafeAreaInsets();
  const [impactTab, setImpactTab] = useState<ImpactTab>('reviews');
  const [addBusinessOpen, setAddBusinessOpen] = useState(false);

  return (
    <>
      <MainLayout contentLayoutSize="wide" footerShown={false}>
        <View className="-mt-10 pb-8" style={{ paddingTop: insets.top + 8 }}>
          <View className="mb-6 flex-row items-center justify-end gap-5 pr-1">
            <Pressable accessibilityRole="button" hitSlop={8}>
              <Ionicons name="notifications-off-outline" size={24} color={iconDark} />
            </Pressable>
            <Pressable accessibilityRole="button" hitSlop={8}>
              <Ionicons name="share-outline" size={24} color={iconDark} />
            </Pressable>
            <Pressable accessibilityRole="button" hitSlop={8}>
              <Ionicons name="qr-code-outline" size={24} color={iconDark} />
            </Pressable>
          </View>

          <View className="items-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add profile photo"
              className="mb-4 h-28 w-28 items-center justify-center rounded-full bg-neutral-100"
            >
              <View className="relative">
                <Ionicons name="camera-outline" size={40} color={iconMuted} />
                <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-neutral-200">
                  <Ionicons name="add" size={14} color={iconMuted} />
                </View>
              </View>
            </Pressable>

            <Text className="text-2xl font-bold text-neutral-900">Henock M.</Text>

            <View className="mt-4 flex-row items-center gap-8">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="person-outline" size={18} color={iconMuted} />
                <Text className="text-base text-neutral-600">0</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="star-outline" size={18} color={iconMuted} />
                <Text className="text-base text-neutral-600">0</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="images-outline" size={18} color={iconMuted} />
                <Text className="text-base text-neutral-600">0</Text>
              </View>
            </View>
          </View>

          <View className="mt-8 flex-row justify-between px-1">
            {QUICK_ACTIONS.map(({ id, label, icon }) => (
              <Pressable
                key={id}
                accessibilityRole="button"
                className="max-w-[22%] flex-1 items-center"
                onPress={() => {
                  if (id === 'business') setAddBusinessOpen(true);
                }}
              >
                <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                  <Ionicons name={icon} size={26} color={iconDark} />
                </View>
                <Text className="text-center text-xs text-neutral-500" numberOfLines={2}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="my-8 h-px bg-neutral-200" />

          <Text className="mb-4 text-lg font-bold text-neutral-900">Impact</Text>

          <View className="flex-row border-b border-neutral-200">
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: impactTab === 'reviews' }}
              className="relative flex-1 items-center pb-3"
              onPress={() => setImpactTab('reviews')}
            >
              <Text
                className={`text-base ${
                  impactTab === 'reviews'
                    ? 'font-semibold text-neutral-900'
                    : 'font-normal text-neutral-500'
                }`}
              >
                Reviews
              </Text>
              {impactTab === 'reviews' ? (
                <View className="absolute bottom-0 left-0 right-0 h-1 rounded-t-sm bg-primary-600" />
              ) : null}
            </Pressable>
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: impactTab === 'photos' }}
              className="relative flex-1 items-center pb-3"
              onPress={() => setImpactTab('photos')}
            >
              <Text
                className={`text-base ${
                  impactTab === 'photos'
                    ? 'font-semibold text-neutral-900'
                    : 'font-normal text-neutral-500'
                }`}
              >
                Photos
              </Text>
              {impactTab === 'photos' ? (
                <View className="absolute bottom-0 left-0 right-0 h-1 rounded-t-sm bg-primary-600" />
              ) : null}
            </Pressable>
          </View>

          <View className="mt-5 flex-row gap-3">
            <View className="flex-1 rounded-xl bg-neutral-100 px-4 py-4">
              <Text className="text-xs uppercase text-neutral-500">reactions all time</Text>
              <Text className="mt-2 text-3xl font-bold text-neutral-900">0</Text>
            </View>
            <View className="flex-1 rounded-xl bg-neutral-100 px-4 py-4">
              <Text className="text-xs uppercase text-neutral-500">views last 90 days</Text>
              <Text className="mt-2 text-3xl font-bold text-neutral-900">0</Text>
            </View>
          </View>

          {impactTab === 'reviews' ? (
            <View className="mt-8">
              <Text className="text-center text-base leading-6 text-neutral-600">
                Reactions await! Write your first review to help others discover a business.
              </Text>
              <Pressable
                accessibilityRole="button"
                className="mt-6 w-full items-center rounded-xl border border-neutral-200 bg-white py-4"
              >
                <Text className="text-base font-bold text-neutral-900">Write a review</Text>
              </Pressable>
            </View>
          ) : (
            <View className="mt-8">
              <Text className="text-center text-base leading-6 text-neutral-600">
                Your photos will show how businesses look and feel. Add your first photo.
              </Text>
              <Pressable
                accessibilityRole="button"
                className="mt-6 w-full items-center rounded-xl border border-neutral-200 bg-white py-4"
              >
                <Text className="text-base font-bold text-neutral-900">Add a photo</Text>
              </Pressable>
            </View>
          )}

          <MeProfileLists />
        </View>
      </MainLayout>

      <AddBusinessRelationshipSheet
        visible={addBusinessOpen}
        onClose={() => setAddBusinessOpen(false)}
      />
    </>
  );
}
