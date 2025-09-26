import { Story } from "@/app/components/types";
import { getLatestBreakingNews } from "@/app/lib/getBreakingNews";
import { topicStoriesQuery } from "@/app/lib/getCategoryStories";
import { sanityClient } from "@/app/lib/sanity.client";
import { notFound } from "next/navigation";
import ArticleCard from "../../_components/ArticleCard";
import EmptyState from "../../_components/EmptyState";
import PageHeader from "../../_components/Header";
import CategorySidebar from "../../_components/Sidebar";

interface PageProps {
  params: {
    category: string;
    subcategory: string;
    topic: string;
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { category, subcategory, topic } = params;

  const articles: Story[] = await sanityClient.fetch(topicStoriesQuery, {
    topic,
  });

  if (!articles) notFound();

  // Fetch trending and latest articles for sidebar
  const trendingArticles: Story[] = await getLatestBreakingNews();
  const latestArticles: Story[] = await getLatestBreakingNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={topic}
        description={`Latest stories in ${topic} under ${subcategory} / ${category}`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: `/category/${category}`, label: category },
          { href: `/${category}/${subcategory}`, label: subcategory },
          { href: `/${category}/${subcategory}/${topic}`, label: topic },
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
                    categoryLabel={topic}
                    href={`/article/${article.slug}`}
                    variant={index === 0 ? "featured" : "default"}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No articles yet"
                message={`We haven't published any articles in ${topic} yet.`}
              />
            )}
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
