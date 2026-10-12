import Link from "next/link";
import { Stamp, Tag } from "./stamp";

type Props = {
  href: string;
  title: string;
  description: string;
  stack: string[];
  meta: React.ReactNode; // left column, mono: a date, repo name, etc.
  status?: "ongoing" | "live" | "queue";
  aside?: React.ReactNode; // right column; replaces the status stamp when given
};

const rowClass =
  "grid gap-3 px-4 py-6 transition-colors duration-75 hover:bg-accent hover:text-on-accent md:grid-cols-[11rem_1fr_8rem] md:gap-8";

/** One project in the index. Wrap rows in a <ul>. Inverts to the accent color on hover. */
export function LedgerRow({ href, title, description, stack, meta, status, aside }: Props) {
  const inner = (
    <>
      <span className="break-words font-mono text-sm">{meta}</span>
      <div className="min-w-0">
        <h3 className="break-words text-3xl font-extrabold leading-none">{title}</h3>
        <p className="mt-2 line-clamp-3 max-w-[60ch] text-lg">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <div className="md:text-right">{aside ?? (status && <Stamp kind={status} />)}</div>
    </>
  );
  return (
    <li className="border-b-[3px] border-ink">
      {/^https?:/.test(href) ? (
        <a href={href} target="_blank" rel="noreferrer" className={rowClass}>{inner}</a>
      ) : (
        <Link href={href} className={rowClass}>{inner}</Link>
      )}
    </li>
  );
}