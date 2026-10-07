import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full",
        "rounded-none",
        "border-2 border-ink",
        "bg-surface text-ink",
        "px-3 py-2",
        "font-sans text-base",
        "placeholder:text-muted-foreground",
        "shadow-hard-sm",
        "transition-all duration-100",
        "file:border-0",
        "file:bg-transparent",
        "file:text-sm",
        "file:font-bold",
        "focus-visible:outline-none",
        "focus-visible:-translate-x-0.5",
        "focus-visible:-translate-y-0.5",
        "focus-visible:shadow-hard",
        "focus-visible:ring-0",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:shadow-none",
        "md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
