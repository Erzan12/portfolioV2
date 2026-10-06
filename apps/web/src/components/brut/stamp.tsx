import { cn } from "@/lib/utils";

const status = {
  ongoing: "bg-spark text-on-spark -rotate-3",
  live: "bg-accent text-on-accent rotate-2",
  queue: "bg-paper text-ink border-dashed -rotate-1",
  onhold: "bg-muted text-muted-foreground rotate-1",
  hobby: "bg-purple-200 text-purple-900 -rotate-2",
  onbreak: "bg-orange-200 text-orange-900 rotate-1",
  onstreak: "bg-green-200 text-green-900 -rotate-2",
};

/** Rubber-stamp status marker. Caps are intentional here: it's a stamp. */
export function Stamp({ kind }: { kind: keyof typeof status }) {
  return (
    <span
      className={cn(
        "inline-block border-[3px] border-ink px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider",
        status[kind],
      )}
    >
      {kind}
    </span>
  );
}

/** Square tag for tech stack and topics. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-xs text-ink">
      {children}
    </span>
  );
}