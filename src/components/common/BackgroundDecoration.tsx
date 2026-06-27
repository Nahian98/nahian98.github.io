'use client';

/**
 * Fixed, non-interactive ambient background:
 * - a faint grid masked to fade at the edges,
 * - three slowly drifting, heavily-blurred gradient blobs.
 *
 * It sits behind everything (-z-10), is pointer-events-none, and is hidden from
 * assistive tech. The blob drift uses a CSS keyframe (cheap, GPU-composited)
 * rather than per-frame JS, and is disabled by prefers-reduced-motion via the
 * global CSS rule in globals.css.
 */
export function BackgroundDecoration() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:64px_64px] opacity-[0.4] mask-radial" />

      {/* Drifting gradient blobs */}
      <div className="absolute -left-32 -top-24 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px] animate-blob-drift" />
      <div
        className="absolute -right-24 top-1/4 h-[32rem] w-[32rem] rounded-full bg-secondary/20 blur-[120px] animate-blob-drift"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px] animate-blob-drift"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  );
}
