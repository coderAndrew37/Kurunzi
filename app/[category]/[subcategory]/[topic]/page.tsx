import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/app/data/categories";
import { mockArticles } from "@/app/data/mockArticles";
import { generateSlug } from "@/app/components/generateSlug";

interface PageProps {
  params: {
    category: string;
    subcategory: string;
    topic: string;
  };
}

export default function TopicPage({ params }: PageProps) {
  const { category, subcategory, topic } = params;

  // Find category + subcategory
  const currentCategory = categories.find((cat) => cat.slug === category);
  const currentSubcategory = currentCategory?.subcategories.find(
    (sub) => sub.slug === subcategory
  );

  if (!currentCategory || !currentSubcategory) notFound();

  // Filter articles for this topic
  const articles = mockArticles.filter(
    (article) =>
      generateSlug(article.category) === category &&
      generateSlug(article.subcategory) === subcategory &&
      generateSlug(article.topic || "") === topic
  );

  if (articles.length === 0) {
    return <p>No articles found for {topic}</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {topic.replace("-", " ")} in {currentSubcategory.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{article.title}</h3>
            <p className="text-sm text-neutral-600">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
