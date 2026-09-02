import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const title = `${profile.name} — ${profile.role}`;
const description = profile.intro.join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  alternates: { canonical: "./" },
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "./",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
          <header className="py-10 text-sm">
            <nav className="flex gap-6 text-muted">
              <Link href="/" className="hover:text-foreground">
                O mnie
              </Link>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
              <a
                href={profile.github}
                className="hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>
          </header>

          <main className="flex-1 pb-24">{children}</main>

          <footer className="border-t border-line py-8 text-sm text-muted">
            {profile.location} · {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}
