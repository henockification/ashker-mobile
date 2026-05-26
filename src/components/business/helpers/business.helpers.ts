import { CreateBusinessPayload } from '@/src/types/business';

import { AddBusinessSubmitValues } from '../detail-form';

type CountryOption = {
  code: string;
  name: string;
};

const COUNTRY_OPTIONS = require('@/src/data/add-business-countries.json') as CountryOption[];

export function toCreateBusinessPayload(values: AddBusinessSubmitValues): CreateBusinessPayload {
  const country =
    COUNTRY_OPTIONS.find((option) => option.code === values.countryCode)?.name ?? undefined;

  const payload: CreateBusinessPayload = {
    name: values.businessName,
    categoryIds: values.categoryIds,
    isCreatedByCustomer: values.isCreatedByCustomer,
    address: values.address || undefined,
    city: values.city || undefined,
    country,
    website: values.website || undefined,
    remark: values.notes || undefined,
  };

  if (values.phone) {
    payload.phoneNo = values.phone;
  }

  return payload;
}
