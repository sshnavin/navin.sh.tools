import Link from "next/link"
import { cn } from "cn"
import { ToolIcon } from "@/components/tools/tool-icon"
import type { ToolDefinition } from "@/lib/tools/types"

// ---------------------------------------------------------------------------
// ToolCard
// ---------------------------------------------------------------------------

interface ToolCardProps {
  tool: ToolDefinition
  className?: string
}

/**
 * A restrained card linking to a tool's dedicated page.
 * Accepts a ToolDefinition directly — no registry lookups inside.
 */
function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={`/tools/${tool.slug}`}
        className={cn(
          // Layout
          "flex flex-col gap-3 p-4",
          // Border & radius — matches the site's rounded-none aesthetic but
          // with a slight radius so cards are readable against each other.
          "rounded-sm border border-border",
          // Backgrounds
          "bg-background transition-colors",
          // Hover — subtle muted tint, no shadow, no scale
          "hover:bg-muted/60",
          // Focus ring — consistent with rest of site
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        )}
      >
        {/* Icon */}
        <div className="text-muted-foreground transition-colors group-hover:text-foreground">
          <ToolIcon name={tool.icon} />
        </div>

        {/* Name + short description */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-snug text-foreground">
            {tool.name}
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {tool.shortDescription}
          </p>
        </div>
      </Link>
    </article>
  )
}

export { ToolCard }
