"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Heading = {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: { content: string }) {
  // const [headings, setHeadings] = useState<Heading[]>([])
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState("")

  // useEffect(() => {
  //   const parser = new DOMParser()
  //   const doc = parser.parseFromString(content, "text/html")
  //   const elements = Array.from(doc.querySelectorAll("h2, h3"))

  //   const extracted = elements.map((el, index) => {
  //     const text = el.textContent || ""
  //     const id = text.toLowerCase().replace(/\s+/g, "-") + `-${index}`

  //     return {
  //       id,
  //       text,
  //       level: Number(el.tagName.replace("H", "")),
  //     }
  //   })

  //   setHeadings(extracted)
  // }, [content])
  useEffect(() => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const elements = Array.from(doc.querySelectorAll("h2, h3"));
    const items = elements.map((el) => ({
      id: el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: el.textContent || "",
      level: parseInt(el.tagName.replace("H", ""))
    }));
    setHeadings(items);
  }, [content]);

  // intersection observer (unchanged)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    const contentHeadings = document.querySelectorAll("article h2, article h3")
    contentHeadings.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  // return (
  //   <nav className="space-y-4">
  //     <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
  //       On this page
  //     </h4>

  //     <ul className="space-y-2 border-l border-border/50">
  //       {headings.map((heading) => (
  //         <li key={heading.id}>
  //           <a
  //             href={`#${heading.id}`}
  //             className={cn(
  //               "block text-sm transition-all pl-4 py-1",
  //               activeId === heading.id
  //                 ? "text-primary font-medium border-l-2 border-primary -ml-[1px]"
  //                 : "text-muted-foreground hover:text-foreground"
  //             )}
  //             style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
  //           >
  //             {heading.text}
  //           </a>
  //         </li>
  //       ))}
  //     </ul>
  //   </nav>
  // )
  return (
    <nav className="space-y-2">
      <p className="font-bold uppercase text-xs text-muted-foreground mb-4">On this page</p>
      {headings.map((heading) => (
        <a 
          key={heading.id} 
          href={`#${heading.id}`}
          className={`block text-sm transition-colors hover:text-primary ${heading.level === 3 ? "pl-4" : ""}`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}