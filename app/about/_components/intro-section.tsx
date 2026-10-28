import Link from "next/link"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"

function IntroSection() {
  return (
    <div className="pb-2 pt-8 sm:pt-12">
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        Navin Singh
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Seasoned Frontend Engineer
      </p>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80">
        I&apos;m a software engineer focused on building scalable frontend
        applications, design systems, web and mobile platforms. I enjoy solving product
        and engineering problems and building things that are useful.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <Link
          href="https://github.com/sshnavin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <GitHubIcon className="size-3.5" />
          GitHub
        </Link>
        <Link
          href="https://linkedin.com/in/sshnavin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <LinkedInIcon className="size-3.5" />
          LinkedIn
        </Link>
      </div>
    </div>
  )
}

export { IntroSection }
