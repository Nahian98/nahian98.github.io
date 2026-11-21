import { siteConfig, socialLinks } from '@/constants';
import { Container } from '@/components/ui';
import { withBasePath } from '@/lib/utils';

export function Footer() {
  const year = new Date().getFullYear(); // evaluated at build time (static export)

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-4 border-t border-border py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map(({ label, href }) => {
              const url = label === 'Resume' ? withBasePath(href) : href;
              return (
                <li key={label}>
                  <a
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
