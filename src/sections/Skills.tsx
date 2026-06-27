'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Section, SectionHeading, Chip, Card } from '@/components/ui';
import { skillCategories } from '@/constants';
import { filterItem, easeOutExpo } from '@/animations/variants';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

/**
 * Skills as grouped, hover-animated cards with a live search. Searching filters
 * both categories and the individual skills shown inside them, and highlights
 * matches — useful for recruiters scanning for a specific technology.
 */
export function Skills() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const reduceMotion = usePrefersReducedMotion();

  const filtered = useMemo(() => {
    if (!q) return skillCategories;
    return skillCategories
      .map((cat) => {
        const categoryMatches = cat.title.toLowerCase().includes(q);
        const skills = categoryMatches
          ? cat.skills
          : cat.skills.filter((s) => s.toLowerCase().includes(q));
        return { ...cat, skills, _match: categoryMatches || skills.length > 0 };
      })
      .filter((c) => c._match);
  }, [q]);

  return (
    <Section id="skills" aria-label="Skills">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Skills"
          title="A deep, practical toolkit."
          description="Grouped by what they're for — from platform internals to the build pipeline."
        />

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            aria-label="Search skills"
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                layout
                variants={filterItem}
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.4),
                  ease: easeOutExpo,
                }}
              >
                <Card interactive className="group h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-accent transition-colors group-hover:border-accent/40">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{cat.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => {
                      const isMatch = q && skill.toLowerCase().includes(q);
                      return (
                        <Chip key={skill} accent={Boolean(isMatch)} className={cn(isMatch && 'font-semibold')}>
                          {skill}
                        </Chip>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          No skills match &ldquo;{query}&rdquo;. Try a different term.
        </p>
      )}
    </Section>
  );
}
