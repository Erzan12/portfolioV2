"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/system-design", label: "System Design" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Mission Log" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => setTheme(document.documentElement.dataset.theme ?? "light"), []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };
  return (
    <button onClick={flip} className="border-l-[3px] border-ink px-5 font-mono text-sm hover:bg-spark hover:text-on-spark">
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const cell = "flex items-center border-r-[3px] border-ink px-5 font-semibold hover:bg-spark hover:text-on-spark";

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper">
      <div className="flex h-14 items-stretch">
        <Link href="/" className="flex items-center border-r-[3px] border-ink bg-ink px-5 text-lg font-extrabold text-paper">
          erzan.dev
        </Link>
        <nav className="hidden items-stretch md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(cell, path.startsWith(l.href) && "bg-spark text-on-spark")}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-stretch">
          <a href="https://github.com/" className={cn(cell, "hidden border-l-[3px] border-r-0 sm:flex")}>GitHub</a>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-expanded={open}
            className="border-l-[3px] border-ink px-5 font-semibold md:hidden">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t-[3px] border-ink md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="border-b-[3px] border-ink px-5 py-4 text-xl font-bold last:border-b-0 hover:bg-spark hover:text-on-spark">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}