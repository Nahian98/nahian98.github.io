import type { Variants } from 'framer-motion';

/**
 * Central library of Framer Motion variants. Keeping them here (not inline)
 * guarantees a consistent motion language across sections and makes the whole
 * site's feel tunable from one file.
 *
 * Reduced-motion is honored two ways: globally via CSS in globals.css, and at
 * the component level via the `useReducedMotion` hook which swaps in `noMotion`.
 */

/** Cubic-bezier "out expo" easing, typed as a bezier tuple Framer accepts. */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Default viewport config: animate once, a touch before fully in view. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' } as const;

/** Fade + rise — the workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Blur reveal — used sparingly for hero headline lines. */
export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

/** Parent container that staggers its children's reveal. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** No-op variants returned when the user prefers reduced motion. */
export const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

/**
 * Variants for items inside a filterable AnimatePresence grid.
 *
 * IMPORTANT: each item must apply these with EXPLICIT initial/animate/exit
 * labels (not inherited from a parent). When a parent orchestrates children via
 * `whileInView` + `viewport={{ once: true }}`, items that re-enter after a
 * filter change mount into the parent's already-settled state and get stuck at
 * `hidden` (invisible). Self-driving each item fixes that — every mount animates
 * to `visible` regardless of when it appears.
 */
export const filterItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96 },
};
