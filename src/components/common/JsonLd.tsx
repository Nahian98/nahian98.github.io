import { siteConfig } from '@/constants';

/**
 * Structured data (schema.org Person) for rich search results. Rendered as a
 * static <script type="application/ld+json"> — safe under static export and
 * not user-controlled, so the JSON is build-time constant.
 */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [...siteConfig.keywords],
  };

  return (
    <script
      type="application/ld+json"
      // Build-time constant content; not derived from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
