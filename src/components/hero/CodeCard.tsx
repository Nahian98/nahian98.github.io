import type { ReactNode } from 'react';

/* Tiny hand-rolled Kotlin highlighting: no syntax-highlighter dependency. */
const K = ({ children }: { children: ReactNode }) => <span className="text-[#C792EA]">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="text-[#82AAFF]">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span className="text-[#FFCB6B]">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-muted-foreground/70 italic">{children}</span>;

const lines: ReactNode[] = [
  <C key="c">{'// Developer.kt'}</C>,
  <>
    <K>data class</K> <T>Developer</T>(
  </>,
  <>
    {'  '}<K>val</K> name: <T>String</T> = <S>&quot;Nahian Kanon&quot;</S>,
  </>,
  <>
    {'  '}<K>val</K> role: <T>String</T> = <S>&quot;Android Engineer&quot;</S>,
  </>,
  <>
    {'  '}<K>val</K> experience: <T>String</T> = <S>&quot;3+ years&quot;</S>,
  </>,
  <>
    {'  '}<K>val</K> base: <T>String</T> = <S>&quot;Dhaka, BD&quot;</S>,
  </>,
  <>)</>,
  <>&nbsp;</>,
  <>
    <K>val</K> stack = <F>listOf</F>(
  </>,
  <>
    {'  '}<S>&quot;Kotlin&quot;</S>, <S>&quot;Compose&quot;</S>, <S>&quot;Coroutines&quot;</S>,
  </>,
  <>
    {'  '}<S>&quot;Flow&quot;</S>, <S>&quot;Media3&quot;</S>, <S>&quot;Ktor&quot;</S>,
  </>,
  <>)</>,
  <>&nbsp;</>,
  <>
    <K>fun</K> <T>Developer</T>.<F>status</F>() = <F>flowOf</F>(
  </>,
  <>
    {'  '}<S>&quot;Open to new roles&quot;</S>
    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" aria-hidden />
  </>,
  <>)</>,
];

/** Decorative editor window in the hero. Hidden from assistive tech. */
export function CodeCard() {
  return (
    <div
      aria-hidden
      // `dark` re-scopes the theme tokens so the editor stays dark in light mode.
      className="dark relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl shadow-black/30 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          Developer.kt
        </span>
      </div>
      <pre className="overflow-x-auto px-0 py-4 font-mono text-[12.5px] leading-6 text-foreground/90 sm:text-[13px]">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-10 shrink-0 select-none pr-4 text-right text-muted-foreground/40">
                {i + 1}
              </span>
              <span className="whitespace-pre pr-4">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
