"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LedgerRow } from "@/components/brut/ledgerrow";
import { Panel } from "@/components/brut/panel";

export type LogPost = {
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  views: number;
  minutes: number;
  tags: string[];
};

const views = (n: number) => `${n} view${n === 1 ? "" : "s"}`;

export default function BlogFeed({ posts, aside }: { posts: LogPost[]; aside: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filtering = query.trim() !== "" || tag !== null;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    );
  }, [posts, query, tag]);

  const featured = filtering ? undefined : shown[0];
  const rows = featured ? shown.slice(1) : shown;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <div className="relative max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs..."
            aria-label="Search logs"
            className="w-full border-[3px] border-ink bg-surface px-3 py-2.5 pr-20 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-ink px-2 py-0.5 font-mono text-xs hover:bg-spark hover:text-on-spark"
            >
              clear
            </button>
          )}
        </div>
        <p className="mt-3 font-mono text-sm" aria-live="polite">
          {shown.length} of {posts.length} logs{tag ? `, tagged ${tag}` : ""}
        </p>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="press shadow-hard mt-8 block border-[3px] border-ink bg-spark p-6 text-on-spark md:p-8"
          >
            <p className="font-mono text-sm">
              Featured entry · {featured.dateLabel} · {featured.minutes} min read · {views(featured.views)}
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl">{featured.title}</h2>
            <p className="mt-3 line-clamp-3 max-w-[60ch] text-lg">{featured.excerpt}</p>
            <span className="mt-5 inline-block border-[3px] border-ink bg-ink px-4 py-2 font-bold text-paper">Read log</span>
          </Link>
        )}

        {shown.length === 0 ? (
          <div className="mt-8 border-[3px] border-dashed border-ink p-8">
            <p className="text-xl font-bold">No logs match that.</p>
            <button
              onClick={() => { setQuery(""); setTag(null); }}
              className="press shadow-hard-sm mt-4 border-[3px] border-ink bg-ink px-4 py-2 font-bold text-paper"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-10 border-t-[3px] border-ink">
            {rows.map((p) => (
              <LedgerRow
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.excerpt}
                stack={p.tags}
                meta={
                  <>
                    <span className="block font-bold">{p.dateLabel}</span>
                    <span className="block text-xs">{p.minutes} min read</span>
                  </>
                }
                aside={
                  <span className="font-mono text-sm">
                    <span className="block font-bold">Read log</span>
                    <span className="block">{views(p.views)}</span>
                  </span>
                }
              />
            ))}
          </ul>
        )}
      </div>

      <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
        {tags.length > 0 && (
          <Panel label="systems explorer ~">
            <div className="flex flex-wrap gap-2">
              {tags.map(([t, n]) => (
                <button
                  key={t}
                  onClick={() => setTag(tag === t ? null : t)}
                  aria-pressed={tag === t}
                  className={cn(
                    "border-2 border-ink px-3 py-1.5 text-sm font-semibold",
                    tag === t ? "bg-accent text-on-accent" : "bg-paper hover:bg-spark hover:text-on-spark",
                  )}
                >
                  {t} <span className="font-mono text-xs">{n}</span>
                </button>
              ))}
            </div>
          </Panel>
        )}
        {aside}
      </aside>
    </div>
  );
}