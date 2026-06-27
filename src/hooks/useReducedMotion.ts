'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Thin semantic wrapper over the prefers-reduced-motion media query.
 * Components use this to swap heavy variants for `noMotion`.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
