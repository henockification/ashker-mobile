import { ApiSuccessResponse, PaginationMeta } from '../utils/helpers';
import type { Category } from './categories';

export type BusinessLocation = {
  type: 'Point';
  coordinates: [number, number];
};

export type BusinessWorkingHours = Record<string, string>;

export type BusinessAttributes = Record<string, boolean | string | number>;

export type BusinessCategory = {
  id: string;
  categoryId: string | null;
  businessId: string | null;
  category: Category | null;
};

export type CreateBusinessPayload = {
  name: string;
  description?: string;
  parent?: string;
  categoryIds: string[];
  phoneNo?: string;
  email?: string;
  website?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  location?: BusinessLocation;
  attributes?: BusinessAttributes;
  isCreatedByCustomer?: boolean;
  remark?: string;
  workingHours?: BusinessWorkingHours;
};

export type Business = {
  id: string;
  name: string;
  code?: string;
  description?: string | null;
  parent?: string | null;
  phoneNo?: string | null;
  email?: string | null;
  website?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  location?: BusinessLocation | null;
  attributes?: BusinessAttributes | null;
  averageRating?: number;
  reviewCount?: number;
  isCreatedByCustomer?: boolean;
  isClaimed?: boolean;
  claimedAt?: string | null;
  isVerified?: boolean;
  verifiedAt?: string | null;
  remark?: string | null;
  workingHours?: BusinessWorkingHours | null;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
  parentBusiness?: Business | null;
  businessCategories?: BusinessCategory[];
};

export type BusinessesListResponse = ApiSuccessResponse<Business[]> & {
  pagination: PaginationMeta;
};

export type BusinessesListResult = {
  businesses: Business[];
  pagination: PaginationMeta;
};

export type BusinessDetailResponse = ApiSuccessResponse<Business>;