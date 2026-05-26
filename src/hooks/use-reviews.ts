import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { createReview, getReviews } from '../api/review';
import { CreateReviewPayload, Review, ReviewsListResult } from '../types/review';

export const reviewKeys = {
  all: ['reviews'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  details: () => [...reviewKeys.all, 'detail'] as const,
  detail: (id: string) => [...reviewKeys.details(), id] as const,
};

export function useReviews() {
  return useQuery<ReviewsListResult, AxiosError>({
    queryKey: reviewKeys.lists(),
    queryFn: getReviews,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation<Review, AxiosError, CreateReviewPayload>({
    mutationFn: createReview,
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
      queryClient.setQueryData(reviewKeys.detail(review.id), review);
    },
  });
}
