"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { NAV_LINKS } from "@/components/layout/nav-links"

function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  function close() {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="size-4" />
      </Button>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight text-foreground"
              onClick={close}
            >
              navin.sh
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-8 pb-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "flex items-center gap-2 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={close}
            >
              {link.icon && <link.icon className="size-4 shrink-0" />}
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
