'use client';

import { motion } from 'framer-motion';
import { Star, GitFork, ArrowUpRight, Github } from 'lucide-react';
import { Section, SectionHeading, Button } from '@/components/ui';
import { pinnedRepos, openSourceStats, siteConfig } from '@/constants';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants';

/**
 * Open-source presence: headline stats + pinned repository cards. Stats and
 * star/fork counts are PLACEHOLDER values (see constants) — kept static so the
 * site needs no GitHub API call at runtime, which keeps it purely static.
 */
export function OpenSource() {
  return (
    <Section id="open-source" aria-label="Open source">
      <SectionHeading
        eyebrow="Open Source"
        title="Building in the open."
        description="Reusable components, templates and experiments — a sample of what I share publicly."
      />

      {/* Stats */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {openSourceStats.map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card/60 p-5 text-center sm:text-left"
          >
            <Icon className="mx-auto h-5 w-5 text-accent sm:mx-0" />
            <div className="mt-3 text-2xl font-bold text-foreground">{value}</div>
            <div className="mt-0.5 text-sm text-muted-foreground">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pinned repos */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        {pinnedRepos.map((repo) => (
          <motion.a
            key={repo.name}
            variants={fadeUp}
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-border bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-card-hover"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <Github className="h-4 w-4 text-muted-foreground" />
                {repo.name}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {repo.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                {repo.language}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {repo.stars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {repo.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Button
          as="a"
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          <Github className="h-4 w-4" />
          View all on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
