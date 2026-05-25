import type { ApiSuccessResponse, PaginationMeta } from '@/src/utils/helpers';

import type { Business } from './business';
import type { Category } from './categories';

export type BusinessMedia = {
  id: string;
  mediaCategoryId?: string | null;
  businessId: string;
  storageKey: string;
  caption?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  mediaCategory: Category | null;
  business: Business | null;
};

export type UploadBusinessMediaFile = {
  uri: string;
  name: string;
  type: string;
};

export type UploadBusinessMediaPayload = {
  file: UploadBusinessMediaFile;
  businessId: string;
  mediaCategoryId?: string;
  createdBy?: string;
  caption?: string;
};

export type BusinessMediaListResponse = ApiSuccessResponse<BusinessMedia[]> & {
  pagination: PaginationMeta;
};

export type BusinessMediaListResult = {
  media: BusinessMedia[];
  pagination: PaginationMeta;
};

export type BusinessMediaDetailResponse = ApiSuccessResponse<BusinessMedia>;