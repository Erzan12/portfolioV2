"use client";
import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion, type Variants } from "framer-motion";
import { emailHref } from "@/data/profile";
import { Button } from "../brut/button";

// The terminal is always dark, so its colors are fixed on purpose (not theme tokens).
const PARTS = [
  { v: "Hi I'm ", c: "text-[#F3EEDF]/60" },
  { v: "Earl Jan Do!", c: "font-bold text-[#F3EEDF]" },
  { v: " ", c: "" },
  { v: "[Erzan]", c: "text-[#D9FF1F]" },
  { v: " I'm a ", c: "text-[#F3EEDF]/60" },
  { v: "Fullstack Developer", c: "font-bold text-[#6B7FFF]" },
  { v: ", Welcome!", c: "text-[#F3EEDF]/60" },
];
const FULL = PARTS.map((p) => p.v).join("");

function useTyped(text: string, reduce: boolean) {
  const [n, setN] = useState(reduce ? text.length : 0);
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");
  useEffect(() => {
    if (reduce) { setN(text.length); return; }
    let t: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      t = setTimeout(() => { setN(n + 1); if (n + 1 >= text.length) setPhase("hold"); }, 70);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("erase"), 8000);
    } else {
      t = setTimeout(() => { if (n <= 1) { setN(0); setPhase("type"); } else setN(n - 1); }, 30);
    }
    return () => clearTimeout(t);
  }, [n, phase, reduce, text]);
  return n;
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Hero({ token }: { token?: string }) {
  const reduce = !!useReducedMotion();
  const typed = useTyped(FULL, reduce);
  const [showInvite, setShowInvite] = useState(!!token);
  const scrolled = useRef(false);

  // Invited visitors land on the testimonials section (same behavior as before)
  useEffect(() => {
    if (!token || scrolled.current) return;
    const id = setTimeout(() => {
      document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth", block: "start" });
      scrolled.current = true;
    }, 800);
    return () => clearTimeout(id);
  }, [token]);

  let used = 0;
  const segments = PARTS.map((p) => {
    const chunk = p.v.slice(0, Math.max(0, typed - used));
    used += p.v.length;
    return { ...p, chunk };
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pt-20">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise} className="shadow-hard max-w-3xl border-[3px] border-ink bg-black">
            <div className="border-b-[3px] border-ink bg-[#D9FF1F] px-4 py-1.5 font-mono text-sm text-black">
              erzan@portfolio-v2 ~/apps/web
            </div>
            <div className="grid px-5 py-6 font-mono text-sm text-[#F3EEDF] md:text-base">
              <p className="invisible col-start-1 row-start-1" aria-hidden>
                {"❯ echo \""}{FULL}{"\""}
              </p>
              <p className="col-start-1 row-start-1" aria-hidden>
                <span className="text-[#D9FF1F]">❯ </span>
                <span className="text-[#6B7FFF]">echo </span>
                <span>&quot;</span>
                {segments.map((s, i) => <span key={i} className={s.c}>{s.chunk}</span>)}
                <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[2px] bg-[#D9FF1F] motion-safe:animate-pulse" />
                <span>&quot;</span>
              </p>
              <span className="sr-only">{FULL}</span>
            </div>
          </motion.div>

          <motion.h1 variants={rise} className="mt-12 max-w-5xl text-5xl font-extrabold leading-[0.95] sm:text-6xl xl:text-7xl">
            Crafting fast backend systems &amp; modern web apps.
          </motion.h1>

          <motion.p variants={rise} className="mt-6 max-w-[60ch] text-xl">
            Full-stack developer with a focus on ERP software, API design, &amp; dev platforms. I prioritize clear architecture, solid performance, &amp; real-world scalability.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-4">
            <Button href={emailHref} variant="accent" size="lg">Hire me</Button>
            <Button href="/projects" variant="ink" size="lg">View projects</Button>
            <Button href="https://erzan-docs.vercel.app/docs/architecture" variant="plain" size="lg">Engineering docs</Button>
          </motion.div>

        </motion.div>

        {showInvite && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <Button
              variant="accent"
              onClick={() => {
                document.getElementById("leave-note")?.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(() => setShowInvite(false), 300);
              }}
            >
              Leave your testimonial
            </Button>
          </div>
        )}
      </section>
    </MotionConfig>
  );
}