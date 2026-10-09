import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex-touch none flex-col p-0.5 bg-black/10 transition-colors duration-150 ease-out hover:bg-black/20 data-[state=hidden]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
ScrollBar.displayName = "ScrollBar"

const ScrollThumb = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex-1 rounded-full bg-white/20 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
        className
      )}
      {...props}
    />
  )
})
ScrollThumb.displayName = "ScrollThumb"

const ScrollCorner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-black/10", className)}
      {...props}
    />
  )
})
ScrollCorner.displayName = "ScrollCorner"

export {
  ScrollArea,
  ScrollBar,
  ScrollThumb,
  ScrollCorner,
}
