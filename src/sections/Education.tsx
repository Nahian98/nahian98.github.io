import { GraduationCap, MapPin } from 'lucide-react';
import { Reveal, Section } from '@/components/ui';
import { education } from '@/constants';

export function Education() {
  return (
    <Section id="education" index="05" title="Education" lead="Computer Science foundations.">
      <ul className="grid gap-4">
        {education.map((item) => (
          <Reveal as="li" key={item.school} className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
              <GraduationCap className="h-7 w-7" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
              <p className="mt-1 text-[15px] text-muted-foreground">{item.school}</p>
              {item.location && (
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {item.location}
                </p>
              )}
            </div>
            <span className="w-fit shrink-0 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
              {item.period}
            </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
