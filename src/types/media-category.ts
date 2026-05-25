import type { ApiSuccessResponse, PaginationMeta } from '@/src/utils/helpers';

export type MediaCategory = {
  id: string;
  name: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export type MediaCategoriesListResponse = ApiSuccessResponse<MediaCategory[]> & {
  pagination: PaginationMeta;
};

export type MediaCategoriesListResult = {
  categories: MediaCategory[];
  pagination: PaginationMeta;
};
