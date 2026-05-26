/** Neutral fallback when tenant has no themeColor — matches global.css defaults. */
export const FALLBACK_PRIMARY_HEX = '#52525b';

export type PrimaryPalette = {
  '--primary-50': string;
  '--primary-100': string;
  '--primary-200': string;
  '--primary-300': string;
  '--primary-500': string;
  '--primary-600': string;
  '--primary-700': string;
  '--primary-800': string;
  '--primary-900': string;
};

type Rgb = { r: number; g: number; b: number };

const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const mix = (a: Rgb, b: Rgb, weight: number): Rgb => ({
  r: clamp(a.r * (1 - weight) + b.r * weight),
  g: clamp(a.g * (1 - weight) + b.g * weight),
  b: clamp(a.b * (1 - weight) + b.b * weight),
});

const toHex = ({ r, g, b }: Rgb): string =>
  `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;

export const parseHexColor = (input: string | null | undefined): string | null => {
  if (!input?.trim()) {
    return null;
  }

  const normalized = input.trim();
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(normalized);

  if (!match) {
    return null;
  }

  const hex = match[1];
  if (hex.length === 3) {
    const [r, g, b] = hex.split('');
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return `#${hex.toLowerCase()}`;
};

const hexToRgb = (hex: string): Rgb => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

export const buildPrimaryPalette = (baseHex: string): PrimaryPalette => {
  const base = hexToRgb(baseHex);
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };

  return {
    '--primary-50': toHex(mix(base, white, 0.92)),
    '--primary-100': toHex(mix(base, white, 0.84)),
    '--primary-200': toHex(mix(base, white, 0.68)),
    '--primary-300': toHex(mix(base, white, 0.48)),
    '--primary-500': toHex(mix(base, white, 0.12)),
    '--primary-600': baseHex,
    '--primary-700': toHex(mix(base, black, 0.16)),
    '--primary-800': toHex(mix(base, black, 0.32)),
    '--primary-900': toHex(mix(base, black, 0.52)),
  };
};

export const resolveTenantThemeColor = (themeColor: string | null | undefined): string | null => {
  return parseHexColor(themeColor);
};

export const getFallbackPrimaryPalette = (): PrimaryPalette =>
  buildPrimaryPalette(FALLBACK_PRIMARY_HEX);

export const resolveThemePalette = (themeColor: string | null | undefined): PrimaryPalette => {
  const resolved = resolveTenantThemeColor(themeColor);
  return buildPrimaryPalette(resolved ?? FALLBACK_PRIMARY_HEX);
};

export const getHeaderGradientColors = (
  themeColor: string | null | undefined,
): [string, string] => {
  const base = parseHexColor(themeColor) ?? FALLBACK_PRIMARY_HEX;
  const rgb = hexToRgb(base);

  return [base, toHex(mix(rgb, { r: 0, g: 0, b: 0 }, 0.28))];
};

export type EventThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

const deriveSecondaryFromPrimary = (primary: string): string => {
  const rgb = hexToRgb(primary);
  return toHex(mix(rgb, { r: 255, g: 255, b: 255 }, 0.35));
};

const deriveTertiaryFromPrimary = (primary: string): string => {
  const rgb = hexToRgb(primary);
  return toHex(mix(rgb, { r: 0, g: 0, b: 0 }, 0.22));
};

/** Event brand colors — falls back through tenant, then derived shades. */
export const resolveEventTheme = (
  event: {
    themeColor: string | null;
    secondaryColor: string | null;
    tertiaryColor: string | null;
  },
  tenantThemeColor?: string | null,
): EventThemeColors => {
  const primary =
    parseHexColor(event.themeColor) ??
    parseHexColor(tenantThemeColor) ??
    FALLBACK_PRIMARY_HEX;

  const secondary =
    parseHexColor(event.secondaryColor) ?? deriveSecondaryFromPrimary(primary);
  const tertiary =
    parseHexColor(event.tertiaryColor) ?? deriveTertiaryFromPrimary(primary);

  return { primary, secondary, tertiary };
};

export const withAlpha = (hex: string, alphaHex: string): string => {
  const parsed = parseHexColor(hex);
  return parsed ? `${parsed}${alphaHex}` : hex;
};

export const getEventHeroGradientColors = (
  theme: EventThemeColors,
): [string, string, string] => {
  const primaryRgb = hexToRgb(theme.primary);
  const secondaryRgb = hexToRgb(theme.secondary);

  return [
    // keep photo visible: mostly transparent at top, darker near bottom for text
    withAlpha(theme.primary, '22'),
    withAlpha(toHex(mix(primaryRgb, secondaryRgb, 0.55)), '88'),
    withAlpha(toHex(mix(secondaryRgb, { r: 0, g: 0, b: 0 }, 0.45)), 'CC'),
  ];
};
