# navin.sh

Personal website of Navin Singh. Minimal, developer-focused, built for writing and tools.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (`base-sera` style, Base UI primitives) |
| MDX | `@next/mdx` |
| Syntax highlighting | Shiki v4 |
| Fonts | Noto Sans (body), Geist Mono (code) |
| Theming | `next-themes` — light, dark, system |

The site is a fully static export. There is no server runtime, no database, and no external CMS.

## Development

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build → out/
npm run lint     # ESLint
```

## Project structure

```
app/
  layout.tsx              # Root layout — shell, metadata, fonts, GA
  page.tsx                # Homepage
  globals.css             # Tailwind theme and CSS custom properties
  sitemap.ts              # Generated sitemap — static pages, posts and tools
  robots.ts               # robots.txt — allow all, reference sitemap
  about/
    page.tsx              # /about
    _components/          # Page-scoped components
      intro-section.tsx
      experience-section.tsx
      technologies-section.tsx
      work-section.tsx
      section.tsx         # Shared labelled section wrapper
  posts/
    page.tsx              # /posts — listing
    [slug]/
      page.tsx            # /posts/[slug] — individual post
  tools/
    page.tsx              # /tools — discovery page
    [slug]/
      page.tsx            # /tools/[slug] — individual tool page

components/
  layout/
    site-header.tsx       # Sticky header with search trigger, nav, theme toggle
    site-footer.tsx       # Minimal footer
    page-container.tsx    # Centred max-width wrapper (max-w-3xl)
    mobile-nav.tsx        # Sheet-based mobile drawer
    theme-toggle.tsx      # Light / dark toggle
    nav-links.ts          # Shared navigation link definitions
  home/
    hero.tsx              # Homepage hero
  posts/
    post-list.tsx         # Ordered list of PostListItem
    post-list-item.tsx    # Title, description, date, tags + link
    post-header.tsx       # Reusable post title block
  tools/
    tool-icon.tsx         # Resolves icon string identifiers to Lucide components
    tool-card.tsx         # Tool card linking to /tools/[slug]
    tool-grid.tsx         # Responsive grid of ToolCards
    tool-browser.tsx      # Client Component — search input + category filter + grid
    category-filter.tsx   # Accessible category filter strip (client)
    tool-page-layout.tsx  # Shared server-rendered shell for every tool page
    related-tools.tsx     # Same-category related tools section
  search/
    tool-command.tsx      # Global command palette (cmdk + Base UI Dialog)
    tool-search-trigger.tsx # Header trigger + ⌘K shortcut owner (client)
  icons.tsx               # GitHubIcon, LinkedInIcon (inline SVG)
  theme-provider.tsx      # next-themes provider + keyboard shortcut
  ui/                     # shadcn/ui component library

content/
  about/
    experience.ts         # Work history data
    work.ts               # Selected work data
    technologies.ts       # Technology group data
  posts/
    *.mdx                 # Blog posts

lib/
  posts.ts                # Post types, slug discovery, getAllPosts, getPostBySlug
  tools/
    types.ts              # ToolDefinition interface, ToolCategory type
    registry.ts           # Tool registry array + getToolBySlug, getToolsByCategory, getFeaturedTools
    categories.ts         # CategoryDefinition, categories array, categoryMap
    search.ts             # searchTools() — pure TS, no dependencies
  analytics/
    index.ts              # trackEvent() abstraction + typed event definitions
  highlighter.tsx         # Shiki wrapper — codeToHtmlHighlighted()
  utils.ts                # cn() re-export

config/
  site.ts                 # siteConfig — URL, name, author, titles, social links

