import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';

import { Text } from '@/src/components/ui/text';

export type BusinessReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
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

function ReviewComposer({
  businessName,
  businessAddress,
  accentColor,
  reviewRating,
  reviewText,
  onReviewOpenChange,
  onReviewRatingChange,
  onReviewTextChange,
  onSubmit,
}: Omit<ReviewSectionProps, 'reviews' | 'reviewOpen'>) {
  const suggestionTags = ['Food', 'Service', 'Ambiance'];

  return (
    <View className="rounded-2xl border border-neutral-200 bg-white">
      <View className="flex-row items-center justify-between border-b border-neutral-200 px-4 py-4">
        <View className="flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-md bg-neutral-100">
            <Ionicons name="business-outline" size={18} color="#a1a1aa" />
          </View>
          <View className="ml-3">
            <Text className="text-lg font-bold text-neutral-900">{businessName}</Text>
            <Text className="text-sm text-neutral-500">{businessAddress}</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close review editor"
          onPress={() => onReviewOpenChange(false)}
        >
          <Ionicons name="close" size={24} color="#3f3f46" />
        </Pressable>
      </View>

      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-neutral-900">How would you rate your experience?</Text>
        <View className="mt-3">
          <StarPicker value={reviewRating} onChange={onReviewRatingChange} accentColor={accentColor} />
        </View>

        <Text className="mt-6 text-2xl font-bold text-neutral-900">Tell us about your experience</Text>
        <Text className="mt-1 text-sm text-neutral-500">A few things to consider in your review</Text>

        <View className="mt-3 flex-row gap-2">
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
          className="mt-5 min-h-[220px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900"
          textAlignVertical="top"
        />

        <Pressable className="mt-5 min-h-14 flex-row items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 bg-neutral-50">
          <Ionicons name="add-outline" size={20} color="#a1a1aa" />
          <Ionicons name="image-outline" size={18} color="#a1a1aa" />
        </Pressable>

        <Pressable
          className="mt-6 min-h-12 items-center justify-center rounded-xl bg-primary-600"
          accessibilityRole="button"
          onPress={onSubmit}
        >
          <Text className="text-lg font-semibold text-white">Post review</Text>
        </Pressable>
      </View>
    </View>
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
                  <Text className="text-base font-semibold text-neutral-900">{review.author}</Text>
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
                <Text className="mt-2 text-base leading-6 text-neutral-700">{review.text}</Text>
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

      <Modal
        visible={reviewOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => onReviewOpenChange(false)}
      >
        <View className="flex-1 bg-neutral-100">
          <ScrollView className="flex-1 px-5 py-5" contentContainerStyle={{ paddingBottom: 24 }}>
            <ReviewComposer
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
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
