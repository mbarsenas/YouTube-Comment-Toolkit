import type { ReactNode } from "react";

export function LegalPage({ eyebrow, title, updated = "August 27, 2026", children }: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return <main className="legal-shell">
    <header><a className="brand" href="/"><b>CH</b>CommentHarbor</a><nav><a href="/">Back to the tool</a></nav></header>
    <article className="legal-page">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="legal-updated">Last updated {updated}</p>
      {children}
    </article>
    <footer><a href="/">CommentHarbor</a><span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/giveaway-disclaimer">Giveaway disclaimer</a></span></footer>
  </main>;
}
