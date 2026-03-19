"use client";

import { motion } from "framer-motion";
import SystemCard from "@/components/core/system-design/System-Card";
import { useGithubRepos } from "@/hooks/useGithubRepos";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
};

export default function ProjectsPage() {
  const { repos } = useGithubRepos();

  // console.log(repos);

  const techColors: Record<string, string> = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
      NextJS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
      TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      NestJS: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
      PostgreSQL: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Docker: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Docusaurus: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Tailwind: "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
      PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
      Laravel: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      CodeIgniter: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
  };

  const sortedRepos = repos.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );

  return (
    <main className="min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-card-foreground font-sans tracking-tight">
            Projects
          </h1>

          <p className="text-muted-foreground mt-4 max-w-2xl font-sans leading-relaxed">
            This section highlights all my development projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRepos.map((repo: GithubRepo) => (
            <SystemCard
              key={repo.id}
              title={repo.name}
              description={repo.description ?? "No description provided"}
              stars={repo.stars}
              forks={repo.forks}
              language={repo.language}
              last_update={repo.pushed_at}
              link={repo.html_url}
              showArchitectureLink={false}
              showRepositoryLink={true}
              techColors={techColors}
            />
          ))}
        </div>
      </div>
    </main>
  );
}