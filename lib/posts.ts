import { readdirSync } from "fs"
import { join } from "path"

// ---------------------------------------------------------------------------
// Post types
// ---------------------------------------------------------------------------

export interface PostMetadata {
  title: string
  description: string
  publishedAt: string // ISO date string: "YYYY-MM-DD"
  tags: string[]
}

export interface PostEntry {
  slug: string
  metadata: PostMetadata
}

export type MDXModule = {
  metadata: PostMetadata
  default: React.ComponentType
}

// ---------------------------------------------------------------------------
// Slug discovery
//
// readdirSync runs only at build time — in a static export there is no
// server runtime, so this never executes in response to a request.
// Dropping a new .mdx file into content/posts/ is all that is needed.
// ---------------------------------------------------------------------------

const POSTS_DIR = join(process.cwd(), "content", "posts")

export const postSlugs: string[] = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
  .map((f) => f.replace(/\.mdx?$/, ""))

// ---------------------------------------------------------------------------
// Module loader
//
// The static prefix "@/content/posts/" lets webpack discover and bundle every
// file in the directory at build time. The variable suffix is bounded by
// postSlugs, so all reachable modules are included in the build graph.
// ---------------------------------------------------------------------------

function loadPost(slug: string): Promise<MDXModule> {
  return import(`@/content/posts/${slug}.mdx`)
}

// ---------------------------------------------------------------------------
// Registry API
// ---------------------------------------------------------------------------

/**
 * Returns metadata for all posts, sorted newest first.
 */
export async function getAllPosts(): Promise<PostEntry[]> {
  const entries = await Promise.all(
    postSlugs.map(async (slug) => {
      const mod = await loadPost(slug)
      return { slug, metadata: mod.metadata }
    })
  )

  return entries.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )
}

/**
 * Returns the MDX module for a given slug, or null if the slug is not a
 * known post. The caller is responsible for calling notFound() on null.
 */
export async function getPostBySlug(slug: string): Promise<MDXModule | null> {
  if (!postSlugs.includes(slug)) return null
  return loadPost(slug)
}
