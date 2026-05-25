import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { ReviewSection } from '@/src/components/business/review-section';
import { MainLayout } from '@/src/components/layouts/main';
import { MediaAccessPromptModal } from '@/src/components/ui/media-access-prompt';
import { Text } from '@/src/components/ui/text';
import { useBusiness } from '@/src/hooks/use-business';
import { useBusinessMedia } from '@/src/hooks/use-business-media';
import type { Business } from '@/src/types/business';
import { resolveBusinessMediaUrl } from '@/src/utils/business-media-url';
import { useAddBusinessPhotos } from '@/src/hooks/use-business-media-upload';

const WebIFrame = 'iframe' as unknown as ComponentType<Record<string, unknown>>;

const HERO_HEIGHT = 300;

type DetailTab = 'info' | 'reviews';
type PriceOption = 'Low' | 'Moderate' | 'Pricey' | 'High-end';

const PRICE_OPTIONS: PriceOption[] = ['Low', 'Moderate', 'Pricey', 'High-end'];
const RECOMMEND_OPTIONS = ['Yes', 'No', 'Maybe'] as const;
const SUGGESTED = [
  { id: '1', name: "D'arcy's Pint", rating: 4.1, reviews: 745, note: 'Busy with lots of locals.' },
  { id: '2', name: "Chili's", rating: 3.0, reviews: 71, note: 'Popular casual dining nearby.' },
];

type BusinessDetailView = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  address: string;
  heroSubtitle: string;
  categoryLabel?: string;
  phone?: string;
  website?: string;
  photos?: string[];
  recentReviews: {
    id: string;
    businessId: string;
    userId: string;
    rating: number;
    review: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

function toBusinessDetailView(business: Business): BusinessDetailView {
  const locationLine = [business.city, business.state, business.country].filter(Boolean).join(', ');
  const categoryLabel = business.businessCategories?.[0]?.category?.name ?? undefined;

  return {
    id: business.id,
    name: business.name,
    rating: business.averageRating ?? 0,
    reviews: business.reviewCount ?? 0,
    address: business.address ?? '',
    heroSubtitle: business.description?.trim() || locationLine,
    categoryLabel,
    phone: business.phoneNo?.trim() || undefined,
    website: business.website?.trim() || undefined,
    recentReviews: [],
  };
}

function StarRating({
  rating,
  accentColor,
  variant = 'default',
}: {
  rating: number;
  accentColor: string;
  variant?: 'default' | 'hero';
}) {
  const full = Math.floor(rating);
  const emptyColor = variant === 'hero' ? 'rgba(255,255,255,0.45)' : '#d4d4d8';
  const filledColor = variant === 'hero' ? '#fff' : accentColor;

  return (
    <View className="flex-row items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < full ? 'star' : 'star-outline'}
          size={variant === 'hero' ? 15 : 14}
          color={i < full ? filledColor : emptyColor}
          style={{ marginRight: 2 }}
        />
      ))}
      {variant === 'default' ? (
        <Text className="ml-1 text-xs text-neutral-700">{rating.toFixed(1)}</Text>
      ) : null}
    </View>
  );
}

function HeroIconButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={10}
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-full bg-black/25"
    >
      <Ionicons name={icon} size={20} color="#fff" />
    </Pressable>
  );
}

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`overflow-hidden rounded-2xl border border-neutral-200 bg-white ${className}`}>
      {children}
    </View>
  );
}

