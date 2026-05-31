// TEMPIST SYSTEMS INC. — Investor Briefing Site
// COUNSEL REVIEW REQUIRED before any public-facing deployment.
// This surface carries Reg D 506(c) raise terms, named individuals, and confidential figures.
// TODO: wire third-party accreditation verification before public deployment.

import type { Metadata } from "next";
import "./globals.css";
import { grotesk, plex, mono } from "./fonts";

export const metadata: Metadata = {
  title: "TEMPIST SYSTEMS INC. — Investor Briefing",
  description: "Controlled distribution — authorized recipients only.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  other: {
    "robots": "noindex,nofollow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${plex.variable} ${mono.variable} h-full`}
    >
      <head>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body className="min-h-full bg-ops text-classified antialiased">
        {children}
      </body>
    </html>
  );
}
