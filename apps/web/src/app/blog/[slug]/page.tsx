import { prisma } from "@/lib/prisma/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TableOfContents } from "@/components/core/blog/blog-cms/table-of-contents";
import RecentPostsSidebar from "@/components/core/blog/blog-cms/recent-posts-sidebar";
import { AuthorCard } from "@/components/core/blog/blog-cms/author-card";
import { ViewTracker } from "@/components/core/blog/blog-cms/viewTracker";
import { formatDate, readMinutes } from "@/lib/blog";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({ where: { slug }, include: { author: true } });
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-14">
      <div className="grid gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <RecentPostsSidebar currentSlug={post.slug} showBackButton />
          </div>
        </aside>

        <article className="lg:col-span-6">
          <Link href="/blog" className="mb-6 inline-block border-[3px] border-ink bg-paper px-3 py-2 font-bold lg:hidden">
            ← Mission Log
          </Link>

          <header className="mb-10">
            <h1 className="text-4xl text-balance md:text-6xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y-[3px] border-ink py-4">
              <AuthorCard
                name={post.author.name ?? "Earl Jan Do"}
                role="Full-Stack Developer"
                avatar={post.author.image ?? "/github-avatar.png"}
              />
              <p className="font-mono text-sm">
                {formatDate(post.createdAt)} · {readMinutes(post.content)} min read · {post.views} views
              </p>
              <ViewTracker slug={post.slug} />
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-extrabold prose-img:rounded-none prose-img:border-[3px] prose-img:border-ink prose-pre:rounded-none prose-pre:border-[3px] prose-pre:border-ink"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24 border-l-[3px] border-ink pl-6">
            <TableOfContents key={post.slug} />
          </div>
        </aside>
      </div>
    </main>
  );
}