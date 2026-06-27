import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  className?: string;
  /** Subtle accent tint for emphasized chips. */
  accent?: boolean;
}

/** Small pill used for tech tags and project labels. */
export function Chip({ children, className, accent = false }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        accent
          ? 'border-accent/30 bg-accent/10 text-accent'
          : 'border-border bg-surface text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}
