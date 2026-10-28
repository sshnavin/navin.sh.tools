import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { tools, getToolBySlug } from "@/lib/tools/registry"
import { ToolPageLayout } from "@/components/tools/tool-page-layout"

// ---------------------------------------------------------------------------
// Static params
//
// Generates one static page per registered tool at build time.
// Required for output: 'export' — no runtime param resolution.
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

// ---------------------------------------------------------------------------
// Per-page metadata
//
// Title feeds into the root layout's template "%s · navin.sh", producing:
//   "JSON Formatter · navin.sh"
//
// Open Graph title and description are set explicitly because the root
// layout's OG defaults are site-level and would not reflect tool-specific
// content otherwise.
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) return {}

  const url = `https://navin.sh/tools/${tool.slug}`

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url,
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) notFound()

  return (
    <ToolPageLayout tool={tool}>
      {/*
       * Placeholder — replaced with the actual interactive Client Component
       * when each tool is implemented. The shell, header, about section and
       * related tools are already server-rendered around this slot.
       */}
      <div className="flex min-h-48 items-center justify-center rounded-sm border border-dashed border-border">
        <p className="text-sm text-muted-foreground">
          Tool interface coming soon.
        </p>
      </div>
    </ToolPageLayout>
  )
}
