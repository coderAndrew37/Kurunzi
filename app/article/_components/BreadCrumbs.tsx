"use client";

import Link from "next/link";
import { Story as Article } from "@/app/components/types";

export default function Breadcrumbs({ article }: { article: Article }) {
  const categoryTitle = article.category?.title || "General";
  const categorySlug =
    article.category?.slug || categoryTitle.toLowerCase().replace(/\s+/g, "-");

  return (
    <nav className="text-sm text-neutral-500 mb-6">
      <Link href="/" className="hover:text-blue-600">
        Home
      </Link>
      <span className="mx-2">/</span>
      <Link href={`/category/${categorySlug}`} className="hover:text-blue-600">
        {categoryTitle}
      </Link>
      <span className="mx-2">/</span>
      <span>{article.title}</span>
    </nav>
  );
}
