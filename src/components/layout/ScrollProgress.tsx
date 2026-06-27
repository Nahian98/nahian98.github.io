'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gradient bar pinned to the very top that tracks reading progress.
 * Uses Framer's useScroll (rAF-throttled) + a spring for a smooth, non-jittery
 * fill. scaleX transform only — no layout work per frame.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent to-secondary"
    />
  );
}
