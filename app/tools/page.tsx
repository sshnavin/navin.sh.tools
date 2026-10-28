import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { tools } from "@/lib/tools/registry"
import { categories } from "@/lib/tools/categories"
import type { ToolCategory } from "@/lib/tools/types"
import { ToolBrowser } from "@/components/tools/tool-browser"

// ---------------------------------------------------------------------------
// Static metadata
//
// The title uses the root layout's template ("%s · navin.sh"), so the
// rendered <title> will be:
//   "Free Online Tools for Developers & Everyday Tasks · navin.sh"
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Free Online Tools for Developers & Everyday Tasks",
  description:
    "Free browser-based tools for developers and everyday tasks. Format JSON, convert units, work with PDFs, compress images and more. Fast, private and processed locally.",
  alternates: {
    canonical: "https://navin.sh/tools",
  },
}

// ---------------------------------------------------------------------------
// Helpers
//
// Derive populated categories at build time so ToolBrowser never needs to
// reach into the registry itself.
// ---------------------------------------------------------------------------

/** Set of category ids that have at least one registered tool. */
const populatedCategoryIds = new Set<ToolCategory>(tools.map((t) => t.category))

/** Ordered list of categories that have at least one tool. */
const populatedCategories = categories.filter((c) =>
  populatedCategoryIds.has(c.id)
)

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ToolsPage() {
  return (
    <div className="py-8 sm:py-12">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}
      <header className="mb-10">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Tools
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Fast, useful tools that run directly in your browser.
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground/70">
          <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0" />
          Your data stays on your device.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Tool browser (filter + grid)                                        */}
      {/* ------------------------------------------------------------------ */}
      <ToolBrowser tools={tools} categories={populatedCategories} />
    </div>
  )
}
