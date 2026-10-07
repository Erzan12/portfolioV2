"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/brut/button";

interface TestimonialsProps {
  items: any[];
  token?: string;
}

const INITIAL = 4;

function getRelativeTime(date: string | Date) {
  const now = new Date();
  const past = new Date(date);
  const diffInMonths =
    (now.getFullYear() - past.getFullYear()) * 12 + (now.getMonth() - past.getMonth());

  if (diffInMonths < 1) return "Recently";
  if (diffInMonths === 1) return "1 month ago";
  return `${diffInMonths} months ago`;
}

function TestimonialCard({ t, featured }: { t: any; featured: boolean }) {
  return (
    <figure
      className={cn(
        "shadow-hard-sm flex flex-col justify-between gap-6 border-[3px] border-ink p-5",
        featured ? "bg-spark text-on-spark" : "bg-surface",
      )}
    >
      <blockquote className="text-lg leading-snug">&ldquo;{t.content}&rdquo;</blockquote>
      <figcaption className="flex items-center gap-3">
        <img
          src={t.user?.image || "/images/person.png"}
          alt=""
          className="size-11 shrink-0 border-2 border-ink object-cover"
        />
        <div>
          <p className="font-bold">{t.name}</p>
          <p className="font-mono text-xs">
            {t.role} · {getRelativeTime(t.created_at)}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ items }: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? items : items.slice(0, INITIAL);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <h2 className="text-5xl md:text-6xl">Testimonies</h2>
      <p className="mt-3 max-w-[60ch] text-lg">
        Kind words from colleagues, coworkers, clients and readers about my work and contributions.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 border-[3px] border-dashed border-ink p-8">
          <p className="text-xl font-bold">No testimonials yet</p>
          <p className="mt-1">Be the first to leave one and share your experience working with me.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {shown.map((t, i) => (
              <TestimonialCard key={t.id ?? i} t={t} featured={i === 0} />
            ))}
          </div>
          {items.length > INITIAL && (
            <div className="mt-6">
              <Button variant="plain" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show fewer" : `Show all ${items.length}`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}