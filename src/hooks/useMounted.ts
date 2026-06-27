'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true only after the component has mounted on the client. Used to gate
 * rendering of theme-dependent UI (e.g. the theme toggle icon) so the static
 * HTML and the first client render agree, preventing hydration warnings.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
