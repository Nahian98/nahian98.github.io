'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import { Section, SectionHeading, Chip } from '@/components/ui';
import { experience } from '@/constants';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants';

/**
 * Vertical experience timeline. A subtle gradient line connects role nodes; the
 * line itself scales in on scroll, and each role card reveals with a stagger.
 */
export function Experience() {
  return (
    <Section id="experience" aria-label="Experience">
      <SectionHeading
        eyebrow="Experience"
        title="A track record of shipping."
        description="Roles where I owned architecture, performance and delivery for production Android apps."
      />

      <motion.ol
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mt-14 space-y-10 pl-8 sm:pl-10"
      >
        {/* Connecting line */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-border to-transparent sm:left-[11px]"
        />

        {experience.map((item) => (
          <motion.li key={item.id} variants={fadeUp} className="relative">
            {/* Node */}
            <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center sm:-left-10">
              <span className="h-4 w-4 rounded-full border-2 border-accent bg-background" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-accent" />
            </span>

            <div className="rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-border-strong">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
                <span className="text-sm font-medium text-accent">{item.period}</span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {item.company}
                </span>
                {item.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

              <ul className="mt-4 space-y-1.5">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
