import type { Metadata } from "next";
import "./globals.css";
import "./phase2.css";
export const metadata: Metadata = { title: "YouTube Comment Toolkit", description: "Explore YouTube comments and select fair giveaway winners.", icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
