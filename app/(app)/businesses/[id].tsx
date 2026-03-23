import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { ReviewSection } from '@/src/components/business/review-section';
import { MainLayout } from '@/src/components/layouts/main';
import { Text } from '@/src/components/ui/text';
import { getBusinessById } from '@/src/data/mock-businesses';

const WebIFrame = 'iframe' as unknown as ComponentType<Record<string, unknown>>;

type DetailTab = 'info' | 'reviews';
type PriceOption = 'Low' | 'Moderate' | 'Pricey' | 'High-end';

const PRICE_OPTIONS: PriceOption[] = ['Low', 'Moderate', 'Pricey', 'High-end'];
const RECOMMEND_OPTIONS = ['Yes', 'No', 'Maybe'] as const;
const SUGGESTED = [
  { id: '1', name: "D'arcy's Pint", rating: 4.1, reviews: 745, note: 'Busy with lots of locals.' },
  { id: '2', name: "Chili's", rating: 3.0, reviews: 71, note: 'Popular casual dining nearby.' },
];

function StarRating({ rating, accentColor }: { rating: number; accentColor: string }) {
  const full = Math.floor(rating);
  return (
    <View className="flex-row items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < full ? 'star' : 'star-outline'}
          size={14}
          color={i < full ? accentColor : '#d4d4d8'}
          style={{ marginRight: 2 }}
        />
      ))}
      <Text className="ml-1 text-xs text-neutral-700">{rating.toFixed(1)}</Text>
    </View>
  );
}

