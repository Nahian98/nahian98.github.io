import { cn } from '@/lib/utils';
import { Container } from './Container';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** When false, children render full-bleed without the inner Container. */
  contained?: boolean;
  'aria-label'?: string;
}

/**
 * Standard page section: consistent vertical rhythm + scroll-margin so the
 * sticky navbar never covers the heading on anchor navigation.
 */
export function Section({
  id,
  children,
  className,
  contained = true,
  'aria-label': ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('scroll-mt-24 py-20 sm:py-28', className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
