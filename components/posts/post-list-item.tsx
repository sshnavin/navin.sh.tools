import Link from "next/link"
import { format, parseISO } from "date-fns"
import type { PostEntry } from "@/lib/posts"

interface PostListItemProps {
  post: PostEntry
}

function PostListItem({ post }: PostListItemProps) {
  const { slug, metadata } = post
  const { title, description, publishedAt, tags } = metadata

  return (
    <li className="py-6 first:pt-0 last:pb-0">
      <Link
        href={`/posts/${slug}`}
        className="group block"
      >
        {/* Date + tags row */}
        <div className="flex items-center gap-3">
          <time
            dateTime={publishedAt}
            className="font-mono text-xs tabular-nums text-muted-foreground"
          >
            {format(parseISO(publishedAt), "d MMM yyyy")}
          </time>
          {tags.length > 0 && (
            <>
              <span className="text-border" aria-hidden="true">·</span>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <p className="mt-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-foreground/70">
          {title}
        </p>

        {/* Description */}
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-foreground/60">
            {description}
          </p>
        )}
      </Link>
    </li>
  )
}

export { PostListItem }
