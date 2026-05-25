import type {
  MediaCategoriesListResponse,
  MediaCategoriesListResult,
  MediaCategory,
} from '@/src/types/media-category';
import {
  type ApiSuccessResponse,
  defaultPagination,
  unwrapData,
} from '@/src/utils/helpers';

import { apiClient } from './client';

function unwrapMediaCategoriesList(
  data: MediaCategoriesListResponse | ApiSuccessResponse<MediaCategory[]> | MediaCategory[],
): MediaCategoriesListResult {
  if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
    const response = data as MediaCategoriesListResponse;
    return {
      categories: Array.isArray(response.data) ? response.data : [],
      pagination: response.pagination ?? defaultPagination(),
    };
  }

  const list = unwrapData(data as ApiSuccessResponse<MediaCategory[]> | MediaCategory[]);
  const categories = Array.isArray(list) ? list : [];

  return {
    categories,
    pagination: {
      ...defaultPagination(),
      total: categories.length,
    },
  };
}

export const getMediaCategories = async (): Promise<MediaCategoriesListResult> => {
  const { data } = await apiClient.get<
    MediaCategoriesListResponse | ApiSuccessResponse<MediaCategory[]> | MediaCategory[]
  >('media-categories', {
    params: { page: 1, pageSize: 50 },
  });

  return unwrapMediaCategoriesList(data);
};
