import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/posts"
import { PostList } from "@/components/posts/post-list"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on frontend engineering, architecture and things I learn along the way.",
  alternates: {
    canonical: `${siteConfig.url}/posts`,
  },
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="py-8 sm:py-12">
      <header className="mb-10">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Writing
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Notes on frontend engineering, architecture and things I learn along
          the way.
        </p>
      </header>

      <PostList posts={posts} />
    </div>
  )
}
