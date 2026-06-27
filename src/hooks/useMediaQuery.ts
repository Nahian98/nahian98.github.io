'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook. Returns false on the server and during the first
 * client render, then syncs to the real match after mount — avoiding hydration
 * mismatches under static export.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Convenience: true on pointer-fine, wide viewports (desktop). */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px) and (pointer: fine)');
}
