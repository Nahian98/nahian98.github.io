'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { navItems, socialLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { easeOutExpo } from '@/animations/variants';

interface MobileDrawerProps {
  open: boolean;
  activeId: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

/**
 * Slide-in navigation drawer for small screens. Handles:
 * - body scroll lock while open,
 * - Escape to close,
 * - focus-friendly large tap targets and active highlighting.
 */
export function MobileDrawer({ open, activeId, onClose, onNavigate }: MobileDrawerProps) {
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Scrim */}
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-surface p-6 shadow-card"
            variants={{
              open: { x: 0 },
              closed: { x: '100%' },
            }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors',
                        isActive
                          ? 'bg-card text-foreground'
                          : 'text-muted-foreground hover:bg-card hover:text-foreground',
                      )}
                    >
                      {item.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex items-center gap-2 border-t border-border pt-6">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
