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

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
          <header className="flex items-center justify-between py-10 text-sm">
            <Link href="/" className="font-medium hover:opacity-60">
              {profile.name}
            </Link>
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
