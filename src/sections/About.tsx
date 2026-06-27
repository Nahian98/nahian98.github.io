'use client';

import { motion } from 'framer-motion';
import { Cpu, GitBranch, Layers, Rocket } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { ProfileImage, Reveal } from '@/components/common';
import { siteConfig } from '@/constants';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants';

const principles = [
  {
    icon: Layers,
    title: 'Architecture-first',
    body: 'MVVM and Clean Architecture that stay maintainable as features grow.',
  },
  {
    icon: Cpu,
    title: 'Performance-obsessed',
    body: 'Profiling, smooth frame budgets, and memory-conscious code by default.',
  },
  {
    icon: GitBranch,
    title: 'Hard problems',
    body: 'Drawn to complex engineering — not basic CRUD. Media, networking, offline.',
  },
  {
    icon: Rocket,
    title: 'Shipped & polished',
    body: 'Production apps with attention to UX and the details users feel.',
  },
];

export function About() {
  return (
    <Section id="about" aria-label="About me">
      <SectionHeading
        eyebrow="About"
        title="An engineer who cares about how things are built."
        description="Not just whether they work — but how cleanly, how fast, and how well they hold up over time."
      />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        {/* Profile */}
        <Reveal>
          <div className="relative">
            <ProfileImage
              src={siteConfig.profileImage}
              alt={`${siteConfig.name} — ${siteConfig.role}`}
              ratio="aspect-square"
              className="max-w-sm"
            />
            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 to-secondary/20 blur-2xl" />
          </div>
        </Reveal>

        {/* Summary + principles */}
        <div>
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a professional <span className="text-foreground">Android Engineer</span>{' '}
              specializing in native development with Kotlin and Jetpack Compose. I care
              deeply about clean architecture, problem solving, and writing code that other
              engineers enjoy working in.
            </p>
            <p>
              My favorite work sits where the hard problems are: real-time media playback,
              device-to-device networking, offline-first data, and background services that
              have to be reliable. I&apos;d rather engineer something elegant than ship another
              basic CRUD screen.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-9 grid gap-4 sm:grid-cols-2"
          >
            {principles.map(({ icon: Icon, title, body }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-border-strong"
              >
                <Icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}
