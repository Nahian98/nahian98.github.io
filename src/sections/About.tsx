import { Section } from '@/components/ui';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-2xl space-y-4 text-[15px] leading-7 text-muted-foreground">
        <p>
          Most of my work is in layered Android architecture: Clean Architecture,
          MVVM and MVI, built on Kotlin Coroutines and Flow, with the business
          logic kept in plain, testable code. I am comfortable picking up an
          existing codebase, tracing a bug across the UI, data and network layers,
          and fixing the root cause.
        </p>
        <p>
          A lot of what I build is integration work: REST APIs, cloud storage SDKs
          such as Google Drive, OneDrive and Dropbox, WebSockets and embedded HTTP
          servers, plus media playback that has to keep running outside the
          app&apos;s foreground lifecycle.
        </p>
      </div>
    </Section>
  );
}
