'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, Menu } from 'lucide-react';
import { navItems, siteConfig } from '@/constants';
import { useScrollSpy, useScrolled } from '@/hooks';
import { cn, withBasePath } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { MobileDrawer } from './MobileDrawer';

// 'top' (the intro) is tracked too, so no link is highlighted while it's in view.
const sectionIds = ['top', ...navItems.map((n) => n.id)];

/** Thin accent bar showing how far down the page the visitor is. */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent to-secondary"
    />
  );
}

/**
 * Floating glass navbar: wordmark on the left, section links in the middle,
 * resume + theme toggle on the right. Tightens up once the page is scrolled.
 */
export function Navbar() {
  const scrolled = useScrolled(16);
  const activeId = useScrollSpy(sectionIds);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          className={cn(
            'mx-auto flex h-14 max-w-content items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4',
            scrolled
              ? 'border-border bg-background/75 shadow-lg shadow-black/10 backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <a href="#top" className="rounded-lg" aria-label={`${siteConfig.name}, back to top`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-0.5 rounded-xl border border-border/60 bg-card/50 p-1 backdrop-blur md:flex">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'block rounded-lg px-3.5 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-foreground/[0.08] text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={withBasePath(siteConfig.resumePath)}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-1 hidden h-9 items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 sm:inline-flex"
            >
              <FileText className="h-4 w-4 text-accent" aria-hidden />
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer open={drawerOpen} activeId={activeId} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
