// Temporary route (/styleguide) to check every token and component in both themes. Delete before launch.

import { Button } from "@/components/button";
import { LedgerRow } from "@/components/ledgerrow";
import { Panel } from "@/components/panel";
import { Stamp, Tag } from "@/components/stamp";

const swatches = ["paper", "surface", "ink", "accent", "spark"];

export default function Styleguide() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-5 py-12">
      <h1 className="text-6xl font-extrabold leading-none md:text-8xl">Design tokens</h1>

      <div className="grid grid-cols-5 border-[3px] border-ink">
        {swatches.map((s) => (
          <div key={s} className={`bg-${s} h-24 border-r-[3px] border-ink p-2 font-mono text-xs last:border-r-0`}>{s}</div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="ink">View projects</Button>
        <Button variant="accent">Hire me</Button>
        <Button variant="spark">Download resume</Button>
        <Button variant="plain">Engineering docs</Button>
        <Button variant="accent" size="lg">Large button</Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Stamp kind="ongoing" /><Stamp kind="live" /><Stamp kind="queue" />
        <Tag>NestJS</Tag><Tag>PostgreSQL</Tag><Tag>Prisma</Tag>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Panel label="erzan@projects ~">Panel with a title strip.</Panel>
        <Panel tone="spark">Panel in the secondary color.</Panel>
      </div>

      <ul className="border-t-[3px] border-ink">
        <LedgerRow href="#" title="ERP-API" meta="Sep 28, 2026" status="live"
          description="NestJS enterprise backend with JWT auth, Prisma, and Swagger docs."
          stack={["NestJS", "PostgreSQL", "Prisma"]} />
        <LedgerRow href="#" title="portfolioV2" meta="Oct 5, 2026" status="ongoing"
          description="This portfolio, plus the Persona AI assistant and Docusaurus docs in a monorepo."
          stack={["Next.js", "Supabase", "Docusaurus"]} />
      </ul>
    </main>
  );
}