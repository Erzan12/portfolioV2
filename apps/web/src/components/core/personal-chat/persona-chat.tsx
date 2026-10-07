"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PersonaAi } from "./persona-ai";

const GREETINGS = [
  "Hey there! Want to know more about Earl?",
  "Ask me anything about Earl's projects.",
  "Curious about his tech stack?",
  "Looking for a frontend, backend, or full-stack dev?",
  "Let's chat.",
  "Looking great today. Let's chat.",
];

export function PersonaChat() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greeting, setGreeting] = useState(GREETINGS[0]);
  const reduce = !!useReducedMotion();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  // Greeting bubble: first after 3s, then every 40s, until the chat has been opened once
  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;

    const showBubble = () => {
      if (open) return;
      if (sessionStorage.getItem("persona-chat-opened")) return;
      setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
      setShowGreeting(true);
      hideTimeout = setTimeout(() => setShowGreeting(false), 15000);
    };

    const showTimeout = setTimeout(showBubble, 3000);
    const interval = setInterval(showBubble, 40000);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // Click outside or Escape closes
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 z-[999]">
      {/* Window stays mounted (hidden) so the conversation survives closing */}
      <motion.div
        id="persona-chat-window"
        role="dialog"
        aria-label="Chat with Persona"
        aria-hidden={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }}
        transition={{ duration: reduce ? 0 : 0.15 }}
        style={{ pointerEvents: open ? "auto" : "none", visibility: open ? "visible" : "hidden" }}
        className="shadow-hard absolute bottom-20 right-0 flex h-[min(80dvh,650px)] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden border-[3px] border-ink bg-surface"
      >
        <div className="flex shrink-0 items-center justify-between border-b-[3px] border-ink bg-ink px-4 py-2 text-paper">
          <p className="flex items-center gap-2 font-mono text-sm">
            <span className="inline-block size-2 bg-spark" aria-hidden />
            persona ~ Earl&apos;s AI assistant
          </p>
          <button
            onClick={() => setOpen(false)}
            className="border-2 border-paper px-2 font-mono text-sm hover:bg-spark hover:text-on-spark"
          >
            close
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <PersonaAi />
        </div>
      </motion.div>

      <AnimatePresence>
        {showGreeting && !open && (
          <motion.button
            onClick={() => { setOpen(true); setShowGreeting(false); sessionStorage.setItem("persona-chat-opened", "true"); }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="shadow-hard-sm absolute bottom-full right-0 mb-4 w-max max-w-[16rem] border-[3px] border-ink bg-spark px-3 py-2 text-left text-sm font-semibold text-on-spark"
          >
            {greeting}
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setOpen(!open);
          setShowGreeting(false);
          sessionStorage.setItem("persona-chat-opened", "true");
        }}
        aria-expanded={open}
        aria-controls="persona-chat-window"
        className="press shadow-hard-sm border-[3px] border-ink bg-accent px-5 py-3 text-lg font-extrabold text-on-accent"
      >
        {open ? "Close chat" : "Ask Persona"}
      </button>
    </div>
  );
}