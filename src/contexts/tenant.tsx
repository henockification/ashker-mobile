import type { AxiosError } from 'axios';
import { createContext, type PropsWithChildren, use, useMemo } from 'react';

import { getUpcomingEvents } from '@/src/components/tenant/helpers/tenant-events.helpers';
import { useTenantEvents } from '@/src/hooks/use-tenant-events';
import type { Tenant, TenantEvent } from '@/src/types/tenant-events';
import type { PaginationMeta } from '@/src/utils/helpers';
import { resolveTenantThemeColor } from '@/src/utils/theme-palette';

type TenantContextValue = {
  tenant: Tenant | null;
  events: TenantEvent[];
  upcomingEvents: TenantEvent[];
  pagination: PaginationMeta | null;
  themeColor: string | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  refetch: () => void;
};

const TenantContext = createContext<TenantContextValue | null>(null);

export function useTenant() {
  const value = use(TenantContext);

  if (!value) {
    throw new Error('useTenant must be used within TenantProvider');
  }

  return value;
}

export function TenantProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError, error, refetch } = useTenantEvents();

  const value = useMemo<TenantContextValue>(() => {
    const events = data?.events ?? [];
    const tenant = data?.tenant ?? null;

    return {
      tenant,
      events,
      upcomingEvents: getUpcomingEvents(events),
      pagination: data?.pagination ?? null,
      themeColor: resolveTenantThemeColor(tenant?.themeColor),
      isLoading,
      isError,
      error: error ?? null,
      refetch: () => {
        void refetch();
      },
    };
  }, [data, error, isError, isLoading, refetch]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}
