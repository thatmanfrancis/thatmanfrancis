"use client";

import { useEffect } from "react";

type ViewTrackerProps = {
  slug: string;
};

export function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    const key = `post-viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "1");
    void fetch(`/api/posts/${slug}/view`, { method: "POST" });
  }, [slug]);

  return null;
}
