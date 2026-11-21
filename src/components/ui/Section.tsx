import { cn } from '@/lib/utils';
import { Container } from './Container';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Standard page section. On wide screens the heading sits in a narrow left
 * column next to the content (a resume-style layout); on small screens it
 * stacks above. A top border separates consecutive sections.
 */
export function Section({ id, title, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-20', className)}>
      <Container>
        <div className="grid gap-6 border-t border-border py-14 sm:py-16 md:grid-cols-[10rem_1fr] md:gap-10">
          <h2
            id={headingId}
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground md:pt-1"
          >
            {title}
          </h2>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
