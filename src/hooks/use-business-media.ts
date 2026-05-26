import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { getBusinessMedia, uploadBusinessMedia } from '@/src/api/business-media';
import { businessKeys } from '@/src/hooks/use-business';
import type {
  BusinessMedia,
  BusinessMediaListResult,
  UploadBusinessMediaPayload,
} from '@/src/types/business-media';

export const businessMediaKeys = {
  all: ['business-media'] as const,
  byBusiness: (businessId: string) => [...businessMediaKeys.all, 'business', businessId] as const,
};

export function useBusinessMedia(businessId: string | undefined) {
  return useQuery<BusinessMediaListResult, AxiosError>({
    queryKey: businessMediaKeys.byBusiness(businessId ?? ''),
    queryFn: () => getBusinessMedia(businessId!),
    enabled: Boolean(businessId),
  });
}

export function useUploadBusinessMedia() {
  const queryClient = useQueryClient();

  return useMutation<BusinessMedia, AxiosError, UploadBusinessMediaPayload>({
    mutationFn: uploadBusinessMedia,
    onSuccess: (_media, variables) => {
      queryClient.invalidateQueries({
        queryKey: businessMediaKeys.byBusiness(variables.businessId),
      });
      queryClient.invalidateQueries({ queryKey: businessKeys.detail(variables.businessId) });
    },
  });
}
