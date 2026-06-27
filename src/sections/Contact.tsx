'use client';

import { Check, Copy, Mail, ArrowUpRight, Eye, Download } from 'lucide-react';
import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/common';
import { socialLinks, siteConfig } from '@/constants';
import { useCopyToClipboard } from '@/hooks';
import { withBasePath } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Contact CTA. A single, calm card: a clear headline, a one-click copy-email
 * control, and the key links. Kept backend-free — email is a mailto + clipboard,
 * no form submission to a server (which static export can't host anyway).
 */
export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="contact" aria-label="Contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
          {/* Ambient accent glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Contact
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something well-engineered.
            </h2>
            <p className="mx-auto mt-4 max-w-prose text-balance text-base leading-relaxed text-muted-foreground">
              I&apos;m open to interesting Android roles and collaborations. The
              fastest way to reach me is email — I read every message.
            </p>

            {/* Email + copy */}
            <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-2 sm:flex-row">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
              >
                <Mail className="h-4 w-4 text-accent" />
                {siteConfig.email}
              </a>
              <button
                type="button"
                onClick={() => copy(siteConfig.email)}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                className={cn(
                  'inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors',
                  copied
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground',
                )}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Primary actions */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button as="a" href={withBasePath(siteConfig.resumePath)} download={siteConfig.resumeFileName}>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
              <Button
                as="a"
                href={withBasePath(siteConfig.resumePath)}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              {socialLinks
                .filter((l) => l.label === 'GitHub' || l.label === 'LinkedIn')
                .map(({ label, href, icon: Icon }) => (
                  <Button
                    key={label}
                    as="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
