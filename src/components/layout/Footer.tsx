'use client';

import { navItems, siteConfig, socialLinks } from '@/constants';
import { Container } from '@/components/ui';
import { Logo } from './Logo';
import { usePrefersReducedMotion } from '@/hooks';

/** Minimal, elegant footer: brand, quick links, socials, and a Kotlin sign-off. */
export function Footer() {
  const reduceMotion = usePrefersReducedMotion();
  const year = 2026; // build-time constant; bump as needed or wire to CI date

  const go = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.role} focused on elegant architecture, performance, and
              thoughtfully engineered mobile experiences.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.name}. Made with Kotlin{' '}
            <span className="text-accent" aria-label="love">
              ❤
            </span>
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
