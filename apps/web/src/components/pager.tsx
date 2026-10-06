"use client";
import { useCallback, useEffect, useState } from "react";

type Page = { id: string; title: string; node: React.ReactNode };

/** Experimental: shows one section at a time with prev/next arrows. Left/Right keys and #hash work too. */
export default function Pager({ pages, startId }: { pages: Page[]; startId?: string }) {
  const [i, setI] = useState(Math.max(0, pages.findIndex((p) => p.id === startId)));

  const go = useCallback(
    (n: number) => {
      const c = Math.min(pages.length - 1, Math.max(0, n));
      setI(c);
      history.replaceState(null, "", `#${pages[c].id}`);
      window.scrollTo({ top: 0 });
    },
    [pages],
  );

  useEffect(() => {
    const idx = pages.findIndex((p) => p.id === location.hash.slice(1));
    if (idx >= 0) setI(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  const cell = "px-5 py-3 font-bold hover:bg-spark hover:text-on-spark disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div>
      <div className="sticky top-[59px] z-30 flex items-stretch border-b-[3px] border-ink bg-paper">
        <button className={`${cell} border-r-[3px] border-ink`} onClick={() => go(i - 1)} disabled={i === 0}>← Previous</button>
        <p className="flex flex-1 items-center justify-center gap-3 px-3 font-mono text-sm">
          <span>{String(i + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span>
          <span className="font-bold">{pages[i].title}</span>
        </p>
        <button className={`${cell} border-l-[3px] border-ink`} onClick={() => go(i + 1)} disabled={i === pages.length - 1}>Next →</button>
      </div>
      <div key={pages[i].id}>{pages[i].node}</div>
    </div>
  );
}