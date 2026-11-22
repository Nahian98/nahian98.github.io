import { ArrowUpRight, Github, Play, Terminal } from 'lucide-react';
import { Reveal, Section } from '@/components/ui';
import { projects } from '@/constants';
import { ProjectImage } from '@/components/project/ProjectImage';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

function ProjectLinks({ links }: { links: Project['links'] }) {
  const items = [
    links.playStore && { label: 'Google Play', href: links.playStore, icon: Play, primary: true },
    links.github && { label: 'Source code', href: links.github, icon: Github, primary: !links.playStore },
    links.demo && { label: 'Live demo', href: links.demo, icon: ArrowUpRight, primary: false },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Play; primary: boolean }[];

  if (items.length === 0) return null;

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {items.map(({ label, href, icon: Icon, primary }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group/link inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-all hover:-translate-y-0.5',
            primary
              ? 'bg-foreground text-background hover:bg-foreground/90'
              : 'border border-border bg-surface text-foreground hover:border-border-strong',
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
          <ArrowUpRight
            className="h-3.5 w-3.5 opacity-60 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            aria-hidden
          />
        </a>
      ))}
    </div>
  );
}

/** Placeholder visual for projects without screenshots. */
function TerminalVisual() {
  const rows = [
    ['$', 'transport --compare'],
    ['✓', 'Socket-level HTTP server'],
    ['✓', 'NanoHTTPD'],
    ['✓', 'Embedded Ktor (Netty)'],
    ['✓', 'WebSockets'],
    ['✓', 'FTPS'],
    ['→', 'Local-Only Hotspot · Wi-Fi Direct · QR pairing'],
  ];
  return (
    <div aria-hidden className="flex h-full min-h-[240px] flex-col overflow-hidden rounded-xl border border-border bg-background/80">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <Terminal className="h-3.5 w-3.5" /> file-server
      </div>
      <div className="flex-1 space-y-2 p-5 font-mono text-[12.5px] leading-5">
        {rows.map(([sym, text], i) => (
          <p key={i} className="flex gap-3">
            <span className={sym === '$' ? 'text-secondary' : 'text-accent'}>{sym}</span>
            <span className={i === 0 ? 'text-foreground' : 'text-muted-foreground'}>{text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      title="Projects"
      lead="Selected work, from a 500K+ download app to open-source architecture."
    >
      <ul className="space-y-8">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal as="li" key={project.id}>
              <article className="card group relative overflow-hidden p-5 transition-colors hover:border-border-strong sm:p-8">
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div
                  className={cn(
                    'relative grid gap-8 lg:items-center lg:gap-10',
                    flip ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]',
                    flip && 'lg:[&>*:first-child]:order-2',
                  )}
                >
                  <div>
                    {project.image ? (
                      <ProjectImage src={project.image} alt={project.imageAlt ?? project.title} />
                    ) : (
                      <TerminalVisual />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {project.metric && (
                        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                          {project.metric}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                      {project.description}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tech.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <ProjectLinks links={project.links} />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