function MapPreview({ query }: { query: string }) {
  const q = encodeURIComponent(query);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (Platform.OS === 'web') {
    return (
      <View className="h-[230px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
        <WebIFrame
          title="Business location map"
          src={mapsEmbedUrl}
          style={{ border: 0, width: '100%', height: '100%' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </View>
    );
  }

  return (
    <View className="h-[230px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100">
      <Ionicons name="map-outline" size={36} color="#52525b" />
      <Text className="mt-2 text-sm text-neutral-600">Map preview</Text>
    </View>
  );
}

export default function BusinessDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web' || typeof document !== 'undefined';
  const primary = useCSSVariable('--color-primary-600');
  const primaryColor = typeof primary === 'string' ? primary : '#23537c';

  const [tab, setTab] = useState<DetailTab>('info');
  const [priceRange, setPriceRange] = useState<PriceOption | null>(null);
  const [recommendation, setRecommendation] = useState<(typeof RECOMMEND_OPTIONS)[number] | null>(
    null,
  );
  const [heroIndex, setHeroIndex] = useState(0);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const ellipsisRef = useRef<View>(null);
  const [popoverAnchor, setPopoverAnchor] = useState({ x: 16, y: 16, width: 0, height: 0 });

  const business = getBusinessById(id ?? '');
  const heroImages = business?.photos?.length
    ? business.photos.map((uri) => ({ uri }))
    : [require('@/assets/illustrations/no-recommendation.png')];

  const ACTIONS = [
    {
      id: 'edit',
      label: 'Suggest an Edit',
      icon: 'create-outline' as const,
      tone: 'accent' as const,
      onPress: () => setOptionsOpen(false),
    },
    {
      id: 'checkin',
      label: 'Check In',
      icon: 'ribbon-outline' as const,
      tone: 'muted' as const,
      onPress: () => setOptionsOpen(false),
    },
    {
      id: 'review',
      label: 'Add Review',
      icon: 'star-outline' as const,
      tone: 'muted' as const,
      onPress: () => setOptionsOpen(false),
    },
    {
      id: 'photo',
      label: 'Add Photo or Video',
      icon: 'camera-outline' as const,
      tone: 'muted' as const,
      onPress: () => setOptionsOpen(false),
    },
    {
      id: 'save',
      label: 'Save Business',
      icon: 'bookmark-outline' as const,
      tone: 'muted' as const,
      onPress: () => setOptionsOpen(false),
    },
    {
      id: 'share',
      label: 'Share Business',
      icon: 'share-outline' as const,
      tone: 'muted' as const,
      onPress: () => setOptionsOpen(false),
    },
  ] as const;

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const intervalId = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [heroImages.length]);

  const openOptions = () => {
    if (isWeb && ellipsisRef.current?.measureInWindow) {
      ellipsisRef.current.measureInWindow((x, y, width, height) => {
        setPopoverAnchor({ x, y, width, height });
        setOptionsOpen(true);
      });
      return;
    }

    setOptionsOpen(true);
  };

  if (!business) {
    return (
      <MainLayout contentLayoutSize="wide" footerShown={false}>
        <View className="py-16">
          <Text className="text-2xl font-bold text-neutral-900">Business not found</Text>
          <Pressable
            className="mt-4 self-start rounded-lg border border-neutral-300 px-4 py-2"
            onPress={() => router.back()}
          >
            <Text className="text-base text-neutral-800">Go back</Text>
          </Pressable>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout contentLayoutSize="wide" footerShown={false}>
      <View className="-mx-5 pb-8">
        <View className="relative bg-neutral-900">
          <View style={{ height: 280 }}>
            <Image source={heroImages[heroIndex]} contentFit="cover" className="h-full w-full" />
          </View>

          <View className="absolute inset-0 bg-black/40 px-5 pb-5 pt-3">
            <View className="mb-10 flex-row items-center justify-between">
              <Pressable onPress={() => router.back()} className="flex-row items-center">
                <Ionicons name="chevron-back" size={20} color="#fff" />
                <Text className="ml-1 text-base text-white">Back</Text>
              </Pressable>
              <View className="flex-row items-center gap-4">
                <Ionicons name="bookmark-outline" size={22} color="#fff" />
                <Ionicons name="share-outline" size={22} color="#fff" />
                <View ref={ellipsisRef}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="More options"
                    hitSlop={8}
                    onPress={openOptions}
                  >
                    <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </View>

            <Text className="text-4xl font-bold text-white">{business.name}</Text>
            <View className="mt-2 flex-row items-center">
              <StarRating rating={business.rating} accentColor={primaryColor} />
              <Text className="ml-2 text-sm text-neutral-200">{business.reviews} reviews</Text>
            </View>
            <Text className="mt-3 text-sm text-neutral-200">{business.heroSubtitle}</Text>
          </View>

          <View className="absolute bottom-4 right-5 flex-row items-center gap-1">
            {heroImages.map((_, index) => (
              <View
                key={`hero-dot-${index}`}
                className={`h-2 w-2 rounded-full ${heroIndex === index ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </View>
        </View>

        <View className="border-b border-neutral-200 bg-white px-5 py-3">
          <View className="flex-row gap-2">
            {[
              { id: 'review', label: 'Add review', icon: 'star-outline' as const, active: true },
              { id: 'map', label: 'Map', icon: 'location-outline' as const },
              { id: 'save', label: 'Save', icon: 'bookmark-outline' as const },
              { id: 'share', label: 'Share', icon: 'share-outline' as const },
            ].map((action) => (
              <Pressable
                key={action.id}
                className={`flex-1 flex-row items-center justify-center rounded-lg border py-2 ${
                  action.active ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'
                }`}
              >
                <Ionicons name={action.icon} size={16} color={action.active ? '#fff' : '#18181b'} />
                <Text
                  className={`ml-1 text-sm ${action.active ? 'text-white' : 'text-neutral-900'}`}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="border-b border-neutral-200 bg-white px-5 py-3">
          <Text className="mb-2 text-base font-semibold text-neutral-900">
            Recommend this place?
          </Text>
          <View className="flex-row gap-2">
            {RECOMMEND_OPTIONS.map((item) => (
              <Pressable
                key={item}
                className="rounded-lg border border-neutral-300 px-6 py-2"
                style={
                  recommendation === item
                    ? { borderColor: '#18181b', backgroundColor: '#18181b' }
                    : undefined
                }
                onPress={() => setRecommendation(item)}
              >
                <Text className={recommendation === item ? 'text-white' : 'text-neutral-800'}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="flex-row border-b border-neutral-200 bg-white">
          <Pressable className="relative flex-1 items-center py-3" onPress={() => setTab('info')}>
            <Text
              className={tab === 'info' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}
            >
              Info
            </Text>
            {tab === 'info' ? (
              <View className="absolute bottom-0 h-1 w-full bg-primary-600" />
            ) : null}
          </Pressable>
          <Pressable
            className="relative flex-1 items-center py-3"
            onPress={() => setTab('reviews')}
          >
            <Text
              className={tab === 'reviews' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}
            >
              Reviews
            </Text>
            {tab === 'reviews' ? (
              <View className="absolute bottom-0 h-1 w-full bg-primary-600" />
            ) : null}
          </Pressable>
        </View>

        {tab === 'info' ? (
          <View className="bg-neutral-50 px-5 py-4">
            <MapPreview query={business.address} />

            <View className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-4">
              <Text className="text-lg font-semibold text-neutral-900">{business.address}</Text>
              <View className="mt-4 flex-row items-center justify-between border-t border-neutral-200 pt-3">
                <Text className="text-base font-semibold text-neutral-900">Get directions</Text>
                <Ionicons name="navigate-circle-outline" size={22} color="#3f3f46" />
              </View>
            </View>

            <View className="mt-4 rounded-xl bg-white px-4 py-4">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-neutral-900">Update the community</Text>
                <Ionicons name="information-circle-outline" size={22} color="#52525b" />
              </View>
              <Text className="mb-3 text-base text-neutral-800">What&apos;s the price range?</Text>
              <View className="flex-row flex-wrap gap-2">
                {PRICE_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    className="rounded-lg border border-neutral-300 px-4 py-2"
                    style={
                      priceRange === option
                        ? { borderColor: '#18181b', backgroundColor: '#18181b' }
                        : undefined
                    }
                    onPress={() => setPriceRange(option)}
                  >
                    <Text className={priceRange === option ? 'text-white' : 'text-neutral-900'}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="mt-4 rounded-xl bg-white px-4 py-4">
              <Text className="text-2xl font-bold text-neutral-900">You might also consider</Text>
              <Text className="mt-1 text-sm text-neutral-500">Sponsored</Text>
              {SUGGESTED.map((item) => (
                <View
                  key={item.id}
                  className="mt-4 border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <Text className="text-lg font-semibold text-neutral-900">{item.name}</Text>
                  <View className="mt-1 flex-row items-center">
                    <StarRating rating={item.rating} accentColor={primaryColor} />
                    <Text className="ml-2 text-sm text-neutral-600">({item.reviews} reviews)</Text>
                  </View>
                  <Text className="mt-2 text-sm text-neutral-600">{item.note}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <ReviewSection
            businessName={business.name}
            businessAddress={business.address}
            accentColor={primaryColor}
            reviews={business.recentReviews ?? []}
            reviewOpen={reviewOpen}
            reviewRating={reviewRating}
            reviewText={reviewText}
            onReviewOpenChange={(open) => {
              setReviewOpen(open);
              if (open) {
                setReviewRating(0);
                setReviewText('');
              }
            }}
            onReviewRatingChange={setReviewRating}
            onReviewTextChange={setReviewText}
            onSubmit={() => setReviewOpen(false)}
          />
        )}
      </View>

      <Modal
        visible={optionsOpen}
        transparent
        animationType={isWeb ? 'fade' : 'slide'}
        onRequestClose={() => setOptionsOpen(false)}
        statusBarTranslucent
      >
        <View className="flex-1">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss options"
            className="absolute inset-0"
            style={{ backgroundColor: isWeb ? 'transparent' : 'rgba(0,0,0,0.45)' }}
            onPress={() => setOptionsOpen(false)}
          />

          {isWeb ? (
            <View className="flex-1" pointerEvents="box-none">
              <View
                className="absolute w-[260px] overflow-hidden rounded-xl border border-neutral-200 bg-white py-1"
                style={{
                  top: popoverAnchor.y + popoverAnchor.height + 8,
                  left: Math.max(12, popoverAnchor.x + popoverAnchor.width - 260),
                  boxShadow: '0 20px 35px -8px rgba(0,0,0,0.25)',
                }}
              >
                {ACTIONS.map((action) => (
                  <Pressable
                    key={action.id}
                    onPress={action.onPress}
                    className="flex-row items-center justify-between border-b border-neutral-100 px-4 py-3 last:border-b-0"
                  >
                    <View className="flex-row items-center">
                      <Ionicons
                        name={action.icon}
                        size={18}
                        color={action.tone === 'accent' ? primaryColor : '#27272a'}
                      />
                      <Text className="ml-3 text-sm text-neutral-900">{action.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color="#71717a" />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View
              className="absolute bottom-0 left-0 right-0"
              style={{ paddingBottom: insets.bottom + 12 }}
            >
              <View className="rounded-t-3xl bg-neutral-100 px-5 pt-3 pb-2">
                {ACTIONS.map((action, index) => (
                  <Pressable
                    key={action.id}
                    onPress={action.onPress}
                    className={`flex-row items-center justify-center py-4 ${
                      index < ACTIONS.length - 1 ? 'border-b border-neutral-200' : ''
                    }`}
                  >
                    <Ionicons
                      name={action.icon}
                      size={18}
                      color={action.tone === 'accent' ? primaryColor : '#71717a'}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      className={`text-base font-semibold ${action.tone === 'accent' ? 'text-neutral-900' : 'text-neutral-800'}`}
                    >
                      {action.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View className="bg-white px-5 pb-4 pt-3 border-t border-neutral-200">
                <Pressable
                  onPress={() => setOptionsOpen(false)}
                  className="w-full items-center bg-white py-3"
                >
                  <Text className="text-base font-semibold text-neutral-800">Cancel</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </MainLayout>
  );
}
