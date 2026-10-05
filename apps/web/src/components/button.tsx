import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  ink: "bg-ink text-paper",
  accent: "bg-accent text-on-accent",
  spark: "bg-spark text-on-spark",
  plain: "bg-surface text-ink",
};

type Props = {
  variant?: keyof typeof variants;
  size?: "md" | "lg";
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "ink", size = "md", href, className, ...rest }: Props) {
  const cls = cn(
    "press shadow-hard-sm inline-flex items-center justify-center border-[3px] border-ink font-bold",
    size === "lg" ? "px-7 py-4 text-xl" : "px-5 py-2.5 text-base",
    variants[variant],
    className,
  );
  if (href) {
    const external = /^https?:/.test(href);
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noreferrer">{rest.children}</a>
    ) : (
      <Link href={href} className={cls}>{rest.children}</Link>
    );
  }
  return <button className={cls} {...rest} />;
}