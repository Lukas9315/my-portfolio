import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts, type Block } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return { title: post.title, description: post.summary };
}

function Content({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 font-medium">{block.text}</h2>;
    case "p":
      return <p className="mt-5 leading-relaxed">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed marker:text-muted">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-md border border-line bg-black/[.02] p-4 font-mono text-xs leading-relaxed dark:bg-white/[.03]">
          <code>{block.text}</code>
        </pre>
      );
  }
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="text-[0.95rem]">
      <header className="border-b border-line pb-8">
        <span className="font-mono text-xs text-muted">
          {formatDate(post.date)} · {post.readingTime}
        </span>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-balance">
          {post.title}
        </h1>
      </header>

      {post.body.map((block, index) => (
        <Content key={index} block={block} />
      ))}

      <footer className="mt-16 border-t border-line pt-8 text-sm">
        <Link href="/blog" className="text-muted hover:text-foreground">
          ← Wszystkie wpisy
        </Link>
      </footer>
    </article>
  );
}
