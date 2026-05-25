import type { Business } from '@/src/types/business';
import type { MediaCategory } from '@/src/types/media-category';

export function resolveMediaCategoryId(
  mediaCategories: MediaCategory[] | undefined,
  business?: Business | null,
): string | null {
  const featured =
    mediaCategories?.find((category) => category.name.toLowerCase() === 'featured') ??
    mediaCategories?.[0];

  if (featured?.id) {
    return featured.id;
  }

  const fromEnv = process.env.EXPO_PUBLIC_DEFAULT_MEDIA_CATEGORY_ID?.trim();
  if (fromEnv) {
    return fromEnv;
  }

  // Legacy fallbacks — API expects a media category id, not a business category id.
  void business;
  return null;
}
