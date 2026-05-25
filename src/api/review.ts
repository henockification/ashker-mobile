import { CreateReviewPayload, Review, ReviewDetailResponse, ReviewsListResponse, ReviewsListResult } from "../types/review";
import { ApiSuccessResponse, defaultPagination, unwrapData } from "../utils/helpers";
import { apiClient } from "./client";

function unwrapReviewDetail(data: ReviewDetailResponse | Review): Review {
    if (data && typeof data === 'object' && 'data' in data && !Array.isArray(data.data)) {
      return data.data;
    }
  
    return unwrapData(data);
  }

export const createReview = async (payload: CreateReviewPayload): Promise<Review> => {
    const { data } = await apiClient.post<ReviewDetailResponse | Review>('reviews', payload);
    return unwrapReviewDetail(data);
};

export const getReviews = async (): Promise<ReviewsListResult> => {
    const { data } = await apiClient.get<ReviewsListResponse | ApiSuccessResponse<Review[]> | Review[]>(
      'reviews',
    );
  
    if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
      const response = data as ReviewsListResponse;
      return {
        reviews: Array.isArray(response.data) ? response.data : [],
        pagination: response.pagination ?? defaultPagination(),
      };
    }
  
    const list = unwrapData(data as ApiSuccessResponse<Review[]> | Review[]);
    const reviews = Array.isArray(list) ? list : [];
  
    return {
      reviews,
      pagination: {
        ...defaultPagination(),
        total: reviews.length,
      },
    };
  };