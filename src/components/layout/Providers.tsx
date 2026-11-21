'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * App-wide client providers. next-themes toggles `.dark` / `.light` on <html>
 * before paint (no theme flash under static export). Follows the visitor's OS
 * setting by default; the toggle overrides it and is remembered.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
