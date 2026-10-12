"use client";

import { useMemo, useRef, useState } from "react";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { cn } from "@/lib/utils";
import { LedgerRow } from "@/components/brut/ledgerrow";

const ITEMS_PER_PAGE = 9;
const CATEGORIES = ["All", "React", "NextJS", "TypeScript", "PHP", "Laravel", "HTML"];

function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units: [number, string][] = [[31536000, "year"], [2592000, "month"], [86400, "day"], [3600, "hour"], [60, "minute"]];
  for (const [sec, name] of units) {
    const n = Math.floor(s / sec);
    if (n >= 1) return `${n} ${name}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function RowSkeleton() {
  return (
    <li aria-hidden className="grid gap-3 border-b-[3px] border-ink px-4 py-6 md:grid-cols-[11rem_1fr_8rem] md:gap-8">
      <div className="h-10 w-28 bg-muted motion-safe:animate-pulse" />
      <div className="space-y-3">
        <div className="h-8 w-2/3 bg-muted motion-safe:animate-pulse" />
        <div className="h-5 w-full max-w-[40ch] bg-muted motion-safe:animate-pulse" />
        <div className="h-6 w-1/2 bg-muted motion-safe:animate-pulse" />
      </div>
      <div />
    </li>
  );
}

export default function ProjectsPage() {
  const { repos, loading } = useGithubRepos();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const listRef = useRef<HTMLUListElement>(null);

  // filter + sort: newest push first
  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    const term = searchQuery.toLowerCase();
    return repos
      .filter((repo) => {
        const categoryMatch =
          activeCategory === "All" ||
          repo.language === activeCategory ||
          repo.name.toLowerCase().includes(activeCategory.toLowerCase());
        const searchMatch =
          repo.name.toLowerCase().includes(term) ||
          (repo.description?.toLowerCase().includes(term) ?? false);
        return categoryMatch && searchMatch;
      })
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }, [repos, searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const changeSearch = (value: string) => { setSearchQuery(value); setCurrentPage(1); };
  const changeCategory = (cat: string) => { setActiveCategory(cat); setCurrentPage(1); };
  const goTo = (n: number) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, n)));
    listRef.current?.scrollIntoView({ block: "start" });
  };

  const navCell = "px-5 py-3 font-bold hover:bg-spark hover:text-on-spark disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl md:text-7xl">Projects</h1>
          <p className="mt-3 max-w-[60ch] text-lg">This section highlights all my development projects.</p>
          {!loading && (
            <p className="mt-2 font-mono text-sm" aria-live="polite">
              {filteredRepos.length} of {repos?.length ?? 0} repositories, newest push first
            </p>
          )}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full border-[3px] border-ink bg-surface px-3 py-2.5 pr-20 text-base"
          />
          {searchQuery && (
            <button
              onClick={() => changeSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-ink px-2 py-0.5 font-mono text-xs hover:bg-spark hover:text-on-spark"
            >
              clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={cn(
              "border-[3px] border-ink px-3 py-1.5 font-semibold",
              activeCategory === cat ? "shadow-hard-sm bg-accent text-on-accent" : "bg-paper hover:bg-spark hover:text-on-spark",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {!loading && paginatedRepos.length === 0 ? (
        <div className="mt-8 border-[3px] border-dashed border-ink p-8">
          <p className="text-xl font-bold">
            {searchQuery ? <>No projects match &quot;{searchQuery}&quot;</> : "No projects in this category yet"}
          </p>
          <button
            onClick={() => { changeSearch(""); changeCategory("All"); }}
            className="press shadow-hard-sm mt-4 border-[3px] border-ink bg-ink px-4 py-2 font-bold text-paper"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul ref={listRef} className="mt-8 min-h-[400px] scroll-mt-20 border-t-[3px] border-ink">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <RowSkeleton key={i} />)
            : paginatedRepos.map((repo) => {
                const tags = [repo.language, ...(repo.topics ?? [])].filter(Boolean) as string[];
                const shown = tags.slice(0, 6);
                if (tags.length > 6) shown.push(`+${tags.length - 6}`);
                return (
                  <LedgerRow
                    key={repo.id}
                    href={repo.html_url}
                    title={repo.name}
                    description={repo.description ?? "No description provided"}
                    stack={shown}
                    meta={
                      <>
                        <span className="block font-bold">{timeAgo(repo.pushed_at)}</span>
                        <span className="block text-xs">{fmtDate(repo.pushed_at)}</span>
                      </>
                    }
                    aside={
                      <span className="font-mono text-sm">
                        <span className="block font-bold">Open repo</span>
                        {(repo.stars > 0 || repo.forks > 0) && (
                          <span className="block">{repo.stars} stars, {repo.forks} forks</span>
                        )}
                      </span>
                    }
                  />
                );
              })}
        </ul>
      )}

      {!loading && totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex items-stretch border-[3px] border-ink">
          <button className={`${navCell} border-r-[3px] border-ink`} onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}>
            ← Previous
          </button>
          <p className="flex flex-1 items-center justify-center font-mono text-sm">
            Page {currentPage} of {totalPages}
          </p>
          <button className={`${navCell} border-l-[3px] border-ink`} onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages}>
            Next →
          </button>
        </nav>
      )}
    </main>
  );
}