import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { getCategories } from '@/src/api/category';
import type { Category, CategoryFilters } from '@/src/types/categories';

type UseCategoriesOptions = Pick<UseQueryOptions<Category[], AxiosError>, 'enabled'>;

export function useCategories(filters?: CategoryFilters, options?: UseCategoriesOptions) {
  const queryKey = ['categories', filters ?? {}] as const;

  return useQuery<Category[], AxiosError>({
    queryKey,
    queryFn: () => getCategories(filters),
    enabled: options?.enabled,
  });
}
