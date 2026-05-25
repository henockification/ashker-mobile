import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { getMediaCategories } from '@/src/api/media-category';
import type { MediaCategoriesListResult } from '@/src/types/media-category';

export const mediaCategoryKeys = {
  all: ['media-categories'] as const,
  list: () => [...mediaCategoryKeys.all, 'list'] as const,
};

export function useMediaCategories() {
  return useQuery<MediaCategoriesListResult, AxiosError>({
    queryKey: mediaCategoryKeys.list(),
    queryFn: getMediaCategories,
    staleTime: 5 * 60 * 1000,
  });
}
