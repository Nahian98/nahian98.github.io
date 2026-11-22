import { Boxes, Code2, Database, FlaskConical, Network, Smartphone, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal, Section } from '@/components/ui';
import { skillGroups } from '@/constants';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  Languages: Code2,
  Architecture: Boxes,
  'Concurrency & Data': Database,
  Networking: Network,
  Platform: Smartphone,
  Testing: FlaskConical,
  Tooling: Wrench,
};

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      lead="The toolkit I reach for to ship and maintain Android apps."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.label] ?? Code2;
          return (
            <Reveal
              as="li"
              key={group.label}
              delay={(i % 3) * 80}
              className={cn(
                'card p-6 transition-colors hover:border-accent/40',
                // Let a lone last card span the row instead of leaving a gap.
                i === skillGroups.length - 1 && skillGroups.length % 2 === 1 && 'sm:col-span-2',
                i === skillGroups.length - 1 && skillGroups.length % 3 === 1 && 'lg:col-span-3',
                i === skillGroups.length - 1 && skillGroups.length % 3 !== 1 && 'lg:col-span-1',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h3 className="text-[15px] font-semibold text-foreground">{group.label}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-[13px] text-foreground/85 transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
