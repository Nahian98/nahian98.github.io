import { Briefcase, CheckCircle2, MapPin } from 'lucide-react';
import { Reveal, Section } from '@/components/ui';
import { experience } from '@/constants';

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      lead="Owning features from technical design to production release."
    >
      <ol className="relative space-y-8 border-l border-border pl-8 sm:pl-10">
        {experience.map((item) => (
          <Reveal as="li" key={item.id} className="relative">
            {/* Timeline node */}
            <span
              className="absolute -left-[calc(2rem+1px)] top-7 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-accent/20 ring-4 ring-background sm:-left-[calc(2.5rem+1px)]"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>

            <article className="card p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent sm:inline-flex">
                    <Briefcase className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
                    <p className="mt-0.5 text-[15px] font-medium text-accent">{item.company}</p>
                    {item.location && (
                      <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
                  {item.period.includes('Present') && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  )}
                  {item.period}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-accent/80" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {item.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
