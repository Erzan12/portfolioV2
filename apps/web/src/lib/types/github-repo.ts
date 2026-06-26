// raw GitHub response
export type GitHubApiRepo = {
  id: number;
  name: string;
  description: string | null;
  topics?: string[];
  stars: number;
  forks: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
  fork: boolean;
};

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  topics?: string[];
  stars: number;
  forks: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
};