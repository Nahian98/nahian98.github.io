'use client';

import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { Button, Container, Reveal } from '@/components/ui';
import { siteConfig, socialLinks } from '@/constants';
import { useCopyToClipboard } from '@/hooks';
import { withBasePath } from '@/lib/utils';

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative pb-20 pt-10 sm:pb-28 sm:pt-12">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[38rem] max-w-full -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
            aria-hidden
          />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">06 · Contact</p>
            <h2
              id="contact-heading"
              className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl"
            >
              Let&apos;s build something people <span className="text-gradient">love to use.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
              I&apos;m open to Android and mobile engineering roles. Email is the best way to
              reach me.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button as="a" href={`mailto:${siteConfig.email}`}>
                <Mail className="h-4 w-4" aria-hidden />
                Say hello
              </Button>
              <Button
                variant="secondary"
                onClick={() => copy(siteConfig.email)}
                aria-label={copied ? 'Email copied' : `Copy email address ${siteConfig.email}`}
                className="font-mono text-[13px]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-accent" aria-hidden />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden />
                )}
                {copied ? 'Copied!' : siteConfig.email}
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {socialLinks
                .filter((l) => l.label !== 'Email')
                .map(({ label, href, icon: Icon }) => {
                  const url = label === 'Resume' ? withBasePath(href) : href;
                  return (
                    <li key={label}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                        {label}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
