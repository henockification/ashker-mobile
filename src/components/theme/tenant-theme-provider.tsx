import { type PropsWithChildren, useLayoutEffect } from 'react';
import { Uniwind } from 'uniwind';

import { resolveThemePalette } from '@/src/utils/theme-palette';

type TenantThemeProviderProps = PropsWithChildren<{
  themeColor: string | null | undefined;
}>;

export function TenantThemeProvider({ themeColor, children }: TenantThemeProviderProps) {
  useLayoutEffect(() => {
    Uniwind.updateCSSVariables('light', resolveThemePalette(themeColor));
  }, [themeColor]);

  return children;
}
