import Link from "next/link"

function Hero() {
  return (
    <div className="flex min-h-[calc(100svh-10rem)] flex-col justify-center pb-20 pt-8 sm:pt-0">
      <div className="max-w-lg">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Hey, I&apos;m Navin.
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          I build software for the web.
        </h1>

        <p className="mt-5 text-sm leading-relaxed text-foreground/70 sm:text-base">
          Frontend Engineer focused on building scalable products,
          platforms and useful experiences for the web.
        </p>

        <Link
          href="/about"
          className="mt-8 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          More about me&nbsp;&rarr;
        </Link>
      </div>
    </div>
  )
}

export { Hero }
