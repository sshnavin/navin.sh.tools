import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { postSlugs, getAllPosts } from "@/lib/posts"
import { tools } from "@/lib/tools/registry"

// ---------------------------------------------------------------------------
// Sitemap
//
// Statically generated at build time — compatible with output: 'export'.
// Sources of truth:
//   - Static pages: hardcoded (small, stable set)
//   - Posts: derived from postSlugs + MDX metadata (publishedAt for lastModified)
//   - Tools: derived from the tool registry
// ---------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url

  // -------------------------------------------------------------------------
  // Static pages
  // -------------------------------------------------------------------------
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/posts`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/tools`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // -------------------------------------------------------------------------
  // Posts — use publishedAt as lastModified where available
  // -------------------------------------------------------------------------
  const posts = await getAllPosts()
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  // -------------------------------------------------------------------------
  // Tools — registry is the source of truth
  // -------------------------------------------------------------------------
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    changeFrequency: "monthly",
    priority: tool.featured ? 0.8 : 0.6,
  }))

  return [...staticPages, ...postPages, ...toolPages]
}
