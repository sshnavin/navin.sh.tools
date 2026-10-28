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
  layout.tsx              # Root layout — shell, metadata, fonts
  page.tsx                # Homepage
  globals.css             # Tailwind theme and CSS custom properties
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

components/
  layout/
    site-header.tsx       # Responsive sticky header
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
  highlighter.tsx         # Shiki wrapper — codeToHtmlHighlighted()
  utils.ts                # cn() re-export

mdx-components.tsx        # MDX element overrides (root — required by @next/mdx)
```

## Features

### Site shell

- Sticky header with brand, desktop navigation, icon links, and theme toggle
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

### SEO

- `Metadata` export in the root layout with `metadataBase`, `title` template (`%s · navin.sh`), `description`, `openGraph`, and `twitter` fields
- Per-page metadata overrides via `export const metadata` in each page file
- Post pages additionally set `openGraph.type: "article"` and `publishedTime`

## Code style

- Prettier with `prettier-plugin-tailwindcss` — 2 spaces, no semicolons, double quotes, LF line endings
- ESLint via `eslint-config-next` core-web-vitals and TypeScript rules
- Server Components by default — `"use client"` only where genuinely required
- Content and presentation kept separate — data files in `content/`, components in `components/` and `app/`
