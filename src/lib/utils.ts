import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names and resolve Tailwind conflicts
 * (later utility wins). Used by every UI primitive.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix a public asset path with the deploy basePath so links/images resolve
 * on GitHub Pages project sites (served from `/<repo>`). Always pass paths that
 * start with `/`. Returns a clean path for root deploys.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}
