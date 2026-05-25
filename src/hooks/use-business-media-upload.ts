import type { ImagePickerAsset } from 'expo-image-picker';
import { useCallback } from 'react';

import { useSession } from '@/src/contexts/auth';
import { useUploadBusinessMedia } from '@/src/hooks/use-business-media';
import { resolveAuthUserId } from '@/src/utils/auth-user-id';
import { handleApiError } from '@/src/utils';
import { useMediaAccessPrompt } from './use-media-access-prompt';
import { prepareAssetForUpload } from '../utils/helpers';

export function useBusinessMediaUpload(businessId: string | undefined) {
  const { session, accessToken } = useSession();
  const uploadBusinessMedia = useUploadBusinessMedia();

  const uploadSelectedAssets = useCallback(
    async (assets: ImagePickerAsset[]) => {
      if (!assets.length) {
        return { uploadedCount: 0 };
      }

      if (!businessId) {
        handleApiError(undefined, 'Business not found.');
        return { uploadedCount: 0 };
      }

      const createdBy = resolveAuthUserId(session, accessToken) ?? undefined;

      let uploadedCount = 0;

      for (const asset of assets) {
        try {
          const file = await prepareAssetForUpload(asset);
          await uploadBusinessMedia.mutateAsync({
            file,
            businessId,
            ...(createdBy ? { createdBy } : {}),
          });
          uploadedCount += 1;
        } catch (error) {
          handleApiError(error, 'Unable to upload this file. Please try again.');
          break;
        }
      }

      return { uploadedCount };
    },
    [accessToken, businessId, session, uploadBusinessMedia],
  );

  return {
    uploadSelectedAssets,
    isUploading: uploadBusinessMedia.isPending,
  };
}

export function useAddBusinessPhotos(businessId: string | undefined) {
  const mediaAccess = useMediaAccessPrompt();
  const { uploadSelectedAssets, isUploading } = useBusinessMediaUpload(businessId);

  const pickAndUpload = useCallback(async () => {
    const assets = await mediaAccess.openIfNeeded();
    return uploadSelectedAssets(assets);
  }, [mediaAccess, uploadSelectedAssets]);

  const enableAccessAndUpload = useCallback(async () => {
    const assets = await mediaAccess.handleEnableAccess();
    return uploadSelectedAssets(assets);
  }, [mediaAccess, uploadSelectedAssets]);

  return {
    ...mediaAccess,
    pickAndUpload,
    enableAccessAndUpload,
    isUploadingMedia: mediaAccess.isOpeningPicker || isUploading,
  };
}