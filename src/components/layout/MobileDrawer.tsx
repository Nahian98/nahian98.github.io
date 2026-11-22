'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { navItems } from '@/constants';
import { cn } from '@/lib/utils';

interface MobileDrawerProps {
  open: boolean;
  activeId: string;
  onClose: () => void;
}

/**
 * Full-width menu panel for small screens. Locks body scroll while open and
 * closes on Escape, on backdrop tap, or after choosing a section.
 */
export function MobileDrawer({ open, activeId, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <nav className="absolute inset-x-3 top-3 rounded-2xl border border-border bg-card px-4 pb-4 pt-2 shadow-2xl">
        <div className="flex h-10 items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="mt-2 flex flex-col">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={onClose}
                className={cn(
                  'block rounded-xl px-3 py-3 text-base transition-colors',
                  activeId === item.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:bg-surface hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
