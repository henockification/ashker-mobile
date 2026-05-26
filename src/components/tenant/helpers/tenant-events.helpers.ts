import { format, parseISO } from 'date-fns';

import type { TenantEvent } from '@/src/types/tenant-events';

export type EventTimeFilter = 'upcoming' | 'past' | 'all';

export type EventFilterOptions = {
  timeFilter: EventTimeFilter;
  typeFilter?: string;
  now?: Date;
};

const getStartMs = (event: TenantEvent) => parseISO(event.eventStartDate).getTime();
const getEndMs = (event: TenantEvent) => parseISO(event.eventEndDate).getTime();

/** Event has not ended yet (includes in-progress and future). */
export const isEventActive = (event: TenantEvent, now: Date = new Date()): boolean =>
  getEndMs(event) >= now.getTime();

/** Event starts in the future. */
export const isEventUpcoming = (event: TenantEvent, now: Date = new Date()): boolean =>
  getStartMs(event) >= now.getTime();

export const isEventPast = (event: TenantEvent, now: Date = new Date()): boolean =>
  getEndMs(event) < now.getTime();

export const getPublishedEvents = (events: TenantEvent[]): TenantEvent[] =>
  events.filter((event) => event.isPublished);

export const getUpcomingEvents = (
  events: TenantEvent[],
  now: Date = new Date(),
): TenantEvent[] => filterTenantEvents(events, { timeFilter: 'upcoming', now });

export const getEventTypeOptions = (events: TenantEvent[]): string[] => {
  const types = new Set(
    events
      .map((event) => event.eventType?.trim())
      .filter((type): type is string => Boolean(type)),
  );

  return [...types].sort((a, b) => a.localeCompare(b));
};

export const filterTenantEvents = (
  events: TenantEvent[],
  { timeFilter, typeFilter = 'all', now = new Date() }: EventFilterOptions,
): TenantEvent[] => {
  let filtered = [...events];

  switch (timeFilter) {
    case 'upcoming':
      filtered = filtered.filter((event) => isEventActive(event, now));
      filtered.sort((a, b) => getStartMs(a) - getStartMs(b));
      break;
    case 'past':
      filtered = filtered.filter((event) => isEventPast(event, now));
      filtered.sort((a, b) => getEndMs(b) - getEndMs(a));
      break;
    case 'all':
      filtered.sort((a, b) => getStartMs(a) - getStartMs(b));
      break;
  }

  if (typeFilter !== 'all') {
    filtered = filtered.filter((event) => event.eventType === typeFilter);
  }

  return filtered;
};

export const formatEventTypeLabel = (eventType: string): string =>
  eventType
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const formatEventDateRange = (event: TenantEvent): string => {
  const start = parseISO(event.eventStartDate);
  const end = parseISO(event.eventEndDate);
  const sameDay = format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd');

  if (sameDay) {
    return format(start, 'MMM d, yyyy');
  }

  return `${format(start, 'MMM d, yyyy')} – ${format(end, 'MMM d, yyyy')}`;
};

export const formatEventSchedule = (event: TenantEvent): string => {
  const start = parseISO(event.eventStartDate);
  const datePart = format(start, 'EEE, MMM d, yyyy');

  if (event.eventStartTime) {
    return `${datePart} · ${event.eventStartTime}`;
  }

  return datePart;
};

export const formatEventDateBadge = (event: TenantEvent): { month: string; day: string } => {
  const start = parseISO(event.eventStartDate);
  return {
    month: format(start, 'MMM').toUpperCase(),
    day: format(start, 'd'),
  };
};

export const getEventImageUri = (event: TenantEvent): string | null => {
  return event.coverPhoto ?? event.logo ?? null;
};

export const getEventStatusLabel = (event: TenantEvent): string | null => {
  if (!event.isPublished) {
    return 'Draft';
  }

  if (event.eventStatus && event.eventStatus !== 'published') {
    return formatEventTypeLabel(event.eventStatus);
  }

  return null;
};

export const getTimeFilterLabel = (filter: EventTimeFilter): string => {
  switch (filter) {
    case 'upcoming':
      return 'Upcoming';
    case 'past':
      return 'Past';
    case 'all':
      return 'All';
  }
};

export const getEmptyEventsMessage = (
  timeFilter: EventTimeFilter,
  typeFilter: string,
): string => {
  if (typeFilter !== 'all') {
    return 'No events match this type for the selected filter.';
  }

  switch (timeFilter) {
    case 'upcoming':
      return 'No upcoming or in-progress events right now.';
    case 'past':
      return 'No past events to show yet.';
    case 'all':
      return 'No events yet.';
  }
};
