import { ImagePickerAsset } from "expo-image-picker";
import { UploadBusinessMediaFile } from "../types/business-media";
import * as ImageManipulator from 'expo-image-manipulator';

const MAX_IMAGE_DIMENSION = 1920;
const JPEG_QUALITY = 0.65;

export type PaginationMeta = {
  total: number;
  page: number;
  pageSize: number;
};

export type ApiSuccessResponse<T> = {
  success?: boolean;
  data: T;
};

export const defaultPagination = (): PaginationMeta => ({
  total: 0,
  page: 1,
  pageSize: 20,
});

export function unwrapData<T>(data: T | ApiSuccessResponse<T>): T {
  if (data && typeof data === 'object' && 'data' in data) {
    const envelope = data as ApiSuccessResponse<T>;
    if (envelope.data !== undefined && envelope.data !== null) {
      return envelope.data;
    }
  }
  
  return data as T;
}

function isVideoAsset(asset: ImagePickerAsset): boolean {
  return asset.type === 'video' || (asset.mimeType?.startsWith('video/') ?? false);
}

export function imagePickerAssetToUploadFile(asset: ImagePickerAsset): UploadBusinessMediaFile {
  const fallbackExtension = asset.type === 'video' ? 'mp4' : 'jpg';
  const extension = asset.mimeType?.split('/')[1] ?? fallbackExtension;
  const name = asset.fileName ?? `upload-${Date.now()}.${extension}`;

  return {
    uri: asset.uri,
    name,
    type: asset.mimeType ?? (asset.type === 'video' ? 'video/mp4' : 'image/jpeg'),
  };
}

export async function prepareAssetForUpload(
  asset: ImagePickerAsset,
): Promise<UploadBusinessMediaFile> {
  if (isVideoAsset(asset)) {
    return imagePickerAssetToUploadFile(asset);
  }

  const width = asset.width ?? 0;
  const height = asset.height ?? 0;
  const actions: ImageManipulator.Action[] = [];

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width >= height) {
      actions.push({ resize: { width: MAX_IMAGE_DIMENSION } });
    } else {
      actions.push({ resize: { height: MAX_IMAGE_DIMENSION } });
    }
  }

  try {
    const result = await ImageManipulator.manipulateAsync(
      asset.uri,
      actions,
      {
        compress: JPEG_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );

    const baseName = asset.fileName?.replace(/\.[^.]+$/, '') ?? `upload-${Date.now()}`;

    return {
      uri: result.uri,
      name: `${baseName}.jpg`,
      type: 'image/jpeg',
    };
  } catch {
    return imagePickerAssetToUploadFile(asset);
  }
}