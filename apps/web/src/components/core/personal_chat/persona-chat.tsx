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

export function PersonaChat() {
  const [open, setOpen] = useState(false);

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
      className="fixed bottom-6 right-6 z-[999]"
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
              "w-[390px]",
              "h-[650px]",
              "max-md:fixed",
              "max-md:bottom-0",
              "max-md:left-0",
              "max-md:right-0",
              "max-md:w-screen",
              "max-md:h-[100dvh]",
              "overflow-hidden",
              "rounded-[2rem]",
              "max-md:rounded-none",
              "border",
              "border-white/10",
              "bg-white/70",
              "dark:bg-slate-950/70",
              "backdrop-blur-xl",
              "shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
            )}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white">
                    <Sparkles size={18} />
                  </div>

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>

                <div>
                  <p className="font-semibold">
                    Chat with Earl - Persona
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
            <div className="h-full">
              <PersonaAi />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          relative
          h-16
          w-16
          rounded-full
          bg-gradient-to-br
          from-violet-600
          to-blue-600
          text-white
          shadow-lg
        "
      >
        <div className="absolute inset-0 rounded-full bg-violet-500 blur-xl opacity-40" />

        <MessageCircle
          className="relative mx-auto"
          size={24}
        />

        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-green-400" />
      </motion.button>
    </div>
  );
}