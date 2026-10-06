import { profile } from "@/data/profile";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.github.com/users/Erzan12", {
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json({
    avatar: data.avatar_url,
    name: data.name,
    bio: data.bio,
  });
}

export async function getGithubProfile() {
  const res = await fetch("https://api.github.com/users/Erzan12", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function getSiteProfile() {
  const github = await getGithubProfile();

  return {
    ...profile,
    photo: github?.avatar_url ?? "/images/earl.jpg",
  };
}