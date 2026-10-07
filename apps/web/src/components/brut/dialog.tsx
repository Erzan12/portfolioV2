"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      [
        "fixed inset-0 z-50",
        "bg-ink/80",
        "backdrop-blur-[2px]",

        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0",
      ].join(" "),
      className,
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        [
          "fixed left-[50%] top-[50%] z-50",
          "grid w-[calc(100%-2rem)] max-w-lg",
          "translate-x-[-50%] translate-y-[-50%]",
          "gap-4",

          "rounded-none",
          "border-2 border-ink",
          "bg-surface",
          "text-ink",
          "p-6",
          "shadow-hard",

          "duration-150",

          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",

          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0",

          "data-[state=closed]:zoom-out-95",
          "data-[state=open]:zoom-in-95",

          "data-[state=closed]:slide-out-to-left-1/2",
          "data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2",
          "data-[state=open]:slide-in-from-top-[48%]",

          "focus-visible:outline-none",
        ].join(" "),
        className,
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        className={cn(
          [
            "absolute right-3 top-3",
            "flex h-8 w-8 items-center justify-center",

            "rounded-none",
            "border-2 border-transparent",

            "text-ink",
            "opacity-70",

            "transition-all duration-100",

            "hover:border-ink",
            "hover:bg-spark",
            "hover:text-on-spark",
            "hover:opacity-100",

            "active:translate-x-0.5",
            "active:translate-y-0.5",

            "focus-visible:opacity-100",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-accent",

            "disabled:pointer-events-none",

            "data-[state=open]:bg-accent",
            "data-[state=open]:text-on-accent",
          ].join(" "),
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-black uppercase tracking-tight text-ink",
      className,
    )}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm font-medium leading-relaxed text-muted-foreground",
      className,
    )}
    {...props}
  />
));

DialogDescription.displayName =
  DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
