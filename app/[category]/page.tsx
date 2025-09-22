import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Category, Story } from "@/app/components/types";
import { categoryStoriesQuery } from "../lib/getCategoryStories";
import { sanityClient } from "../lib/sanity.client";
import { urlFor } from "../lib/sanity.image";
import { groq } from "next-sanity";

// Types

interface PageProps {
  params: {
    category: string;
  };
}

// Query to fetch category with subcategories
const categoryWithSubcategoriesQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    "subcategories": subcategories[]->{
      _id,
      title,
      description,
      "slug": slug.current
    }
  }
`;

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = params;

  // Fetch category
  const currentCategory: Category | null = await sanityClient.fetch(
    categoryWithSubcategoriesQuery,
    { slug: categorySlug }
  );

  if (!currentCategory) notFound();

  // Fetch articles for this category
  const articles: Story[] = await sanityClient.fetch(categoryStoriesQuery, {
    category: categorySlug,
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            {currentCategory.description}
          </p>
        </header>

        {/* Articles */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="block group"
              >
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  {article.img && (
                    <Image
                      src={urlFor(article.img).url()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{article.publishedAt}</span>
                  <span>
                    {article.readTime ? `${article.readTime} min read` : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No articles found in {currentCategory.title}.</p>
        )}

        {/* Subcategory navigation */}
        {currentCategory.subcategories &&
          currentCategory.subcategories.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">
                Explore {currentCategory.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCategory.subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    href={`/${currentCategory.slug}/${sub.slug}`}
                    className="block p-6 border border-neutral-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-neutral-900 hover:text-blue-600">
                      {sub.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {sub.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
      </main>
    </div>
  );
}
