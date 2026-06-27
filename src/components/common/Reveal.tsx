'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, noMotion, viewportOnce } from '@/animations/variants';
import { usePrefersReducedMotion } from '@/hooks';

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  /** Stagger delay in seconds when used standalone. */
  delay?: number;
  as?: 'div' | 'li' | 'span';
}

/**
 * Scroll-triggered reveal wrapper. Animates once when entering the viewport and
 * automatically becomes a no-op when the user prefers reduced motion — so every
 * section gets motion for free without each one re-implementing the guard.
 */
export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={reduceMotion ? noMotion : variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
