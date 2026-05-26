import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { createBusiness, getBusinessById, getBusinesses } from '@/src/api/business';
import type { Business, BusinessesListResult, CreateBusinessPayload } from '@/src/types/business';

export const businessKeys = {
  all: ['businesses'] as const,
  lists: () => [...businessKeys.all, 'list'] as const,
  details: () => [...businessKeys.all, 'detail'] as const,
  detail: (id: string) => [...businessKeys.details(), id] as const,
};

export function useBusinesses() {
  return useQuery<BusinessesListResult, AxiosError>({
    queryKey: businessKeys.lists(),
    queryFn: getBusinesses,
  });
}

export function useBusiness(id: string | undefined) {
  return useQuery<Business, AxiosError>({
    queryKey: businessKeys.detail(id ?? ''),
    queryFn: () => getBusinessById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateBusiness() {
  const queryClient = useQueryClient();

  return useMutation<Business, AxiosError, CreateBusinessPayload>({
    mutationFn: createBusiness,
    onSuccess: (business) => {
      queryClient.invalidateQueries({ queryKey: businessKeys.all });
      queryClient.setQueryData(businessKeys.detail(business.id), business);
    },
  });
}
