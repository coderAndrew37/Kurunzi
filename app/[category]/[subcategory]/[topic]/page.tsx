import { Story } from "@/app/components/types";
import { sanityClient } from "@/app/lib/sanity.client";
import { notFound } from "next/navigation";
import { topicStoriesQuery } from "@/app/lib/getCategoryStories";
import ArticleCard from "../../_components/ArticleCard";
import EmptyState from "../../_components/EmptyState";
import PageHeader from "../../_components/Header";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Reusable header */}
      <PageHeader
        title={topic.charAt(0).toUpperCase() + topic.slice(1)}
        description={`Latest stories in ${topic} under ${subcategory} / ${category}.`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: `/category/${category}`, label: category },
          { href: `/${category}/${subcategory}`, label: subcategory },
          { href: `/${category}/${subcategory}/${topic}`, label: topic },
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
                categoryLabel={topic}
                href={`/${category}/${subcategory}/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles yet"
            message={`We haven't published any articles in ${topic} yet.`}
          />
        )}
      </main>
    </div>
  );
}