function MapPreview({ query }: { query: string }) {
  const q = encodeURIComponent(query);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (Platform.OS === 'web') {
    return (
      <View className="h-[200px] overflow-hidden bg-neutral-100">
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
    <View className="h-[200px] items-center justify-center bg-neutral-100">
      <Ionicons name="map-outline" size={32} color="#71717a" />
      <Text className="mt-2 text-sm text-neutral-500">Map preview</Text>
    </View>
  );
}

export default function BusinessDetailsScreen() {
  const router = useRouter();
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web' || typeof document !== 'undefined';
  const primary = useCSSVariable('--color-primary-600');
  const primaryColor = typeof primary === 'string' ? primary : '#c62828';

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

  const { data, isLoading, isError } = useBusiness(id);
  const { data: businessMediaData } = useBusinessMedia(id);
  const addBusinessPhotos = useAddBusinessPhotos(id);
  const business = data ? toBusinessDetailView(data) : null;

  const heroImages = useMemo(() => {
    const mediaUrls =
      businessMediaData?.media
        .map((item) => resolveBusinessMediaUrl(item.storageKey))
        .filter(Boolean) ?? [];

    if (mediaUrls.length > 0) {
      return mediaUrls.map((uri) => ({ uri }));
    }

    return [require('@/assets/illustrations/no-recommendation.png')];
  }, [businessMediaData?.media]);

  const handleAddPhotosPress = useCallback(async () => {
    const { uploadedCount } = await addBusinessPhotos.pickAndUpload();
    if (uploadedCount > 0) {
      setHeroIndex(0);
    }
  }, [addBusinessPhotos]);

  const openReviewComposer = () => {
    setTab('reviews');
    setReviewOpen(true);
    setReviewRating(0);
    setReviewText('');
  };

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
      onPress: () => {
        setOptionsOpen(false);
        openReviewComposer();
      },
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

  const quickActions = [
    { id: 'review', label: 'Review', icon: 'star-outline' as const, onPress: openReviewComposer },
    { id: 'map', label: 'Map', icon: 'location-outline' as const, onPress: () => setTab('info') },
    { id: 'save', label: 'Save', icon: 'bookmark-outline' as const, onPress: () => {} },
    { id: 'share', label: 'Share', icon: 'share-outline' as const, onPress: () => {} },
  ];

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

  const contentBottomPadding = Math.max(insets.bottom, 16) + 8;

  if (isLoading) {
    return (
      <MainLayout contentLayoutSize="full" footerShown={false}>
        <View className="flex-1 items-center justify-center py-24">
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      </MainLayout>
    );
  }

  if (isError || !business) {
    return (
      <MainLayout contentLayoutSize="full" footerShown={false}>
        <View
          className="flex-1 justify-center px-6"
          style={{ paddingTop: insets.top, paddingBottom: contentBottomPadding }}
        >
          <View className="items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <Ionicons name="storefront-outline" size={28} color="#71717a" />
            </View>
            <Text className="text-center text-xl font-bold text-neutral-900">Business not found</Text>
            <Text className="mt-2 text-center text-base text-neutral-500">
              This business may have been removed or the link is invalid.
            </Text>
            <Pressable
              className="mt-6 rounded-xl bg-primary-600 px-6 py-3"
              onPress={() => router.back()}
            >
              <Text className="text-base font-semibold text-white">Go back</Text>
            </Pressable>
          </View>
        </View>
      </MainLayout>
    );
  }

  const hasRating = business.rating > 0;
  const mapQuery = business.address || business.heroSubtitle;

  return (
    <MainLayout contentLayoutSize="full" footerShown={false}>
      <View style={{ paddingBottom: contentBottomPadding }}>
        {/* Hero */}
        <View className="relative overflow-hidden bg-neutral-900">
          <View style={{ height: HERO_HEIGHT }}>
            <Image source={heroImages[heroIndex]} contentFit="cover" className="h-full w-full" />
          </View>

          <LinearGradient
            colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.8)']}
            locations={[0, 0.45, 1]}
            pointerEvents="none"
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          />

          <View
            className="absolute inset-0 justify-between px-4"
            style={{ paddingTop: insets.top + 8, paddingBottom: 20 }}
          >
            <View className="flex-row items-center justify-between">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={8}
                onPress={() => router.back()}
                className="flex-row items-center rounded-full bg-black/25 py-2 pl-2 pr-3"
              >
                <Ionicons name="chevron-back" size={22} color="#fff" />
                <Text className="ml-0.5 text-base font-medium text-white">Back</Text>
              </Pressable>

              <View className="flex-row items-center gap-2">
                <HeroIconButton icon="bookmark-outline" label="Save business" />
                <HeroIconButton icon="share-outline" label="Share business" />
                <View ref={ellipsisRef}>
                  <HeroIconButton icon="ellipsis-horizontal" label="More options" onPress={openOptions} />
                </View>
              </View>
            </View>

            <View>
              {business.categoryLabel ? (
                <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/75">
                  {business.categoryLabel}
                </Text>
              ) : null}
              <Text className="text-3xl font-bold leading-tight text-white">{business.name}</Text>
              <View className="mt-2.5 flex-row flex-wrap items-center gap-x-2 gap-y-1">
                {hasRating ? (
                  <>
                    <StarRating rating={business.rating} accentColor={primaryColor} variant="hero" />
                    <Text className="text-sm font-semibold text-white">{business.rating.toFixed(1)}</Text>
                    <Text className="text-sm text-white/80">
                      ({business.reviews} {business.reviews === 1 ? 'review' : 'reviews'})
                    </Text>
                  </>
                ) : (
                  <Text className="text-sm text-white/80">No reviews yet</Text>
                )}
              </View>
              {business.heroSubtitle ? (
                <Text className="mt-2 text-sm leading-5 text-white/85" numberOfLines={2}>
                  {business.heroSubtitle}
                </Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add photos or videos"
                disabled={addBusinessPhotos.isUploadingMedia}
                onPress={() => {
                  void handleAddPhotosPress();
                }}
                className="mt-4 w-full flex-row items-center justify-center rounded-xl border border-white/50 bg-white/10 py-3"
              >
                {addBusinessPhotos.isUploadingMedia ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="camera-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text className="text-sm font-semibold text-white">Add photos or videos</Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>

          {heroImages.length > 1 ? (
            <View
              pointerEvents="none"
              className="absolute bottom-3 left-0 right-0 flex-row items-center justify-center gap-1.5"
            >
              {heroImages.map((_, index) => (
                <View
                  key={`hero-dot-${index}`}
                  className={`rounded-full ${heroIndex === index ? 'h-2 w-5 bg-white' : 'h-2 w-2 bg-white/45'}`}
                />
              ))}
            </View>
          ) : null}
        </View>

        {/* Quick actions */}
        <View className="border-b border-neutral-200 bg-white px-4 py-3">
          <View className="flex-row gap-2">
            {quickActions.map((action, index) => {
              const isPrimary = index === 0;
              return (
                <Pressable
                  key={action.id}
                  accessibilityRole="button"
                  onPress={action.onPress}
                  className={`min-h-[44px] flex-1 flex-row items-center justify-center rounded-xl border px-1 py-2.5 ${
                    isPrimary
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <Ionicons
                    name={action.icon}
                    size={17}
                    color={isPrimary ? '#fff' : '#3f3f46'}
                  />
                  <Text
                    className={`ml-1.5 text-sm font-semibold ${
                      isPrimary ? 'text-white' : 'text-neutral-800'
                    }`}
                    numberOfLines={1}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Recommend */}
        <View className="border-b border-neutral-200 bg-white px-4 py-4">
          <Text className="mb-3 text-base font-semibold text-neutral-900">Recommend this place?</Text>
          <View className="flex-row gap-2">
            {RECOMMEND_OPTIONS.map((item) => {
              const selected = recommendation === item;
              return (
                <Pressable
                  key={item}
                  className={`flex-1 items-center rounded-xl border py-2.5 ${
                    selected
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                  onPress={() => setRecommendation(item)}
                >
                  <Text
                    className={`text-sm font-semibold ${selected ? 'text-white' : 'text-neutral-800'}`}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-neutral-200 bg-white">
          {(
            [
              { id: 'info' as const, label: 'Info' },
              { id: 'reviews' as const, label: 'Reviews' },
            ] as const
          ).map((item) => {
            const active = tab === item.id;
            return (
              <Pressable
                key={item.id}
                className="relative flex-1 items-center py-3.5"
                onPress={() => setTab(item.id)}
              >
                <Text
                  className={`text-base ${active ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}
                >
                  {item.label}
                </Text>
                {active ? (
                  <View className="absolute bottom-0 h-0.5 w-14 rounded-full bg-primary-600" />
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {tab === 'info' ? (
          <View className="bg-neutral-50 px-4 py-4">
            {mapQuery ? (
              <SectionCard className="mb-4">
                <MapPreview query={mapQuery} />
              </SectionCard>
            ) : null}

            {business.address ? (
              <SectionCard className="mb-4">
                <View className="px-4 py-4">
                  <View className="flex-row items-start gap-3">
                    <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                      <Ionicons name="location-outline" size={18} color={primaryColor} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold leading-6 text-neutral-900">
                        {business.address}
                      </Text>
                    </View>
                  </View>
                  <Pressable className="mt-4 flex-row items-center justify-between border-t border-neutral-100 pt-3">
                    <Text className="text-sm font-semibold text-primary-700">Get directions</Text>
                    <Ionicons name="navigate-circle-outline" size={22} color={primaryColor} />
                  </Pressable>
                </View>
              </SectionCard>
            ) : null}

            {business.phone || business.website ? (
              <SectionCard className="mb-4 overflow-hidden">
                {business.phone ? (
                  <View
                    className={`flex-row items-center gap-3 px-4 py-3.5 ${
                      business.website ? 'border-b border-neutral-100' : ''
                    }`}
                  >
                    <Ionicons name="call-outline" size={20} color="#52525b" />
                    <Text className="flex-1 text-base text-neutral-800">{business.phone}</Text>
                  </View>
                ) : null}
                {business.website ? (
                  <View className="flex-row items-center gap-3 px-4 py-3.5">
                    <Ionicons name="globe-outline" size={20} color="#52525b" />
                    <Text className="flex-1 text-base text-primary-700" numberOfLines={1}>
                      {business.website}
                    </Text>
                  </View>
                ) : null}
              </SectionCard>
            ) : null}

            <SectionCard className="mb-4 px-4 py-4">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-bold text-neutral-900">Update the community</Text>
                <Ionicons name="information-circle-outline" size={20} color="#a1a1aa" />
              </View>
              <Text className="mb-3 text-sm text-neutral-600">What&apos;s the price range?</Text>
              <View className="flex-row flex-wrap gap-2">
                {PRICE_OPTIONS.map((option) => {
                  const selected = priceRange === option;
                  return (
                    <Pressable
                      key={option}
                      className={`rounded-lg border px-3.5 py-2 ${
                        selected
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-neutral-200 bg-neutral-50'
                      }`}
                      onPress={() => setPriceRange(option)}
                    >
                      <Text
                        className={`text-sm font-medium ${selected ? 'text-white' : 'text-neutral-800'}`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </SectionCard>

            <SectionCard className="px-4 py-4">
              <Text className="text-lg font-bold text-neutral-900">You might also consider</Text>
              <Text className="mt-0.5 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Sponsored
              </Text>
              {SUGGESTED.map((item, index) => (
                <View
                  key={item.id}
                  className={`mt-4 ${index < SUGGESTED.length - 1 ? 'border-b border-neutral-100 pb-4' : ''}`}
                >
                  <Text className="text-base font-semibold text-neutral-900">{item.name}</Text>
                  <View className="mt-1 flex-row items-center">
                    <StarRating rating={item.rating} accentColor={primaryColor} />
                    <Text className="ml-2 text-sm text-neutral-500">
                      {item.reviews} reviews
                    </Text>
                  </View>
                  <Text className="mt-1.5 text-sm leading-5 text-neutral-600">{item.note}</Text>
                </View>
              ))}
            </SectionCard>
          </View>
        ) : (
          <ReviewSection
            businessName={business.name}
            businessAddress={business.address || business.heroSubtitle}
            accentColor={primaryColor}
            reviews={business.recentReviews}
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
                } as ViewStyle}
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

              <View className="border-t border-neutral-200 bg-white px-5 pb-4 pt-3">
                <Pressable
                  onPress={() => setOptionsOpen(false)}
                  className="w-full items-center py-3"
                >
                  <Text className="text-base font-semibold text-neutral-800">Cancel</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>

      <MediaAccessPromptModal
        visible={addBusinessPhotos.visible}
        onCancel={addBusinessPhotos.close}
        onEnableAccess={() => {
          void addBusinessPhotos.enableAccessAndUpload().then(({ uploadedCount }) => {
            if (uploadedCount > 0) {
              setHeroIndex(0);
            }
          });
        }}
        onTakePhotoOrVideo={() => void addBusinessPhotos.handleTakePhotoOrVideo()}
        isEnablingLibrary={addBusinessPhotos.isEnablingLibrary}
        isRequestingCamera={addBusinessPhotos.isRequestingCamera}
      />
    </MainLayout>
  );
}
