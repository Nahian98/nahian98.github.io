import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Reveal } from './Reveal';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  /** Monospace index shown above the title, e.g. "01". */
  index?: string;
  /** One-line lead under the title. */
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Standard page section: a numbered monospace eyebrow, a large title and an
 * optional lead line, followed by the section content.
 */
export function Section({ id, title, index, lead, children, className }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('relative py-16 sm:py-24', className)}>
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {index && <span>{index}</span>}
            <span className="h-px w-10 bg-accent/50" aria-hidden />
            <span className="text-muted-foreground">{title}</span>
          </p>
          <h2
            id={headingId}
            className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl"
          >
            {lead ?? title}
          </h2>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
