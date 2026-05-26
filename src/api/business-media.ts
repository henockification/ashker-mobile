import type {
  BusinessMedia,
  BusinessMediaDetailResponse,
  BusinessMediaListResponse,
  BusinessMediaListResult,
  UploadBusinessMediaPayload,
} from '@/src/types/business-media';
import { type ApiSuccessResponse, defaultPagination, unwrapData } from '@/src/utils/helpers';

import { apiClient } from './client';

function unwrapBusinessMedia(data: BusinessMediaDetailResponse | BusinessMedia): BusinessMedia {
  if (data && typeof data === 'object' && 'data' in data && !Array.isArray(data.data)) {
    return data.data;
  }

  return unwrapData(data);
}

function unwrapBusinessMediaList(
  data: BusinessMediaListResponse | ApiSuccessResponse<BusinessMedia[]> | BusinessMedia[],
): BusinessMediaListResult {
  if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
    const response = data as BusinessMediaListResponse;
    return {
      media: Array.isArray(response.data) ? response.data : [],
      pagination: response.pagination ?? defaultPagination(),
    };
  }

  const list = unwrapData(data as ApiSuccessResponse<BusinessMedia[]> | BusinessMedia[]);
  const media = Array.isArray(list) ? list : [];

  return {
    media,
    pagination: {
      ...defaultPagination(),
      total: media.length,
    },
  };
}

function appendFile(formData: FormData, payload: UploadBusinessMediaPayload) {
  formData.append('file', {
    uri: payload.file.uri,
    name: payload.file.name,
    type: payload.file.type,
  } as unknown as Blob);
}

export const uploadBusinessMedia = async (
  payload: UploadBusinessMediaPayload,
): Promise<BusinessMedia> => {
  const formData = new FormData();

  appendFile(formData, payload);
  formData.append('businessId', payload.businessId);

  if (payload.mediaCategoryId) {
    formData.append('mediaCategoryId', payload.mediaCategoryId);
  }

  if (payload.createdBy) {
    formData.append('createdBy', payload.createdBy);
  }

  if (payload.caption?.trim()) {
    formData.append('caption', payload.caption.trim());
  }

  const { data } = await apiClient.post<BusinessMediaDetailResponse | BusinessMedia>(
    'business-media/upload',
    formData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        if (data instanceof FormData) {
          delete headers['Content-Type'];
        }

        return data;
      },
    },
  );

  return unwrapBusinessMedia(data);
};

export const getBusinessMedia = async (businessId: string): Promise<BusinessMediaListResult> => {
  const { data } = await apiClient.get<
    BusinessMediaListResponse | ApiSuccessResponse<BusinessMedia[]> | BusinessMedia[]
  >('business-media', {
    params: { businessId },
  });

  return unwrapBusinessMediaList(data);
};
