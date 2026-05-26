import type { PaginationMeta } from '@/src/utils/helpers';

export type TenantEventSettings = {
  hasSessions: boolean;
  allowPayment: boolean;
  allowTicketing: boolean;
  allowSponsorship: boolean;
  allowWaitingList: boolean;
  allowRegistration: boolean;
  showNoOfTicketsLeft: boolean;
  allowTicketDownloads: boolean;
  allowPublicRegistration: boolean;
};

export type TenantEvent = {
  id: string;
  tenantId: string;
  eventCode: string;
  eventName: string;
  eventType: string;
  noOfGuests: number;
  dressCode: string | null;
  coverPhoto: string | null;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string | null;
  eventEndTime: string | null;
  eventStatus: string;
  eventLocation: string | null;
  eventDescription: string | null;
  isPublished: boolean;
  registrationFormId: string | null;
  eventSettings: TenantEventSettings;
  paymentSettings: unknown | null;
  logo: string | null;
  loginPhoto: string | null;
  coverText: string | null;
  themeColor: string | null;
  secondaryColor: string | null;
  tertiaryColor: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type Tenant = {
  id: string;
  tenantCode: string;
  companyName: string;
  coverPhotoUrl: string | null;
  profilePhotoUrl: string | null;
  themeColor: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
};

export type TenantEventsResponse = {
  success: boolean;
  events: TenantEvent[];
  tenant: Tenant;
  pagination: PaginationMeta;
};

export type TenantEventsResult = {
  tenant: Tenant;
  events: TenantEvent[];
  pagination: PaginationMeta;
};