mdx-components.tsx        # MDX element overrides (root — required by @next/mdx)
```

## Features

### Site shell

- Sticky header with brand, desktop navigation, icon links, and theme toggle
- **Search trigger** in the header — desktop pill with `⌘K` hint, compact icon button on mobile
- Mobile navigation drawer (sheet) with active route awareness
- Shared `PageContainer` for consistent horizontal padding and max-width
- Minimal footer with copyright and social links
- Keyboard shortcut `D` to toggle between light and dark themes

### Homepage

- Minimal hero — eyebrow, heading, supporting text, and a CTA link to `/about`
- Content sits slightly above vertical centre on desktop
- No animations, no gradients, no profile photo

### About page (`/about`)

Sections driven entirely by data files in `content/about/`:

- **Introduction** — name, role, bio, GitHub and LinkedIn links
- **Experience** — role, company, date range, description, highlights, technologies
- **Selected Work** — title, description, tags, optional external link
- **Technologies** — grouped by Frontend / Backend / Platform & Infrastructure

To update any section, edit the corresponding file in `content/about/` — no component changes needed.

### Blog (`/posts`)

Local MDX blog with no external CMS.

- **Listing page** at `/posts` — sorted newest first
- **Post pages** at `/posts/[slug]` — statically generated at build time
- Metadata (`title`, `description`, `publishedAt`, `tags`) exported directly from each MDX file
- Slug derived from filename — no registry to maintain
- Syntax highlighting via Shiki with `github-light` / `github-dark` dual-theme output, switching automatically with the site theme
- Full MDX element styling: headings, paragraphs, links, lists, blockquotes, inline code, code blocks, tables, horizontal rules

#### Writing a post

1. Create `content/posts/my-post-slug.mdx`
2. Export metadata at the top of the file:

```mdx
export const metadata = {
  title: "Post title",
  description: "A short description.",
  publishedAt: "2025-06-01",
  tags: ["Next.js", "TypeScript"],
}

Post content starts here...
```

That's it. The post appears in the listing and gets its own static route automatically.

#### Supported languages for syntax highlighting

`bash` · `css` · `diff` · `html` · `javascript` / `js` · `json` · `jsx` · `markdown` · `python` · `sql` · `tsx` · `typescript` / `ts` · `yaml`

### Tools (`/tools`)

Browser-based utility tools. All processing happens client-side — no data is sent to a server.

#### Tool registry (`lib/tools/`)

The registry is the single source of truth for every tool. It is pure TypeScript data with no React or Lucide imports.

- **`types.ts`** — `ToolDefinition` interface and `ToolCategory` union type
- **`registry.ts`** — array of all registered tools plus three helpers:
  - `getToolBySlug(slug)` — returns a single tool or `undefined`
  - `getToolsByCategory(category)` — returns all tools in a category
  - `getFeaturedTools()` — returns tools marked `featured: true`
- **`categories.ts`** — `CategoryDefinition` metadata (id, name, description), an ordered `categories` array, and a `categoryMap` for O(1) lookups
- **`search.ts`** — `searchTools(tools, query)`: case-insensitive, whitespace-tolerant substring search across name, shortDescription, keywords and category; returns all tools on an empty query

`icon` on each `ToolDefinition` is stored as a Lucide icon name string. The component that resolves it to a React element lives in `components/tools/tool-icon.tsx`, keeping the registry free of any UI dependency.

#### Registered tools

| Tool | Category | Featured |
| --- | --- | --- |
| JSON Formatter | Developer | ✓ |
| JSON to TypeScript | Developer | ✓ |
| JWT Decoder | Developer | ✓ |
| Timestamp Converter | Developer | ✓ |
| Base64 Encoder / Decoder | Developer | |
| URL Encoder / Decoder | Developer | |
| Merge PDFs | Files | ✓ |
| Split PDF | Files | |
| Image Compressor | Image | ✓ |
| Unit Converter | Everyday | ✓ |
| QR Code Generator | Everyday | ✓ |
| CSS Unit Converter | Frontend | |

#### Discovery page (`/tools`)

- Full tool listing with `"Tools"` heading and privacy note
- **Search input** — filters by name, description, keywords and category as you type; clear button appears when active
- **Category filter** — compact button strip; only shows categories that have at least one registered tool; works in combination with the search query
- Responsive `ToolGrid` — 1 / 2 / 3 columns at small / medium / large breakpoints
- Empty state with a "Clear search and filters" action when no tools match
- Full tool list is present in the initial static HTML — filtering is a progressive enhancement, not required for discoverability

#### Individual tool pages (`/tools/[slug]`)

Static pages generated at build time via `generateStaticParams()` for every registered tool.

Each page shares a common server-rendered shell (`ToolPageLayout`) containing:

- **Breadcrumb** — `Tools / Category / Tool Name` with a link back to `/tools`
- **Tool header** — icon, `<h1>` tool name, short description, and a "Runs locally" privacy indicator
- **Tool content area** — a wider breakout zone (up to `max-w-5xl`) for the interactive UI, so multi-panel tools (editor + output, before/after previews) have room beyond the site's standard reading width
- **About section** — longer tool description from the registry, constrained to `max-w-prose` for readability
- **Related tools** — up to 3 other tools from the same category, rendered as `ToolCard` links

Per-page metadata is generated statically from the registry (`generateMetadata`):
- `title` uses the root layout's `"%s · navin.sh"` template
- `description` comes from `ToolDefinition.description`
- `alternates.canonical` is set to `https://navin.sh/tools/[slug]`
- Open Graph title and description are set explicitly per tool

