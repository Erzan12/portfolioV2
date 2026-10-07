export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type GithubActivity = {
  weeks: Day[][];
  total: number;
  commits: number;
  pullRequests: number;
  issues: number;
  currentStreak: number;
  longestStreak: number;
  repos: { name: string; url: string; commits: number }[];
};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
      commitContributionsByRepository(maxRepositories: 25) {
        repository { nameWithOwner url isPrivate }
        contributions { totalCount }
      }
    }
  }
}`;

const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 } as const;

// Backup for when the fetch cache is cold (per server instance, 1 hour)
let memo: { at: number; data: GithubActivity } | null = null;

export async function getGithubActivity(login: string): Promise<GithubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  if (memo && Date.now() - memo.at < 3_600_000) return memo.data;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return memo?.data ?? null;
    const c = (await res.json()).data?.user?.contributionsCollection;
    if (!c) return memo?.data ?? null;

    const weeks: Day[][] = c.contributionCalendar.weeks.map((w: any) =>
      w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel as keyof typeof LEVELS] ?? 0,
      })),
    );

    const days = weeks.flat();
    let longest = 0, run = 0;
    for (const d of days) { run = d.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
    // Today may not have a contribution yet; the streak is still alive then
    let k = days.length - 1, current = 0;
    if (days[k].count === 0) k--;
    for (; k >= 0 && days[k].count > 0; k--) current++;

    const repos = c.commitContributionsByRepository
      .filter((r: any) => !r.repository.isPrivate)
      .map((r: any) => ({
        name: r.repository.nameWithOwner.replace(`${login}/`, ""),
        url: r.repository.url,
        commits: r.contributions.totalCount,
      }))
      .sort((a: any, b: any) => b.commits - a.commits)
      .slice(0, 5);

    const data: GithubActivity = {
      weeks,
      total: c.contributionCalendar.totalContributions,
      commits: c.totalCommitContributions,
      pullRequests: c.totalPullRequestContributions,
      issues: c.totalIssueContributions,
      currentStreak: current,
      longestStreak: longest,
      repos,
    };
    memo = { at: Date.now(), data };
    return data;
  } catch {
    return memo?.data ?? null;
  }
}