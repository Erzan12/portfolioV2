import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full",
        "rounded-none",
        "border-2 border-ink",
        "bg-surface text-ink",
        "px-3 py-2",
        "font-sans text-base",
        "placeholder:text-muted-foreground",
        "shadow-hard-sm",
        "transition-all duration-100",
        "resize-y",
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

Textarea.displayName = "Textarea";

export { Textarea };
