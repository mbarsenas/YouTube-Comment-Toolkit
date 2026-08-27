import type { ReactNode } from "react";
import Link from "next/link";

export type SeoPage = {
  path: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  cta: string;
  benefits: { title: string; copy: string }[];
  steps: { title: string; copy: string }[];
  details: ReactNode;
};

const tools = [
  ["YouTube comment picker", "/youtube-comment-picker"],
  ["YouTube giveaway picker", "/youtube-giveaway-picker"],
  ["YouTube comment exporter", "/youtube-comment-exporter"],
  ["YouTube comment search", "/youtube-comment-search"],
];

export function SeoLanding({ page }: { page: SeoPage }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CommentHarbor",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `https://commentharbor.com${page.path}`,
    description: page.intro,
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free plan" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Lifetime Pro access" },
    ],
  };

  return <main className="seo-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll("<", "\\u003c") }} />
    <header><Link className="brand" href="/"><b>CH</b>CommentHarbor</Link><nav><a href="#how">How it works</a><Link href="/#pricing">Pricing</Link><Link className="seo-nav-cta" href="/#tool">Open the tool</Link></nav></header>
    <section className="seo-hero">
      <span className="eyebrow">● &nbsp; {page.eyebrow}</span>
      <h1>{page.title}<br/><em>{page.accent}</em></h1>
      <p>{page.intro}</p>
      <form className="import" action="/" method="get">
        <i>CH</i><input aria-label="YouTube video URL" name="video" type="url" required placeholder="Paste a YouTube video URL"/><button type="submit">{page.cta} →</button>
      </form>
      <div className="trust"><span>✓ First 100 comments free</span><span>✓ No sign-up required</span><span>✓ Comments aren’t stored</span></div>
    </section>
    <section className="seo-benefits">
      {page.benefits.map((benefit, index)=><div className="seo-card" key={benefit.title}><span>0{index+1}</span><h2>{benefit.title}</h2><p>{benefit.copy}</p></div>)}
    </section>
    <section className="seo-how" id="how">
      <div><span className="label">HOW IT WORKS</span><h2>From video URL to useful result in minutes.</h2><p>{page.details}</p><Link className="seo-primary" href="/#tool">Try CommentHarbor free →</Link></div>
      <ol>{page.steps.map((step,index)=><li key={step.title}><b>{index+1}</b><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
    </section>
    <section className="seo-tool-links"><span className="label">MORE CREATOR TOOLS</span><h2>Do more with your YouTube comments.</h2><div>{tools.filter(([,path])=>path!==page.path).map(([name,path])=><Link href={path} key={path}>{name}<span>→</span></Link>)}</div></section>
    <section className="seo-final"><h2>Turn your next comment section into a clear next step.</h2><p>Start with 100 comments free, then unlock up to 1,000 comments, exports, and advanced giveaway tools for $19 lifetime access.</p><Link className="seo-primary" href="/#tool">Open CommentHarbor →</Link></section>
    <footer><Link className="brand" href="/"><b>CH</b>CommentHarbor</Link><p>Built for creators who value their audience.</p><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/giveaway-disclaimer">Giveaway disclaimer</Link></span></footer>
  </main>;
}
