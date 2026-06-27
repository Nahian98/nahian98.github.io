import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

/** Centered, max-width content wrapper with responsive gutters. */
export function Container({ as: Tag = 'div', children, className }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-content px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  );
}
