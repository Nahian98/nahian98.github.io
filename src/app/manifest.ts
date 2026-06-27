import type { MetadataRoute } from 'next';
import { siteConfig } from '@/constants';

/**
 * PWA web app manifest, emitted statically as /manifest.webmanifest.
 * Icon `src` paths are basePath-prefixed so they resolve on project-page
 * deploys; `start_url`/`scope` use the basePath for the same reason.
 */
export const dynamic = 'force-static';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.role}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: `${base}/`,
    scope: `${base}/`,
    display: 'standalone',
    background_color: '#09090B',
    theme_color: '#09090B',
    icons: [
      { src: `${base}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${base}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${base}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
