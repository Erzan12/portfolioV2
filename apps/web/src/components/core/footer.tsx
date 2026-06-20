"use client";

import { Github, Twitter, Linkedin, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRouteTheme } from "@/lib/helper/get-route-theme";

export default function Footer() {
  const pathname = usePathname();

  // Determine current theme based on the URL
  
  // Break down the theme string into usable classes
  // theme string looks like: "bg-orange-500/10 text-orange-600 border-orange-500/20"
  // const bgColor = themeParts[0];      // bg-xxx
  // const textColor = themeParts[1];    // text-xxx
  // const borderColor = themeParts[2];  // border-xxx

  const { theme, styles} = getRouteTheme(pathname);

  return (
    // 3. Apply the theme classes dynamically
    // We replace 'border-t' with the specific themed border color
    <footer className={`transition-colors duration-500 border-t ${styles.border} ${styles.bg}`}>
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
        
        <div className="flex flex-wrap justify-center items-center gap-6">
          <blockquote className="italic text-center text-muted-foreground max-w-xl">
            “I don’t follow trends, I follow what’s important and what matters.”
          </blockquote>
        </div>

        {/* Quick links - Using the theme text color for hover states */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://github.com/Erzan12"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 transition-colors hover:${styles.text}`}
          >
            <Github size={16} /> GitHub
          </a>

          <a
            href="https://erzan-docs.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 transition-colors hover:${styles.text}`}
          >
            <BookOpen size={16} /> Docs
          </a>
          <Link href="/blog" className={`transition-colors hover:${styles.text}`}>
            Blog
          </Link>
          <Link href="/about" className={`transition-colors hover:${styles.text}`}>
            Contact
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          <a href="https://github.com/Erzan12" className={`transition-colors hover:${styles.text}`} target="_blank">
            <Github size={20} />
          </a>
          <a href="https://twitter.com/yourhandle" className={`transition-colors hover:${styles.text}`}>
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ej-do/" className={`transition-colors hover:${styles.text}`} target="_blank">
            <Linkedin size={20} />
          </a>
        </div>

        <p className="text-center opacity-70">
          © {new Date().getFullYear()} erzan-dev.vercel.app built with NextJS ❤️
        </p>
      </div>
    </footer>
  );
}