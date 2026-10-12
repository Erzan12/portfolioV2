import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { BlogClientProps } from "@/lib/interface/global.interface";
import { formatDate, readMinutes } from "@/lib/blog";
import { Panel } from "@/components/brut/panel";
import { AuthorCard } from "./blog-cms/author-card";
import BlogFeed, { LogPost } from "./blog-feed";

// Defined once at module level, not on every render
const getPosts = unstable_cache(
  async () =>
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        createdAt: true,
        views: true,
        tags: { select: { name: true } }, // change `name` if your Tag model uses another field
      },
    }),
  ["blog-posts-v2"],
  { revalidate: 60 },
);

export default async function BlogPage({ avatar }: BlogClientProps) {
  const posts = await getPosts();

  const logs: LogPost[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    dateLabel: formatDate(p.createdAt),
    views: p.views,
    minutes: readMinutes(p.content),
    tags: p.tags.map((t) => t.name),
  }));

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-5xl md:text-7xl">Mission Log</h1>
      <p className="mt-4 max-w-[62ch] border-l-[3px] border-ink pl-5 text-lg">
        Documentation of my journey through day-to-day tasks, learnings, new ideas, implementations,
        projects, and integrations. I pursue continuous growth across architectures, performance
        optimization, caching, and the variations of full-stack development. There&apos;s a lot I want
        to learn: different kinds of obstacles, bugs, and errors, and the patterns for dealing with
        them.
      </p>

      <div className="mt-12">
        <BlogFeed
          posts={logs}
          aside={
            <Panel label="author ~">
              <AuthorCard name="Earl Jan Do" role="Full-Stack Developer" avatar={avatar} />
              <p className="mt-4 text-base leading-snug">
                Building high-performance applications in the Philippines. Currently scaling ShopStack,
                maintaining the ABAS ERP system at my current employer, and building the backend for ABAS
                v3: JWT, cookies, Swagger API, services, and versioning.
              </p>
            </Panel>
          }
        />
      </div>
    </main>
  );
}