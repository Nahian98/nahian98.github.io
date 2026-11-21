import { Section } from '@/components/ui';
import { skillGroups } from '@/constants';

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.label} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-sm font-medium text-foreground">{group.label}</dt>
            <dd className="text-[15px] leading-7 text-muted-foreground">
              {group.items.join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
