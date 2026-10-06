import Link from "next/link";
import { Stamp, Tag } from "./stamp";

type Props = {
  href: string;
  title: string;
  description: string;
  stack: string[];
  meta: string; // left column, mono: a date or repo name
  status?: "ongoing" | "live" | "queue";
};

const rowClass =
  "grid gap-3 px-4 py-6 transition-colors duration-75 hover:bg-accent hover:text-on-accent md:grid-cols-[11rem_1fr_6rem] md:gap-8";

/** One project in the index. Wrap rows in a <ul>. Inverts to the accent color on hover. */
export function LedgerRow({ href, title, description, stack, meta, status }: Props) {
  const inner = (
    <>
      <span className="break-words font-mono text-sm">{meta}</span>
      <div>
        <h3 className="text-3xl font-extrabold leading-none">{title}</h3>
        <p className="mt-2 max-w-[60ch] text-lg">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <div className="md:text-right">{status && <Stamp kind={status} />}</div>
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