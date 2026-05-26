import { useMemo } from 'react';

import { findTenantEventById } from '@/src/components/tenant/helpers/tenant-events.helpers';
import { useTenant } from '@/src/contexts/tenant';
import type { TenantEvent } from '@/src/types/tenant-events';

export const tenantEventKeys = {
  detail: (eventId: string) => ['tenant-event', eventId] as const,
  content: (eventId: string) => ['tenant-event-content', eventId] as const,
};

type UseTenantEventResult = {
  event: TenantEvent | null;
  isLoading: boolean;
  isNotFound: boolean;
};

/**
 * Resolves an event by id from the tenant events list cache.
 * Later: add `useQuery` with `tenantEventKeys.detail(eventId)` when GET /events/:id exists.
 */
export function useTenantEvent(eventId: string | undefined): UseTenantEventResult {
  const { events, isLoading } = useTenant();

  const event = useMemo(() => {
    if (!eventId) {
      return null;
    }

    return findTenantEventById(events, eventId) ?? null;
  }, [eventId, events]);

  return {
    event,
    isLoading,
    isNotFound: Boolean(eventId) && !isLoading && !event,
  };
}
