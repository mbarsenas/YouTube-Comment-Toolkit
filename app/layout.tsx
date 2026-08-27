import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./phase2.css";
export const metadata: Metadata = { title: "CommentHarbor", description: "Explore public video comments and select fair giveaway winners.", icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
