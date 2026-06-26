import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.github.com/users/Erzan12/repos", {
    cache: "no-store",
  });

  const data = await res.json();

  if (!Array.isArray(data)) {
    return NextResponse.json({ repos: [] });
  }

  const repos = data
    .filter((repo: any) => !repo.fork)
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      topics: repo.topics,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      pushed_at: repo.pushed_at,
      html_url: repo.html_url,
    }));

  // console.log(repos);

  return NextResponse.json({ repos });
}