"use client";

import { useEffect, useState } from "react";

export function useGithubRepos() {
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); //true

    useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github-repos"); //api route path
        const data = await res.json();
        setRepos(data.repos || []);
      } catch (error) {
        console.error("Failed to fetch repos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

    return { repos, loading };
}