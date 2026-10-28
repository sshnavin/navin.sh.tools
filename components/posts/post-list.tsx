import { PostListItem } from "@/components/posts/post-list-item"
import type { PostEntry } from "@/lib/posts"

interface PostListProps {
  posts: PostEntry[]
}

function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="py-4 text-sm text-muted-foreground">
        No posts yet.
      </p>
    )
  }

  return (
    <ol className="divide-y divide-border">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ol>
  )
}

export { PostList }
