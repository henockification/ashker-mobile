import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

/** Props for bundled SVG icons — use `color` for plain icons (maps to currentColor). */
export type IconProps = Pick<SvgProps, 'width' | 'height' | 'color'>;

export type IconComponent = ComponentType<IconProps>;
