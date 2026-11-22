import { siteConfig } from '@/constants';
import { cn } from '@/lib/utils';

/** Monogram badge + short name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-[13px] font-bold text-accent-foreground shadow-[0_0_20px_-4px_rgb(var(--accent)/0.6)]">
        {siteConfig.shortName}
      </span>
      <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline">
        Nahian Kanon
        <span className="text-accent">.</span>
      </span>
    </span>
  );
}
