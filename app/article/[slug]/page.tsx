// app/article/[slug]/page.tsx
import { categoryData } from "@/app/data/articles";
import ArticlePageClient from "./ArticlePageClient";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Flatten categories
  const allArticles = Object.values(categoryData).flat();

  // Find article by slug
  const article = allArticles.find((a) => generateSlug(a.title) === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-600">
        Article not found
      </div>
    );
  }

  // Pass to client component
  return <ArticlePageClient article={article} />;
}
