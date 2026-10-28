// ---------------------------------------------------------------------------
// Site configuration
//
// Single source of truth for site-wide constants.
// Import from here rather than hardcoding URLs or names in individual files.
// Pure data — no React imports.
// ---------------------------------------------------------------------------

export const siteConfig = {
  /** Canonical site URL — no trailing slash. */
  url: "https://navin.sh",

  /** Short handle used in titles, footers and brand marks. */
  name: "navin.sh",

  /** Author display name. */
  author: "Navin Singh",

  /** Default page title when no per-page title is set. */
  defaultTitle: "Navin Singh | Full-stack engineer, tinkerer, millennial family man.",

  /**
   * Title template applied to all per-page titles.
   * %s is replaced with the page-specific title segment.
   */
  titleTemplate: "%s | navin.sh",

  /** Site-wide default meta description. */
  description:
    "Personal website of Navin Singh — Full-stack engineer, try various tools for your every day needs",

  /** Social links. */
  links: {
    github: "https://github.com/sshnavin",
    linkedin: "https://linkedin.com/in/sshnavin",
  },
} as const

export type SiteConfig = typeof siteConfig
