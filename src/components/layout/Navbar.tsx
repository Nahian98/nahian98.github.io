'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { navItems } from '@/constants';
import { useScrollSpy, useScrolled } from '@/hooks';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { MobileDrawer } from './MobileDrawer';

// 'top' (the intro) is tracked too, so no link is highlighted while it's in view.
const sectionIds = ['top', ...navItems.map((n) => n.id)];

/**
 * Sticky top bar: name on the left, section links + theme toggle on the right.
 * Gains a solid background and bottom border once the page is scrolled.
 */
export function Navbar() {
  const scrolled = useScrolled(16);
  const activeId = useScrollSpy(sectionIds);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-colors',
          scrolled ? 'border-border bg-background/95' : 'border-transparent bg-background',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-6">
          <a href="#top" className="rounded-md">
            <Logo />
          </a>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center md:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm transition-colors',
                      activeId === item.id
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground md:hidden"
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
      />
    </>
  );
}
