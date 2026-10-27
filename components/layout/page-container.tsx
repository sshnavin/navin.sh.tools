import * as React from "react"
import { cn } from "cn"

interface PageContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode
}

function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { PageContainer }
