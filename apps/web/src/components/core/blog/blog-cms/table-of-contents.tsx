"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

// Reads the headings straight from the rendered article and gives each one an id,
// so the links always match what is actually on the page.
export function TableOfContents(_props: { content?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("article h2, article h3"));
    const used = new Set<string>();
    const items = els.map((el) => {
      const text = el.textContent?.trim() ?? "";
      const base = el.id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      el.id = id;
      return { id, text, level: el.tagName === "H3" ? 3 : 2 };
    });
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "0% 0% -80% 0%" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-sm">On this page</p>
      <ul className="mt-3 space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-[3px] border-transparent py-1 pl-3 text-sm leading-snug hover:border-ink",
                h.level === 3 && "ml-4",
                activeId === h.id && "border-ink bg-spark font-bold text-on-spark",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}