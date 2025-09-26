import { Story } from "@/app/components/types";
import { sanityClient } from "@/app/lib/sanity.client";
import { notFound } from "next/navigation";
import { subcategoryStoriesQuery } from "@/app/lib/getCategoryStories";
import ArticleCard from "../_components/ArticleCard";
import EmptyState from "../_components/EmptyState";
import PageHeader from "../_components/Header";
import { getLatestBreakingNews } from "@/app/lib/getBreakingNews";
import CategorySidebar from "../_components/Sidebar";
import NewsletterSignup from "@/app/components/NewsletterSignup";

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

  // Fetch trending and latest articles for sidebar
  const trendingArticles: Story[] = await getLatestBreakingNews();
  const latestArticles: Story[] = await getLatestBreakingNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={subcategory}
        description={`Latest stories in ${subcategory} under ${category}`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: `/category/${category}`, label: category },
          { href: `/${category}/${subcategory}`, label: subcategory },
        ]}
        count={articles.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categoryLabel={subcategory}
                    href={`/article/${article.slug}`}
                    variant={index === 0 ? "featured" : "default"}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No articles yet"
                message={`We haven't published any articles in ${subcategory} yet.`}
              />
            )}
          </div>

          <div className="mt-12">
            <NewsletterSignup />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              trendingArticles={trendingArticles}
              latestArticles={latestArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
