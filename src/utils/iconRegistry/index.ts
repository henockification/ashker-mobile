import React, { type ReactElement } from 'react';

import { DEFAULT_ICON_KEY, iconRegistry, type IconSlug } from './registry';
import type { IconComponent, IconProps } from './types';

export { DEFAULT_ICON_KEY, iconRegistry, type IconSlug } from './registry';
export type { IconComponent, IconProps } from './types';

export function normalizeIconSlug(icon?: string | null): IconSlug | null {
  if (!icon?.trim()) {
    return null;
  }

  const slug = icon
    .trim()
    .toLowerCase()
    .replace(/\.svg$/i, '')
    .replace(/_/g, '-');

  return slug in iconRegistry ? (slug as IconSlug) : null;
}

/** Resolves a local SVG component for an API icon slug, with a bundled fallback. */
export function getIconComponent(icon?: string | null): IconComponent {
  const slug = normalizeIconSlug(icon);
  return slug ? iconRegistry[slug] : iconRegistry[DEFAULT_ICON_KEY];
}

export function hasIconSlug(icon?: string | null): boolean {
  return normalizeIconSlug(icon) !== null;
}

type RegistryIconProps = IconProps & {
  icon?: string | null;
};

/** Renders a registry icon from an API slug (e.g. category.icon = "car-wash"). */
export function RegistryIcon({
  icon,
  width = 24,
  height = 24,
  color = '#18181b',
}: RegistryIconProps): ReactElement {
  const Icon = getIconComponent(icon);
  return React.createElement(Icon, { width, height, color });
}
