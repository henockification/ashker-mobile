import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';

import { FullScreenModalLayout } from '@/src/components/layouts/full-screen-modal';
import { Text } from '@/src/components/ui/text';

export type BusinessReview = {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  review: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

interface ReviewSectionProps {
  businessName: string;
  businessAddress: string;
  accentColor: string;
  reviews: BusinessReview[];
  reviewOpen: boolean;
  reviewRating: number;
  reviewText: string;
  onReviewOpenChange: (open: boolean) => void;
  onReviewRatingChange: (value: number) => void;
  onReviewTextChange: (value: string) => void;
  onSubmit: () => void;
}

export interface ReviewComposerModalProps extends Omit<
  ReviewSectionProps,
  'reviews' | 'reviewOpen'
> {
  visible: boolean;
}

function StarPicker({
  value,
  onChange,
  accentColor,
}: {
  value: number;
  onChange: (next: number) => void;
  accentColor: string;
}) {
  return (
    <View className="flex-row items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const next = index + 1;
        const active = next <= value;
        return (
          <Pressable key={index} onPress={() => onChange(next)} hitSlop={6}>
            <Ionicons
              name={active ? 'star' : 'star-outline'}
              size={26}
              color={active ? accentColor : '#d4d4d8'}
              style={{ marginRight: 6 }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

function ReviewSectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm">
      <View className="border-b border-primary-100 bg-primary-50 px-4 py-3">
        <Text className="text-sm font-semibold text-primary-800">{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 text-xs leading-5 text-neutral-600">{subtitle}</Text>
        ) : null}
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}

function ReviewComposer({
  businessName,
  businessAddress,
  accentColor,
  reviewRating,
  reviewText,
  onReviewRatingChange,
  onReviewTextChange,
  onSubmit,
}: Omit<ReviewSectionProps, 'reviews' | 'reviewOpen' | 'onReviewOpenChange'>) {
  const suggestionTags = ['Food', 'Service', 'Ambiance'];

  return (
    <View className="pb-8">
      <View className="mb-5 flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-md bg-white/15">
          <Ionicons name="business-outline" size={18} color="#fff" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-lg font-bold text-white">{businessName}</Text>
          <Text className="text-sm text-white/80" numberOfLines={2}>
            {businessAddress}
          </Text>
        </View>
      </View>

      <ReviewSectionCard title="Your rating" subtitle="How was your overall experience?">
        <StarPicker
          value={reviewRating}
          onChange={onReviewRatingChange}
          accentColor={accentColor}
        />
      </ReviewSectionCard>

      <ReviewSectionCard
        title="Your review"
        subtitle="A few things to consider: food, service, ambiance"
      >
        <View className="flex-row flex-wrap gap-2">
          {suggestionTags.map((tag) => (
            <View key={tag} className="rounded bg-neutral-100 px-2.5 py-1">
              <Text className="text-sm text-neutral-600">{tag}</Text>
            </View>
          ))}
        </View>

        <TextInput
          value={reviewText}
          onChangeText={onReviewTextChange}
          placeholder="Write your review"
          placeholderTextColor="#a1a1aa"
          multiline
          numberOfLines={8}
          className="mt-4 min-h-[220px] rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900"
          textAlignVertical="top"
        />

        <Pressable className="mt-4 min-h-14 flex-row items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 bg-neutral-50">
          <Ionicons name="add-outline" size={20} color="#a1a1aa" />
          <Ionicons name="image-outline" size={18} color="#a1a1aa" />
        </Pressable>
      </ReviewSectionCard>

      <Pressable
        className="mt-2 min-h-12 items-center justify-center rounded-xl border border-primary-300 bg-primary-200"
        accessibilityRole="button"
        onPress={onSubmit}
      >
        <Text className="text-lg font-semibold text-primary-800">Post review</Text>
      </Pressable>
    </View>
  );
}

export function ReviewComposerModal({
  visible,
  businessName,
  businessAddress,
  accentColor,
  reviewRating,
  reviewText,
  onReviewOpenChange,
  onReviewRatingChange,
  onReviewTextChange,
  onSubmit,
}: ReviewComposerModalProps) {
  const handleClose = () => onReviewOpenChange(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <FullScreenModalLayout variant="dark" className="bg-primary-800" onClose={handleClose}>
        <ScrollView
          className="flex-1 bg-primary-800"
          contentContainerClassName="grow px-5 pb-10 pt-14 bg-primary-800"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-6 text-xl font-bold text-white">Write a review</Text>
          <ReviewComposer
            businessName={businessName}
            businessAddress={businessAddress}
            accentColor={accentColor}
            reviewRating={reviewRating}
            reviewText={reviewText}
            onReviewRatingChange={onReviewRatingChange}
            onReviewTextChange={onReviewTextChange}
            onSubmit={onSubmit}
          />
        </ScrollView>
      </FullScreenModalLayout>
    </Modal>
  );
}

export function ReviewSection({
  businessName,
  businessAddress,
  accentColor,
  reviews,
  reviewOpen,
  reviewRating,
  reviewText,
  onReviewOpenChange,
  onReviewRatingChange,
  onReviewTextChange,
  onSubmit,
}: ReviewSectionProps) {
  return (
    <View className="bg-neutral-50 px-5 py-4">
      <View className="rounded-xl bg-white px-4 py-4">
        {reviews.length > 0 ? (
          <>
            <Text className="text-2xl font-bold text-neutral-900">Reviews</Text>
            {reviews.map((review) => (
              <View
                key={review.id}
                className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-3"
              >
                <View className="flex-row items-center justify-between">
                  {/* <Text className="text-base font-semibold text-neutral-900">{review.author}</Text> */}
                  <Text className="text-sm text-neutral-500">{review.createdAt}</Text>
                </View>
                <View className="mt-2 flex-row items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Ionicons
                      key={`${review.id}-${index}`}
                      name={index < review.rating ? 'star' : 'star-outline'}
                      size={15}
                      color={index < review.rating ? accentColor : '#d4d4d8'}
                      style={{ marginRight: 2 }}
                    />
                  ))}
                </View>
                <Text className="mt-2 text-base leading-6 text-neutral-700">{review.review}</Text>
              </View>
            ))}

            <Pressable
              className="mt-4 items-center justify-center rounded-xl border border-neutral-200 bg-white py-4"
              onPress={() => onReviewOpenChange(true)}
              accessibilityRole="button"
            >
              <Text className="text-base font-semibold text-neutral-900">Write a review</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text className="text-2xl font-bold text-neutral-900">No reviews yet</Text>
            <Pressable
              className="mt-4 flex-row items-center justify-between rounded-xl border border-neutral-200 px-4 py-4"
              onPress={() => onReviewOpenChange(true)}
              accessibilityRole="button"
            >
              <Text className="text-lg font-semibold text-neutral-900">Be the first to review</Text>
              <Ionicons name="ribbon-outline" size={24} color="#18181b" />
            </Pressable>
          </>
        )}
      </View>

      <ReviewComposerModal
        visible={reviewOpen}
        businessName={businessName}
        businessAddress={businessAddress}
        accentColor={accentColor}
        reviewRating={reviewRating}
        reviewText={reviewText}
        onReviewOpenChange={onReviewOpenChange}
        onReviewRatingChange={onReviewRatingChange}
        onReviewTextChange={onReviewTextChange}
        onSubmit={onSubmit}
      />
    </View>
  );
}
