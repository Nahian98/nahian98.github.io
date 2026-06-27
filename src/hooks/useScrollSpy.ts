'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently considered "active".
 *
 * Implementation note: rather than rolling our own scroll-math, we use an
 * IntersectionObserver with a rootMargin that shifts the detection band to the
 * upper third of the viewport. This makes the active section flip when its top
 * crosses ~the navbar line — which matches what feels correct to users — and is
 * far cheaper than a scroll listener doing getBoundingClientRect on every frame.
 */
export function useScrollSpy(ids: string[], rootMargin = '-45% 0px -50% 0px'): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry nearest the top among those currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
