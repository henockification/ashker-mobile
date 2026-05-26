import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { getTenantEvents } from '@/src/api/tenant-events';
import type { TenantEventsResult } from '@/src/types/tenant-events';

export const tenantEventsKeys = {
  all: ['tenant-events'] as const,
};

export function useTenantEvents() {
  return useQuery<TenantEventsResult, AxiosError>({
    queryKey: tenantEventsKeys.all,
    queryFn: getTenantEvents,
    staleTime: Infinity,
    retry: 2,
  });
}
