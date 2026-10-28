import Link from "next/link"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
import { PageContainer } from "@/components/layout/page-container"

const navItemClass = buttonVariants({ variant: "ghost", size: "sm" })
const iconItemClass = buttonVariants({ variant: "ghost", size: "icon-sm" })

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <PageContainer>
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
          >
            navin.sh
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Main navigation"
          >
            <TooltipProvider>
              <Link href="/tools" className={navItemClass}>
                Tools
              </Link>
              <Link href="/posts" className={navItemClass}>
                Posts
              </Link>
              <Link href="/about" className={navItemClass}>
                About
              </Link>

              <div className="mx-2 h-4 w-px bg-border" role="separator" />

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="https://github.com/navinsh"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className={iconItemClass}
                    />
                  }
                >
                  <GitHubIcon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="https://linkedin.com/in/navinsh"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className={iconItemClass}
                    />
                  }
                >
                  <LinkedInIcon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="mx-2 h-4 w-px bg-border" role="separator" />

            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </PageContainer>
    </header>
  )
}

export { SiteHeader }
