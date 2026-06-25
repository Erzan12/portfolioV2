"use client";

import { useEffect } from "react";

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const viewed = sessionStorage.getItem(`viewed-${slug}`);

    if (viewed) return;

    fetch("/api/posts/view", {
      method: "POST",
      body: JSON.stringify({ slug }),
    });

    sessionStorage.setItem(`viewed-${slug}`, "true");
  }, [slug]);

  return null;
}