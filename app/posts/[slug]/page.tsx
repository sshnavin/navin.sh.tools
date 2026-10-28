import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { postSlugs, getPostBySlug } from "@/lib/posts"
import { PostHeader } from "@/components/posts/post-header"
import { useMDXComponents } from "@/mdx-components"

// ---------------------------------------------------------------------------
// Static params — one route per registered post, required for output: 'export'
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }))
}

// ---------------------------------------------------------------------------
// Per-page metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const mod = await getPostBySlug(slug)
  if (!mod) return {}

  const { title, description, publishedAt } = mod.metadata
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: publishedAt,
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mod = await getPostBySlug(slug)

  if (!mod) notFound()

  const { default: MDXContent, metadata } = mod

  return (
    <article className="mx-auto max-w-2xl">
      <PostHeader metadata={metadata} />
      <div className="border-t border-border pb-16 pt-8">
        <MDXContent />
      </div>
    </article>
  )
}
