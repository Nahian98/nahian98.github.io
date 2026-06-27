'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * App-wide client providers. next-themes toggles `.dark` / `.light` on <html>,
 * persists the choice to localStorage, and injects a tiny inline script that
 * sets the class before paint — so there's no theme flash even under static
 * export. Dark is the default.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
