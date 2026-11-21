import { Section } from '@/components/ui';
import { education } from '@/constants';

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="space-y-6">
        {education.map((item) => (
          <li key={item.school}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-base font-semibold text-foreground">{item.school}</h3>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {item.period}
              </span>
            </div>
            <p className="mt-0.5 text-[15px] text-muted-foreground">
              {item.degree}
              {item.location && <> · {item.location}</>}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
