import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./phase2.css";
import "./seo.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://commentharbor.com"),
  title: { default: "CommentHarbor — YouTube Comment Tools for Creators", template: "%s | CommentHarbor" },
  description: "Search, filter, export, and pick fair giveaway winners from public YouTube comments.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "CommentHarbor",
    url: "/",
    title: "CommentHarbor — YouTube Comment Tools for Creators",
    description: "Search, filter, export, and pick fair giveaway winners from public YouTube comments.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "48x48" }],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
