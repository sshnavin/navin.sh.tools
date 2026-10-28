import * as React from "react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { siteConfig } from "@/config/site"

export interface NavLink {
  label: string
  href: string
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export const NAV_LINKS: NavLink[] = [
  { label: "Tools", href: "/tools" },
  { label: "Posts", href: "/posts" },
  { label: "About", href: "/about" },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    external: true,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    external: true,
    icon: LinkedInIcon,
  },
]
