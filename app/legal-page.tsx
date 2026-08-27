import type { ReactNode } from "react";
import Link from "next/link";

export function LegalPage({ eyebrow, title, updated = "August 27, 2026", children }: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return <main className="legal-shell">
    <header><Link className="brand" href="/"><b>CH</b>CommentHarbor</Link><nav><Link href="/">Back to the tool</Link></nav></header>
    <article className="legal-page">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="legal-updated">Last updated {updated}</p>
      {children}
    </article>
    <footer><Link href="/">CommentHarbor</Link><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/giveaway-disclaimer">Giveaway disclaimer</Link></span></footer>
  </main>;
}
