import type { MetadataRoute } from 'next';
import { siteConfig, navItems } from '@/constants';

/**
 * Emits a static /sitemap.xml. It's a single-page site, so we list the root
 * plus the in-page section anchors as informational URLs for completeness.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-26');
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...navItems.map((item) => ({
      url: `${siteConfig.url}/#${item.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
