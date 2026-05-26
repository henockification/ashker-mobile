import { getTenantOrigin } from '@/src/constants/tenant';
import type { TenantEventsResponse, TenantEventsResult } from '@/src/types/tenant-events';

import { apiClient } from './client';

export const getTenantEvents = async (): Promise<TenantEventsResult> => {
  if (!getTenantOrigin()) {
    throw new Error('EXPO_PUBLIC_TENANT_ORIGIN is not configured');
  }

  const { data } = await apiClient.get<TenantEventsResponse>('api/tenant-events');

  if (!data?.tenant) {
    throw new Error('Tenant events response is missing tenant data');
  }

  return {
    tenant: data.tenant,
    events: data.events ?? [],
    pagination: data.pagination ?? { total: 0, page: 1, pageSize: 0 },
  };
};
