import { siteConfig, socialLinks } from '@/constants';
import { Container } from '@/components/ui';
import { withBasePath } from '@/lib/utils';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear(); // evaluated at build time (static export)

  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col gap-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
            <p>
              © {year} {siteConfig.name}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map(({ label, href, icon: Icon }) => {
              const url = label === 'Resume' ? withBasePath(href) : href;
              return (
                <li key={label}>
                  <a
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
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
