import { RelatedArticle } from "../components/types";
import { SanityArticle } from "../types/sanityArticle";
import { sanityClient } from "./sanity.client";
import { urlFor } from "./sanity.image";

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

  const articles = await sanityClient.fetch<SanityArticle[]>(query, {
    currentSlug,
    category,
    limit,
  });

  return articles.map((article) => ({
    id: article._id,
    slug: article.slug?.current ?? "",
    title: article.fullTitle || article.headline,
    excerpt: article.excerpt,
    img: article.featuredImage ? urlFor(article.featuredImage).url() : null,
    category: article.category,
    date: article.publishedAt,
    readTime: 3, // fallback
    views: 0,
  }));
}
