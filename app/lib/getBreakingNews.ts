import { sanityClient } from "./sanity.client";

export interface BreakingNewsItem {
  headline: string;
  slug: string;
  href: string;
  category?: string;
}

export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    console.debug("Fetching breaking news...");
    const news = await sanityClient.fetch(`
      *[_type == "breakingNews" && isActive == true && (expiresAt == null || expiresAt > now())] | order(priority desc, publishedAt desc) {
        headline,
        "slug": slug.current,
        category
      }[0...10] // Limit to 10 items
    `);

    console.debug("Received breaking news:", news);
    // Convert to the expected format with href
    return news.map(
      ({
        headline,
        slug,
        category,
      }: {
        headline: string;
        slug: string;
        category?: string;
      }) => ({
        headline,
        slug,
        href: `/news/${slug}`,
        category,
      })
    );
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    return [];
  }
}
