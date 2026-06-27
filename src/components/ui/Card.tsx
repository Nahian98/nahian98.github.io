import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds hover elevation + border emphasis. */
  interactive?: boolean;
  className?: string;
}

/**
 * Surface card with subtle border and inset highlight. The `interactive`
 * variant adds a lift-on-hover that signals clickability without being flashy.
 */
export function Card({ children, interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card shadow-card',
        interactive &&
          'transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-border-strong hover:bg-card-hover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
