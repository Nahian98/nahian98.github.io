'use client';

import { useCallback, useState } from 'react';
import { Menu, Github } from 'lucide-react';
import { navItems, siteConfig } from '@/constants';
import { useScrollSpy, useScrolled, usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { MobileDrawer } from './MobileDrawer';

const sectionIds = navItems.map((n) => n.id);

/**
 * Sticky navigation.
 * - Transparent at the top, glass + border once scrolled (useScrolled).
 * - Active link tracked by IntersectionObserver-based scroll-spy.
 * - Smooth-scrolls to sections; respects reduced-motion (jumps instantly).
 * - Mobile drawer for small viewports.
 */
export function Navbar() {
  const scrolled = useScrolled(24);
  const activeId = useScrollSpy(sectionIds);
  const reduceMotion = usePrefersReducedMotion();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = useCallback(
    (id: string) => {
      setDrawerOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      // Move focus for keyboard/screen-reader users without an extra tab stop.
      el.setAttribute('tabindex', '-1');
      (el as HTMLElement).focus({ preventScroll: true });
    },
    [reduceMotion],
  );

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out-expo',
          scrolled ? 'border-b border-border glass py-2.5' : 'border-b border-transparent py-4',
        )}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between px-5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
            aria-label="Back to top"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Logo />
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:inline-flex"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer
        open={drawerOpen}
        activeId={activeId}
        onClose={() => setDrawerOpen(false)}
        onNavigate={scrollTo}
      />
    </>
  );
}
