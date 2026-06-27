'use client';

import { useState } from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { cn, withBasePath } from '@/lib/utils';

interface ProfileImageProps {
  /** Public-relative path, e.g. '/images/profile.jpg'. */
  src: string;
  alt: string;
  /** Aspect ratio utility, e.g. 'aspect-[4/5]'. */
  ratio?: string;
  className?: string;
}

/**
 * Renders the profile photo, basePath-aware so it resolves on GitHub Pages.
 * If the file doesn't exist yet (or fails to load), it falls back to the
 * labeled placeholder — so the layout never breaks before you add your photo.
 * Uses a plain <img> on purpose: next/image's optimizer needs a server, which
 * a static export doesn't have (images are configured `unoptimized`).
 */
export function ProfileImage({ src, alt, ratio = 'aspect-[4/5]', className }: ProfileImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <ImagePlaceholder
        ratio={ratio}
        className={className}
        label={`Add your photo at public${src} — showing a placeholder until that file exists.`}
      />
    );
  }

  return (
    <img
      src={withBasePath(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={cn('w-full rounded-xl border border-border object-cover', ratio, className)}
    />
  );
}
