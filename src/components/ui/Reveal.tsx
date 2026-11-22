'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
}

/**
 * Fades + lifts its children into view the first time they enter the viewport.
 * Styles live in globals.css (`.reveal`) and only apply when JS is running, so
 * the content is never hidden from no-JS visitors or crawlers.
 */
export function Reveal({ as: Tag = 'div', children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
