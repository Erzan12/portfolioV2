"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Stamp } from "./brut/stamp";
import { now, nowBlurbs, type NowTab } from "@/data/now";

const tabs: { id: NowTab; label: string }[] = [
  { id: "cooking", label: "What I'm cooking" },
  { id: "learning", label: "What I'm learning" },
  { id: "into", label: "What I'm into" },
];

export default function NowBoard() {
  const [active, setActive] = useState<NowTab>("cooking");
  const items = now[active];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div role="tablist" className="grid border-[3px] border-ink sm:grid-cols-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "border-b-[3px] border-ink px-5 py-4 text-left text-2xl font-extrabold last:border-b-0 sm:border-b-0 sm:border-r-[3px] sm:last:border-r-0 md:text-3xl",
              active === t.id ? "bg-ink text-paper" : "bg-paper hover:bg-spark hover:text-on-spark",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="shadow-hard border-[3px] border-t-0 border-ink bg-surface">
        {nowBlurbs[active] && (
          <p className="border-b-[3px] border-ink px-5 py-3 font-mono text-sm">{nowBlurbs[active]}</p>
        )}
        {items.length === 0 ? (
          <p className="px-5 py-8 text-lg">Nothing listed here yet.</p>
        ) : (
          <ul>
            {items.map((i) => (
              <li key={i.title} className="flex items-center justify-between gap-4 border-b-[3px] border-ink px-5 py-4 last:border-b-0">
                <span className={cn("text-lg font-semibold md:text-xl", i.status === "queue" && "text-muted-foreground")}>
                  {i.title}
                </span>
                <Stamp kind={i.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}