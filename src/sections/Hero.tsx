import { ArrowDown, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { CodeCard } from '@/components/hero/CodeCard';
import { siteConfig, stats } from '@/constants';
import { withBasePath } from '@/lib/utils';

const socials = [
  { label: 'GitHub', href: siteConfig.links.github, icon: Github },
  { label: 'LinkedIn', href: siteConfig.links.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${siteConfig.email}`, icon: Mail },
];

/**
 * Introduction: who, what, proof (stats) and the links a recruiter or hiring
 * manager looks for first (resume, GitHub, LinkedIn, email).
 */
export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      {/* Backdrop: grid + soft accent glows */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.13] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-40 h-[360px] w-[420px] rounded-full bg-secondary/[0.10] blur-[110px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <div className="flex animate-fade-up items-center gap-3">
              <img
                src={withBasePath('/images/avatar-96.jpg')}
                srcSet={[96, 192, 288]
                  .map((w) => `${withBasePath(`/images/avatar-${w}.jpg`)} ${w}w`)
                  .join(', ')}
                sizes="48px"
                width={48}
                height={48}
                alt={siteConfig.name}
                decoding="async"
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-accent/40 ring-offset-2 ring-offset-background"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">{siteConfig.name}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {siteConfig.location}
                </p>
              </div>
            </div>

            <p
              className="mt-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent [animation-delay:80ms]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-[ping_1.6s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to Android &amp; mobile engineering roles
            </p>

            <h1 className="mt-5 animate-fade-up text-4xl font-semibold leading-[1.08] tracking-tight text-foreground text-balance [animation-delay:140ms] sm:text-5xl lg:text-[3.6rem]">
              <span className="sr-only">{siteConfig.name}, {siteConfig.role}. </span>
              I build <span className="text-gradient">production Android apps</span> people
              actually use.
            </h1>

            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground [animation-delay:200ms]">
              Software Engineer with 3+ years in Kotlin. At{' '}
              <span className="font-medium text-foreground">Applab Ltd.</span> I own features end
              to end, from technical design to release, and I shipped an offline music player
              that passed <span className="font-medium text-foreground">500K+ downloads</span> on
              Google Play.
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:260ms]">
              <Button as="a" href="#projects">
                View my work
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                as="a"
                href={withBasePath(siteConfig.resumePath)}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <FileText className="h-4 w-4" aria-hidden />
                Resume
              </Button>
              <div className="ml-1 flex items-center gap-1">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-w-0 animate-fade-up [animation-delay:320ms]">
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/40 via-transparent to-secondary/30 opacity-60 blur-sm"
              aria-hidden
            />
            <CodeCard />
          </div>
        </div>

        <dl className="mt-20 grid animate-fade-up grid-cols-2 overflow-hidden rounded-2xl border border-border bg-border [animation-delay:400ms] lg:grid-cols-4 gap-px">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-card/90 px-5 py-6 backdrop-blur sm:px-6">
              <dt className="mt-2 text-[13px] leading-snug text-muted-foreground">{s.label}</dt>
              <dd className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
