'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/ui';
import { techStack, techCategories } from '@/constants';
import { filterItem, easeOutExpo } from '@/animations/variants';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

/**
 * Tech stack as filterable chips. Clicking a category filter animates the grid
 * via Framer's layout animations, so chips smoothly reflow rather than snapping.
 */
export function TechStack() {
  const [active, setActive] = useState<(typeof techCategories)[number]>('All');

  const reduceMotion = usePrefersReducedMotion();

  const items = useMemo(
    () => (active === 'All' ? techStack : techStack.filter((t) => t.category === active)),
    [active],
  );

  return (
    <Section id="stack" aria-label="Tech stack">
      <SectionHeading
        align="center"
        eyebrow="Tech Stack"
        title="The tools I reach for every day."
        description="Filter by area to see the technologies I use across the Android stack."
        className="mx-auto"
      />

      {/* Filters */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {techCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
              active === cat
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Chips */}
      <motion.ul
        layout
        className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((tech, index) => (
            <motion.li
              key={tech.name}
              layout
              variants={filterItem}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              exit="exit"
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.3),
                ease: easeOutExpo,
              }}
              className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-secondary transition-transform group-hover:scale-125" />
              {tech.name}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
