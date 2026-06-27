'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Github, Linkedin, Sparkles } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { siteConfig } from '@/constants';
import { withBasePath } from '@/lib/utils';
import { blurReveal, fadeUp, staggerContainer } from '@/animations/variants';
import { usePrefersReducedMotion } from '@/hooks';

/**
 * Above-the-fold hero. Large display headline with a blur-in reveal, a concise
 * intro, and the primary CTAs. The animated gradient blobs live in the global
 * BackgroundDecoration, so the hero itself stays clean and text-first.
 */
export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const container = reduceMotion ? undefined : staggerContainer(0.12, 0.1);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-4xl flex-col items-start"
        >
          {/* Availability / status pill */}
          <motion.span
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {siteConfig.role}
            <span className="mx-1 h-1 w-1 rounded-full bg-border-strong" />
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </span>
          </motion.span>

          {/* Headline */}
          <h1 className="text-balance font-display text-display-sm font-bold text-foreground sm:text-display lg:text-display-lg">
            <motion.span variants={blurReveal} className="block">
              Android Engineer crafting
            </motion.span>
            <motion.span variants={blurReveal} className="block">
              <span className="text-gradient">fast, reliable</span> mobile
            </motion.span>
            <motion.span variants={blurReveal} className="block">
              experiences.
            </motion.span>
          </h1>

          {/* Intro */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            I build polished, offline-first Android apps with Kotlin, Jetpack
            Compose and clean architecture — obsessing over performance,
            structure and the small details that make software feel effortless.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Button onClick={scrollToProjects} size="lg">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              as="a"
              href={withBasePath(siteConfig.resumePath)}
              download={siteConfig.resumeFileName}
              variant="secondary"
              size="lg"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
            <Button
              as="a"
              href={withBasePath(siteConfig.resumePath)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <div className="flex items-center gap-2">
              <Button
                as="a"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                aria-label="GitHub"
                className="px-0 w-12"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                as="a"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                aria-label="LinkedIn"
                className="px-0 w-12"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border-strong p-1">
          <motion.span
            className="h-2 w-1 rounded-full bg-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
