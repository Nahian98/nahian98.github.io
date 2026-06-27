'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Used to switch the navbar from transparent to its blurred state, and to
 * reveal the back-to-top button. Uses a passive listener for scroll performance.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
