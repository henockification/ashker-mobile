import type { ImagePickerAsset } from 'expo-image-picker';

import type { UploadBusinessMediaFile } from '@/src/types/business-media';

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
