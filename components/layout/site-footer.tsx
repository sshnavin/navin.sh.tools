import Link from "next/link"
import { cn } from "cn"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { PageContainer } from "@/components/layout/page-container"

const YEAR = new Date().getFullYear()

interface SiteFooterProps {
  className?: string
}

function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("border-t border-border", className)}>
      <PageContainer>
        <div className="flex h-14 items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {YEAR} Navin Singh
          </p>

          <div className="flex items-center gap-1">
            <Link
              href="https://github.com/navinsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
            </Link>
            <Link
              href="https://linkedin.com/in/navinsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="size-4" />
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}

export { SiteFooter }
