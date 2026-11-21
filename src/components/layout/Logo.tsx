import { siteConfig } from '@/constants';
import { cn } from '@/lib/utils';

/** Plain-text wordmark: the full name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('text-[15px] font-semibold tracking-tight text-foreground', className)}>
      {siteConfig.name}
    </span>
  );
}
