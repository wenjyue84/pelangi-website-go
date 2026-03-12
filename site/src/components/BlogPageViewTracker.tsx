"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

interface Props {
  slug: string;
  title: string;
}

export default function BlogPageViewTracker({ slug, title }: Props) {
  useEffect(() => {
    sendGAEvent("event", "blog_page_view", { slug, title });
  }, [slug, title]);

  return null;
}
