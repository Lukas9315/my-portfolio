import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = posts[0]?.date;

  return [
    {
      url: `${profile.siteUrl}/`,
      lastModified: newestPost,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.siteUrl}/blog/`,
      lastModified: newestPost,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${profile.siteUrl}/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
