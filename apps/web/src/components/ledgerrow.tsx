import Link from "next/link";
import { Stamp, Tag } from "./stamp";

type Props = {
  href: string;
  title: string;
  description: string;
  stack: string[];
  meta: string; // e.g. "Oct 5, 2026"
  status?: "ongoing" | "live" | "queue";
};

/** One project in the index. Wrap rows in a <ul>. Inverts to the accent color on hover. */
export function LedgerRow({ href, title, description, stack, meta, status }: Props) {
  return (
    <li className="border-b-[3px] border-ink">
      <Link
        href={href}
        className="grid gap-3 px-4 py-6 transition-colors duration-75 hover:bg-accent hover:text-on-accent md:grid-cols-[9rem_1fr_6rem] md:gap-8"
      >
        <span className="font-mono text-sm">{meta}</span>
        <div>
          <h3 className="text-3xl font-extrabold leading-none">{title}</h3>
          <p className="mt-2 max-w-[60ch] text-lg">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
        <div className="md:text-right">{status && <Stamp kind={status} />}</div>
      </Link>
    </li>
  );
}