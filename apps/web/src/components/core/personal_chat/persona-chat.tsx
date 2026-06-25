"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Sparkles,
} from "lucide-react";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PersonaAi } from "./persona-ai";
import { useRouteTheme } from "@/hooks/useRouteTheme";

export function PersonaChat() {
  const [open, setOpen] = useState(false);

  const theme = useRouteTheme();

  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 z-[999]"
    >
      {/* CHAT WINDOW */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className={clsx(
              "absolute bottom-20 right-0",

              "overflow-hidden",
              "flex flex-col",

               // ← responsive width and height
              "w-[calc(100vw-2rem)]",   // full viewport minus margins on mobile
              "max-w-[390px]",          // caps at 390px on larger screens

              "h-[80vh]",               // relative height on mobile
              "max-h-[650px]",          // caps at 650px on larger screens

              "rounded-[2rem]",         // slightly smaller radius on mobile

              "border",
              "border-slate-500/10",

              "bg-white/50",
              "dark:bg-slate-900/40",

              "backdrop-blur-md",

              "shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
            )}
          >
            <div
              className={clsx(
                "absolute -top-20 right-0",
                "w-72 h-72",
                "rounded-full",
                "blur-3xl",
                "opacity-60",
                "bg-gradient-to-br",
                theme.gradient
              )}
            />
            {/* <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-slate-200/20"> */}
            <div className="relative z-10 shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-200/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white">
                    <Sparkles size={18} />
                  </div> */}

                  <div
                    className="
                    h-12 w-12

                    rounded-2xl

                    flex items-center justify-center

                    bg-slate-900/5
                    dark:bg-white/5

                    border border-slate-500/10
                  "
                  >
                    <Sparkles />
                  </div>

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>

                <div>
                  <p className="font-semibold">
                    Chat with Earl
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Usually replies instantly
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative z-10 flex-1 min-h-0">
              <PersonaAi theme={theme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route Theme Glow */}
      <div className="relative">
        <div
          className={clsx(
            "absolute inset-0",
            "rounded-[1.75rem]",
            "blur-2xl",
            "opacity-60",
            "bg-gradient-to-br",
            theme.gradient
          )}
        />
        <motion.button
          onClick={() => setOpen(!open)}
          className="
            relative
            h-16
            w-16
            rounded-[1.75rem]

            border border-slate-500/10

            bg-white/70
            dark:bg-slate-900/70

            backdrop-blur-xl

            shadow-[0_10px_50px_rgba(0,0,0,0.08)]

            flex items-center justify-center
          "
        >
          <MessageCircle
            className="
              h-6 w-6
              text-slate-700
              dark:text-slate-300
            "
          />
        </motion.button>
      </div>
    </div>
  );
}