import type {
  Business,
  BusinessDetailResponse,
  BusinessesListResponse,
  BusinessesListResult,
  CreateBusinessPayload
} from '@/src/types/business';

import { apiClient } from './client';
import { ApiSuccessResponse, defaultPagination, unwrapData } from '../utils/helpers';

function unwrapBusinessDetail(data: BusinessDetailResponse | Business): Business {
  if (data && typeof data === 'object' && 'data' in data && !Array.isArray(data.data)) {
    return data.data;
  }

  return unwrapData(data);
}

export const createBusiness = async (payload: CreateBusinessPayload): Promise<Business> => {
  const { data } = await apiClient.post<BusinessDetailResponse | Business>('business', payload);
  return unwrapBusinessDetail(data);
};

export const getBusinesses = async (): Promise<BusinessesListResult> => {
  const { data } = await apiClient.get<BusinessesListResponse | ApiSuccessResponse<Business[]> | Business[]>(
    'business',
  );

  if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
    const response = data as BusinessesListResponse;
    return {
      businesses: Array.isArray(response.data) ? response.data : [],
      pagination: response.pagination ?? defaultPagination(),
    };
  }

  const list = unwrapData(data as ApiSuccessResponse<Business[]> | Business[]);
  const businesses = Array.isArray(list) ? list : [];

  return {
    businesses,
    pagination: {
      ...defaultPagination(),
      total: businesses.length,
    },
  };
};

export const getBusinessById = async (id: string): Promise<Business> => {
  const { data } = await apiClient.get<BusinessDetailResponse | Business>(`business/${id}`);
  return unwrapBusinessDetail(data);
};