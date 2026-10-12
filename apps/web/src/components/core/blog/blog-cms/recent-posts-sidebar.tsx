import Link from "next/link";
import { prisma } from "@/lib/prisma/prisma";
import { cn } from "@/lib/utils";
import { RecentPostsSidebarProps } from "@/lib/interface/global.interface";
import { unstable_cache } from "next/cache";

const getRecentPosts = unstable_cache(
  async () =>
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true },
    }),
  ["recent-posts"],
  { revalidate: 60 },
);

export default async function RecentPostsSidebar({ currentSlug, showBackButton = false }: RecentPostsSidebarProps) {
  const posts = await getRecentPosts();

  return (
    <nav className="flex flex-col gap-6">
      {showBackButton && (
        <Link href="/blog" className="press shadow-hard-sm inline-flex w-fit border-[3px] border-ink bg-paper px-3 py-2 font-bold">
          ← Mission Log
        </Link>
      )}
      <div>
        <h4 className="font-mono text-sm">Recent logs</h4>
        <ul className="mt-3 border-[3px] border-ink bg-surface">
          {posts.map((post) => (
            <li key={post.slug} className="border-b-[3px] border-ink last:border-b-0">
              <Link
                href={`/blog/${post.slug}`}
                aria-current={currentSlug === post.slug ? "page" : undefined}
                className={cn(
                  "block px-3 py-3 font-semibold leading-snug",
                  currentSlug === post.slug ? "bg-spark text-on-spark" : "hover:bg-accent hover:text-on-accent",
                )}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}