Individual tool implementations (the interactive UI rendered inside the content area) are added incrementally. Until a tool is implemented, a placeholder is shown. The page shell, metadata, breadcrumb, about section, and related tools are all fully functional from day one.

#### Adding a new tool

1. Add a `ToolDefinition` entry to the `tools` array in `lib/tools/registry.ts`
2. Add the corresponding Lucide icon import to `components/tools/tool-icon.tsx` if not already present
3. Create the interactive implementation as a Client Component and mount it as `children` inside `app/tools/[slug]/page.tsx`

Steps 1 and 2 alone are enough to make the tool discoverable — it appears in `/tools`, the command palette, and search results immediately.

#### Global command palette

- Opens with `⌘K` (macOS) or `Ctrl+K` (Windows / Linux), or by clicking the search trigger in the header
- Search across all registered tools by name, description, category and keywords
- Keyboard navigation with arrow keys, Enter to navigate to the tool, Escape to close
- Powered by `cmdk` for fuzzy filtering, Base UI Dialog for the modal shell

### SEO

- `metadataBase` set to `https://navin.sh` in the root layout — all relative canonical URLs are resolved correctly
- Root `title` template: `%s | navin.sh` — per-page titles use the segment before the pipe
- Every public page has a unique `title`, `description`, and `alternates.canonical`
- Post pages set `openGraph.type: "article"` and `publishedTime`
- Tool pages set per-tool Open Graph `title` and `description`
- All page content (tools, posts, descriptions) is present in static HTML — not gated behind JavaScript
- Sitemap at `/sitemap.xml` lists all static pages, posts and tools — generated at build time
- `robots.txt` at `/robots.txt` allows all crawlers and references the sitemap

### Infrastructure

#### Site configuration (`config/site.ts`)

Single source of truth for site-wide constants: URL, name, author, title defaults, and social links. All pages and components import from here rather than hardcoding strings.

#### Google Analytics 4

GA loads via `@next/third-parties/google` in the root layout, **only when** `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. If the variable is absent the script is never included.

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`@next/third-parties` handles page-view tracking automatically with Next.js App Router navigation. Do not implement a competing page-view system.

#### Analytics abstraction (`lib/analytics/`)

Application components call `trackEvent(event)` from `lib/analytics` rather than `window.gtag` directly. Events are strongly typed — adding a new event type requires updating the union in `lib/analytics/index.ts`.

Currently instrumented events:

| Event | Where | Description |
| --- | --- | --- |
| `tool_search` | ToolBrowser | Fired 600 ms after the user stops typing a non-empty query |
| `tool_open` | ToolCommand | Fired when a tool is selected from the command palette |
| `command_palette_open` | ToolSearchTrigger | Fired when the palette opens, with `trigger: "keyboard_shortcut"` or `"button"` |

**Never send user content to analytics.** Tool input, file names, JWT values, and generated output must remain local to the browser.

## Code style

- Prettier with `prettier-plugin-tailwindcss` — 2 spaces, no semicolons, double quotes, LF line endings
- ESLint via `eslint-config-next` core-web-vitals and TypeScript rules
- Server Components by default — `"use client"` only where genuinely required (filter state, keyboard shortcuts, command palette)
- Content and presentation kept separate — data files in `content/` and `lib/`, components in `components/` and `app/`
- Tool registry (`lib/tools/`) has no React or Lucide imports — pure TypeScript data that any layer can consume
- `config/site.ts` is the single source of truth for the site URL, name, and social links — never hardcode `https://navin.sh` elsewhere
