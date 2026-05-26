import {
  createContext,
  type PropsWithChildren,
  use,
  useLayoutEffect,
  useMemo,
} from 'react';
import { Uniwind } from 'uniwind';

import { useTenant } from '@/src/contexts/tenant';
import type { TenantEvent } from '@/src/types/tenant-events';
import {
  buildPrimaryPalette,
  resolveEventTheme,
  resolveThemePalette,
  type EventThemeColors,
} from '@/src/utils/theme-palette';

const EventThemeContext = createContext<EventThemeColors | null>(null);

export function useEventTheme(): EventThemeColors {
  const value = use(EventThemeContext);

  if (!value) {
    throw new Error('useEventTheme must be used within EventThemeProvider');
  }

  return value;
}

type EventThemeProviderProps = PropsWithChildren<{
  event: TenantEvent;
}>;

export function EventThemeProvider({ event, children }: EventThemeProviderProps) {
  const { themeColor: tenantThemeColor } = useTenant();

  const colors = useMemo(
    () => resolveEventTheme(event, tenantThemeColor),
    [event, tenantThemeColor],
  );

  useLayoutEffect(() => {
    Uniwind.updateCSSVariables('light', buildPrimaryPalette(colors.primary));

    return () => {
      Uniwind.updateCSSVariables('light', resolveThemePalette(tenantThemeColor));
    };
  }, [colors.primary, tenantThemeColor]);

  return <EventThemeContext.Provider value={colors}>{children}</EventThemeContext.Provider>;
}
