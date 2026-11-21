'use client';

import { Check, Copy } from 'lucide-react';
import { Section } from '@/components/ui';
import { siteConfig, socialLinks } from '@/constants';
import { useCopyToClipboard } from '@/hooks';
import { withBasePath } from '@/lib/utils';

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
        I&apos;m open to Android and mobile engineering roles. Email is the best way to
        reach me.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-base font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {siteConfig.email}
        </a>
        <button
          type="button"
          onClick={() => copy(siteConfig.email)}
          aria-label={copied ? 'Email copied' : 'Copy email address'}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {socialLinks
          .filter((l) => l.label !== 'Email')
          .map(({ label, href, handle }) => {
            const url = label === 'Resume' ? withBasePath(href) : href;
            return (
              <li key={label} className="flex gap-3 text-[15px]">
                <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  {handle}
                </a>
              </li>
            );
          })}
      </ul>
    </Section>
  );
}
