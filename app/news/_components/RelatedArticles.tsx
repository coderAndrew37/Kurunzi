import { getRelatedArticles } from "@/app/lib/getRelatedArticles";
import { ArticleCard } from "./ArticleCard";

interface RelatedArticlesProps {
  currentSlug: string;
  category?: string;
  limit?: number;
}

export default async function RelatedArticles({
  currentSlug,
  category,
  limit = 3,
}: RelatedArticlesProps) {
  const relatedArticles = await getRelatedArticles(
    currentSlug,
    category,
    limit
  );

  if (!relatedArticles.length) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {relatedArticles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
