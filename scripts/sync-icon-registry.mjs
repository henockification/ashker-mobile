#!/usr/bin/env node
/**
 * Regenerates src/utils/iconRegistry/registry.ts from assets/icons/*.svg.
 * Metro requires static imports — add an SVG, then run: pnpm sync:icons
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = path.join(root, 'assets/icons');
const outFile = path.join(root, 'src/utils/iconRegistry/registry.ts');

const toPascal = (slug) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const slugs = fs
  .readdirSync(iconsDir)
  .filter((name) => name.endsWith('.svg'))
  .map((name) => name.slice(0, -4))
  .sort();

const imports = slugs.map((slug) => `import ${toPascal(slug)} from '@/assets/icons/${slug}.svg';`);
const entries = slugs.map((slug) => `  '${slug}': ${toPascal(slug)},`);

const content = `/**
 * Maps API icon slugs (e.g. "car-wash") to bundled SVG components from assets/icons/{slug}.svg.
 * Regenerate after adding icons: \`pnpm sync:icons\`
 */
import type { IconComponent } from './types';

${imports.join('\n')}

export const DEFAULT_ICON_KEY = 'checklist' as const;

export type IconSlug = keyof typeof iconRegistry;

export const iconRegistry = {
${entries.join('\n')}
} as const satisfies Record<string, IconComponent>;
`;

fs.writeFileSync(outFile, content);
console.log(`Synced ${slugs.length} icons → ${path.relative(root, outFile)}`);
