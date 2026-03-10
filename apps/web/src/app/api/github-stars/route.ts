import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");

  // console.log("Repo received:", repo); // DEBUG

  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  const data = await res.json();

  // console.log("GitHub response:", data); // DEBUG

  return NextResponse.json({
    stars: data.stargazers_count,
  });
}