import { format, parseISO } from "date-fns"
import type { PostMetadata } from "@/lib/posts"

interface PostHeaderProps {
  metadata: PostMetadata
}

function PostHeader({ metadata }: PostHeaderProps) {
  const { title, description, publishedAt, tags } = metadata

  return (
    <header className="pb-8 pt-8 sm:pt-12">
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

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>

      {description && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:text-base">
          {description}
        </p>
      )}
    </header>
  )
}

export { PostHeader }
