import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui';
import { projects } from '@/constants';
import { ProjectImage } from '@/components/project/ProjectImage';
import type { Project } from '@/types';

function ProjectLinks({ links }: { links: Project['links'] }) {
  const items = [
    links.playStore && { label: 'Google Play', href: links.playStore },
    links.github && { label: 'Source code', href: links.github },
    links.demo && { label: 'Demo', href: links.demo },
  ].filter(Boolean) as { label: string; href: string }[];

  if (items.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
      {items.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {label}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="space-y-14">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="grid gap-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              {project.image ? (
                <ProjectImage src={project.image} alt={project.imageAlt ?? project.title} />
              ) : (
                <div className="hidden sm:block" aria-hidden />
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                  {project.metric && (
                    <span className="text-sm text-muted-foreground">{project.metric}</span>
                  )}
                </div>

                <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-muted-foreground marker:text-border-strong">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="sr-only">Technologies: </span>
                  {project.tech.join(' · ')}
                </p>

                <ProjectLinks links={project.links} />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
