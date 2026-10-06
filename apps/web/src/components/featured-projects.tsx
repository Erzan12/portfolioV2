import type { Project } from "@/lib/types/project";
import { Button } from "./brut/button";
import { LedgerRow } from "./brut/ledgerrow";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <h2 className="text-5xl md:text-6xl">Selected work</h2>
        <Button href="/projects" variant="plain">All projects</Button>
      </div>
      <ul className="border-t-[3px] border-ink">
        {projects.map((p) => (
          <LedgerRow
            key={p.title}
            href={p.demoLink ?? `https://github.com/${p.github}`}
            title={p.title}
            description={p.description}
            stack={p.stack}
            meta={p.repo}
          />
        ))}
      </ul>
    </section>
  );
}