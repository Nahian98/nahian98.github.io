import { Layers, PlayCircle, Plug, ShieldCheck } from 'lucide-react';
import { Reveal, Section } from '@/components/ui';

const focus = [
  {
    icon: Layers,
    title: 'Layered architecture',
    body: 'Clean Architecture, MVVM and MVI on Coroutines and Flow, with business logic in plain, testable Kotlin.',
  },
  {
    icon: Plug,
    title: 'Integrations',
    body: 'REST APIs, Google Drive, OneDrive and Dropbox SDKs, WebSockets and embedded HTTP servers.',
  },
  {
    icon: PlayCircle,
    title: 'Media & background work',
    body: 'Media3 / ExoPlayer playback that keeps running outside the foreground lifecycle.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality',
    body: 'Unit and instrumented tests, code review, and root-cause debugging across UI, data and network.',
  },
];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      title="About"
      lead="Clean layers, tested logic, and apps that keep working in production."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
        <Reveal className="space-y-5 text-[16px] leading-8 text-muted-foreground">
          <p>
            Most of my work is in layered Android architecture: Clean Architecture, MVVM and
            MVI, built on Kotlin Coroutines and Flow, with the business logic kept in plain,
            testable code. I am comfortable picking up an existing codebase, tracing a bug
            across the UI, data and network layers, and fixing the root cause.
          </p>
          <p>
            A lot of what I build is integration work: REST APIs, cloud storage SDKs such as
            Google Drive, OneDrive and Dropbox, WebSockets and embedded HTTP servers, plus media
            playback that has to keep running outside the app&apos;s foreground lifecycle.
          </p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {focus.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 80}
              className="card group p-5 transition-colors hover:border-accent/40 hover:bg-card-hover"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
