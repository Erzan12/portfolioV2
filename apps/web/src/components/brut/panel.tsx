import { cn } from "@/lib/utils";

const tones = {
  surface: "bg-surface text-ink",
  paper: "bg-paper text-ink",
  accent: "bg-accent text-on-accent",
  spark: "bg-spark text-on-spark",
  ink: "bg-ink text-paper",
};

type Props = {
  tone?: keyof typeof tones;
  label?: string; // title strip, like a window or file header
  className?: string;
  children: React.ReactNode;
};

export function Panel({ tone = "surface", label, className, children }: Props) {
  return (
    <section className={cn("shadow-hard border-[3px] border-ink", tones[tone], className)}>
      {label && (
        <div className="border-b-[3px] border-ink bg-ink px-4 py-1.5 font-mono text-sm text-paper">
          {label}
        </div>
      )}
      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}