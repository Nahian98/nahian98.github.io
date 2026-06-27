import { siteConfig } from '@/constants';
import { cn } from '@/lib/utils';

/**
 * Wordmark: a monogram tile + name. The tile uses the accent gradient and the
 * Android-green dot motif. Purely typographic so it scales crisply everywhere.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-sm font-bold text-foreground shadow-soft">
        <span className="text-gradient">{siteConfig.shortName}</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent shadow-glow" />
      </span>
      <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline">
        {siteConfig.name}
      </span>
    </span>
  );
}
