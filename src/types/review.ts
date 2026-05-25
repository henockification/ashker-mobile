import { ApiSuccessResponse, PaginationMeta } from "../utils/helpers";

export type Review = {
    id: string;
    businessId: string;
    userId: string;
    rating: number;
    review: string;
    title: string;
    businessMediaId?: string;
    parentReviewId?: string;
    helpfulVotes?: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateReviewPayload = {
    businessId: string;
    rating: number;
    review: string;
    title: string;
    userId: string;
    businessMediaId?: string;
    parentReviewId?: string;
};

export type ReviewsListResponse = ApiSuccessResponse<Review[]> & {
    pagination: PaginationMeta;
};

export type ReviewsListResult = {
    reviews: Review[];
    pagination: PaginationMeta;
};  

export type ReviewDetailResponse = ApiSuccessResponse<Review>;