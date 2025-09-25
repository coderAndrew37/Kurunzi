import { Story } from "@/app/components/types";
import { sanityClient } from "@/app/lib/sanity.client";
import { notFound } from "next/navigation";
import { subcategoryStoriesQuery } from "@/app/lib/getCategoryStories";
import ArticleCard from "../_components/ArticleCard";
import EmptyState from "../_components/EmptyState";
import PageHeader from "../_components/Header";

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;

  const articles: Story[] = await sanityClient.fetch(subcategoryStoriesQuery, {
    subcategory,
  });

  if (!articles) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Reusable header */}
      <PageHeader
        title={subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
        description={`Latest stories in ${subcategory} under ${category}.`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: `/category/${category}`, label: category },
          { href: `/${category}/${subcategory}`, label: subcategory },
        ]}
        count={articles.length}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 -mt-10">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                categoryLabel={subcategory}
                href={`/${category}/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles yet"
            message={`We haven't published any articles in ${subcategory} yet.`}
          />
        )}
      </main>
    </div>
  );
}
