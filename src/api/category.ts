import type { Category, CategoryFilters } from '../types/categories';
import { apiClient } from './client';

type CategoriesResponse = { success?: boolean; data: Category[] };

export const getCategories = async (filters?: CategoryFilters): Promise<Category[]> => {
  const { data } = await apiClient.get<CategoriesResponse | Category[]>('categories', {
    params: filters,
  });

  if (Array.isArray(data)) {
    return data;
  }

  return data.data ?? [];
};
