import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  /** Describes exactly what real image belongs here. Shown + used as a label. */
  label: string;
  className?: string;
  /** Aspect ratio utility, e.g. 'aspect-video', 'aspect-square'. */
  ratio?: string;
}

/**
 * Clearly-marked image placeholder. Communicates what asset should replace it
 * (per the brief) using a dashed frame, an icon and the descriptive label —
 * never ships as if it were a finished image.
 */
export function ImagePlaceholder({
  label,
  className,
  ratio = 'aspect-video',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border-strong bg-surface',
        ratio,
        className,
      )}
    >
      {/* Faint grid texture so the empty state still feels intentional */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-30" />
      <div className="relative flex max-w-[80%] flex-col items-center gap-2 p-4 text-center">
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Image placeholder
        </span>
        <span className="text-xs leading-relaxed text-muted-foreground/80">{label}</span>
      </div>
    </div>
  );
}
