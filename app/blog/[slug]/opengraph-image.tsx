import { ImageResponse } from "next/og";
import { getPost, posts } from "@/content/posts";
import { profile } from "@/content/profile";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fdfdfc",
          color: "#18181b",
          padding: "96px",
        }}
      >
        <div style={{ fontSize: 30, color: "#71717a" }}>
          {profile.siteUrl.replace("https://", "")}
        </div>
        <div style={{ fontSize: 68, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
          {post?.title ?? "Blog"}
        </div>
        <div style={{ fontSize: 30, color: "#71717a" }}>
          {`${profile.name} · ${post?.readingTime ?? ""}`}
        </div>
      </div>
    ),
    size,
  );
}
