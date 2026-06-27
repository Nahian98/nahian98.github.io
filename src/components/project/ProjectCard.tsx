'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ExternalLink, Github, Check, Download } from 'lucide-react';
import { Card, Chip } from '@/components/ui';
import { ImagePlaceholder } from '@/components/common';
import type { Project } from '@/types';
import { cn, withBasePath } from '@/lib/utils';

/** Google Play glyph (single-color, inherits currentColor). */
function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}

/** Tailwind gradient classes per project accent. */
const accentGradient: Record<Project['accent'], string> = {
  green: 'from-accent/25 to-accent/0',
  blue: 'from-secondary/25 to-secondary/0',
  violet: 'from-[#A97BFF]/25 to-[#A97BFF]/0',
  amber: 'from-amber-400/25 to-amber-400/0',
};

interface ProjectCardProps {
  project: Project;
}

/**
 * Premium project card with an expandable case-study panel.
 *
 * Collapsed: image, title, tagline, tags, and link buttons.
 * Expanded: full description + feature list + complete tech stack.
 * The expand uses Framer's height auto animation (clipped by overflow-hidden),
 * and the chevron + aria-expanded keep it accessible and keyboard-toggleable.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const panelId = `project-panel-${project.id}`;
  const showImage = Boolean(project.image) && !imgError;

  return (
    <Card interactive className="flex h-full flex-col">
      {/* Header / image */}
      <div className="relative">
        <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-b', accentGradient[project.accent])} />
        <div className="p-4">
          {showImage ? (
            <img
              src={withBasePath(project.image as string)}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="aspect-[16/10] w-full rounded-xl border border-border object-cover"
            />
          ) : (
            <ImagePlaceholder ratio="aspect-[16/10]" label={project.imageAlt} />
          )}
        </div>
        {project.featured && (
          <span className="absolute right-6 top-6 rounded-full border border-accent/30 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent backdrop-blur">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Chip key={tag} accent>
              {tag}
            </Chip>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>

        {/* Downloads highlight */}
        {project.downloads && (
          <div className="mt-4 inline-flex items-center gap-2.5 self-start rounded-xl border border-accent/30 bg-gradient-to-r from-accent/15 to-secondary/10 px-3 py-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Download className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-foreground">
                {project.downloads}{' '}
                <span className="font-semibold text-accent">downloads</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Live on Google Play · worldwide
              </span>
            </span>
          </div>
        )}

        {/* Expandable case study */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Highlights
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.links.playStore && (
            <a
              href={project.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/15"
            >
              <GooglePlayIcon className="h-4 w-4" />
              Google Play
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
          >
            {expanded ? 'Show less' : 'Case study'}
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-300', expanded && 'rotate-180')}
            />
          </button>
        </div>
      </div>
    </Card>
  );
}
