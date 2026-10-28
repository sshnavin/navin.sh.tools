// ---------------------------------------------------------------------------
// Tool implementations map
//
// Maps tool slugs to their interactive React components.
//
// Rules:
//   - Only add a slug here when the tool is actually implemented.
//   - Unregistered slugs fall through to the "coming soon" placeholder in
//     the dynamic route — no dummy components needed.
//   - All interactive tool components must be Client Components ("use client").
//   - The page shell (app/tools/[slug]/page.tsx) remains a Server Component.
// ---------------------------------------------------------------------------

import { JsonFormatter } from "@/components/tools/json-formatter/json-formatter"

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/**
 * Map of tool slugs to their interactive implementation components.
 *
 * When a slug is present here the dynamic tool route renders the component.
 * When absent it renders the "Tool interface coming soon." placeholder.
 */
export const toolImplementations: Record<
  string,
  React.ComponentType
> = {
  "json-formatter": JsonFormatter,
}
