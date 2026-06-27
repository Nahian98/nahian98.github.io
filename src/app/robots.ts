import type { MetadataRoute } from 'next';
import { siteConfig } from '@/constants';

/**
 * Emits a static /robots.txt at export time. Allows all crawlers and points to
 * the sitemap (absolute URL, so it's correct regardless of basePath).
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
