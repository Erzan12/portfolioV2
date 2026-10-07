import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center",
    "rounded-none",
    "border-2 border-ink",
    "px-2.5 py-1",
    "text-xs font-bold",
    "font-mono uppercase",
    "shadow-hard-sm",
    "transition-all duration-100",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-accent",
    "focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-accent text-on-accent",

        secondary:
          "bg-spark text-on-spark",

        destructive:
          "bg-destructive text-destructive-foreground",

        outline:
          "bg-surface text-ink",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
