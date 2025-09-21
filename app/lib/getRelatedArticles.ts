import { sanityClient } from "./sanity.client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SanityArticle } from "../types/sanityArticle";

export interface RelatedArticle {
  _id: string;
  headline: string;
  fullTitle: string;
  slug: string;
  excerpt?: string;
  featuredImage?: (SanityImageSource & { alt?: string }) | null;
  publishedAt: string;
  category?: string;
  readTime?: number;
  alt?: string;
  views?: number;
}

export async function getRelatedArticles(
  currentSlug: string,
  category?: string,
  limit = 3
): Promise<RelatedArticle[]> {
  const query = category
    ? `*[_type == "breakingNews" && slug.current != $currentSlug && category == $category && isActive == true] 
       | order(publishedAt desc)[0...$limit]`
    : `*[_type == "breakingNews" && slug.current != $currentSlug && isActive == true] 
       | order(publishedAt desc)[0...$limit]`;

  const articles = await sanityClient.fetch(query, {
    currentSlug,
    category,
    limit,
  });

  return articles.map((article: SanityArticle) => ({
    _id: article._id,
    headline: article.headline,
    fullTitle: article.fullTitle || article.headline,
    slug: article.slug?.current ?? "",
    excerpt: article.excerpt,
    featuredImage: article.featuredImage ?? null,
    publishedAt: article.publishedAt,
    category: article.category,
    readTime: 3, // simplify for now
  }));
}
