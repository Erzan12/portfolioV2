import AboutClient from "@/components/core/about/about-client";
import { getGithubProfile } from "../api/github/profile/route";

export default async function About() {
  const profile = await getGithubProfile();

  return (
    <AboutClient avatar={profile?.avatar_url} />
  );
}