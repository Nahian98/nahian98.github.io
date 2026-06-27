'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeading } from '@/components/ui';
import { ProjectCard } from '@/components/project/ProjectCard';
import { projects, projectFilters } from '@/constants';
import { filterItem, easeOutExpo } from '@/animations/variants';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

/**
 * Projects — the most important section. Filterable, animated grid of premium
 * project cards, each expandable into a case study. Filtering re-runs the
 * stagger reveal and animates cards in/out by layout.
 */
export function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const reduceMotion = usePrefersReducedMotion();

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <Section id="projects" aria-label="Projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've engineered."
        description="A few applications where the interesting work was in the architecture, performance and platform depth — not just the screens."
      />

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-2">
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
              filter === f
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              variants={filterItem}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              exit="exit"
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.4),
                ease: easeOutExpo,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
