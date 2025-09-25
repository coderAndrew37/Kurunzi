import { sanityClient } from "./sanity.client";

export interface News {
  _id: string;
  headline: string;
  slug: string;
  publishedAt: string;
  category: string;
  isActive: boolean;
  expiresAt: string;
}

export interface BreakingNewsItem {
  headline: string;
  slug: string;
  href: string;
  category?: string;
  publishedAt?: string;
  _id?: string;
}

export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const news = await sanityClient.fetch(`
      *[_type == "breakingNews" && isActive == true && (expiresAt == null || expiresAt > now())] | order(priority desc, publishedAt desc) {
        headline,
        "slug": slug.current,
        category,
        publishedAt
      }[0...10]
    `);

    return news.map((item: News) => ({
      headline: item.headline,
      slug: item.slug,
      href: `/news/${item.slug}`,
      category: item.category,
      publishedAt: item.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    return [];
  }
}

// Add this new function to get single news by slug
export async function getBreakingNewsBySlug(
  slug: string
): Promise<BreakingNewsItem | null> {
  try {
    const news = await sanityClient.fetch(
      `
      *[_type == "breakingNews" && slug.current == $slug][0] {
        headline,
        "slug": slug.current,
        category,
        publishedAt,
        isActive,
        expiresAt
      }
    `,
      { slug }
    );

    if (!news) return null;

    return {
      headline: news.headline,
      slug: news.slug,
      href: `/news/${news.slug}`,
      category: news.category,
      publishedAt: news.publishedAt,
    };
  } catch (error) {
    console.error("Error fetching breaking news by slug:", error);
    return null;
  }
}
