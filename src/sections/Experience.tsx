import { Section } from '@/components/ui';
import { experience } from '@/constants';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-12">
        {experience.map((item) => (
          <li key={item.id}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-base font-semibold text-foreground">
                {item.role}
                <span className="font-normal text-muted-foreground"> · {item.company}</span>
              </h3>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {item.period}
              </span>
            </div>
            {item.location && (
              <p className="mt-0.5 text-sm text-muted-foreground">{item.location}</p>
            )}

            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground marker:text-border-strong">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-muted-foreground">
              <span className="sr-only">Technologies: </span>
              {item.tech.join(' · ')}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
