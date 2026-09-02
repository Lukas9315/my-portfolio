import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notatki o Reakcie, zarządzaniu stanem i tym, co działa w praktyce.",
};

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Blog</h1>
      <p className="mt-2 text-muted">
        Krótkie notatki o Reakcie i zarządzaniu stanem.
      </p>

      <ul className="mt-12 divide-y divide-line border-t border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block py-8">
              <span className="font-mono text-xs text-muted">
                {formatDate(post.date)} · {post.readingTime}
              </span>
              <h2 className="mt-2 font-medium underline decoration-line underline-offset-4 group-hover:decoration-foreground">
                {post.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {post.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
