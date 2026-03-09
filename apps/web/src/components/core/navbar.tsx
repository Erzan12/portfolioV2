import Link from "next/link";
import { Github, BookOpen } from "lucide-react";
import ThemeToggle from "../dark-mode-toggle/theme-toggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-black dark:text-white "
        >
          erzan.dev
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300 ">
          
          <Link
            href="/projects"
            className="hover:text-black dark:hover:text-white transition relative after:absolute after:left-0 after:-bottom-1 
            after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          >
            Projects
          </Link>

          <Link
            href="/system-design"
            className="hover:text-black dark:hover:text-white transition relative after:absolute after:left-0 after:-bottom-1 
            after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          >
            System Design
          </Link>

          <a
            href="https://docs.erzan.dev"
            target="_blank"
            className="flex items-center gap-1 hover:text-black dark:hover:text-white transition relative after:absolute 
            after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          >
            <BookOpen size={16} />
            Docs
          </a>

          <a
            href="https://github.com/Erzan12"
            target="_blank"
            className="flex items-center gap-1 hover:text-black dark:hover:text-white transition relative after:absolute 
            after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          >
            <Github size={16} />
            GitHub
          </a>

          <ThemeToggle />

        </div>
      </div>
    </nav>
  );
}