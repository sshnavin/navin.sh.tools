import * as React from "react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"

export interface NavLink {
  label: string
  href: string
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export const NAV_LINKS: NavLink[] = [
  { label: "Posts", href: "/posts" },
  { label: "About", href: "/about" },
  {
    label: "GitHub",
    href: "https://github.com/navinsh",
    external: true,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/navinsh",
    external: true,
    icon: LinkedInIcon,
  },
]
