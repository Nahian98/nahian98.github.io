'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks';

/**
 * Very subtle custom cursor — desktop + fine-pointer only, and disabled under
 * reduced-motion. A small dot follows the pointer 1:1; a larger ring lags
 * slightly (spring) and gently grows over interactive elements. The native
 * cursor is intentionally NOT hidden, so usability/accessibility is preserved
 * even if JS fails — this is purely an enhancement layer.
 */
export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();
  const enabled = isDesktop && !reduceMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest('a, button, [role="button"], input, textarea')));
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent/60"
      />
      <motion.div
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
      />
    </div>
  );
}
