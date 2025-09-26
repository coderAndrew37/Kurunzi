import { Category, Story } from "@/app/components/types";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { categoryStoriesQuery } from "../lib/getCategoryStories";
import { sanityClient } from "../lib/sanity.client";
import ArticleCard from "./_components/ArticleCard";
import EmptyState from "./_components/EmptyState";
import PageHeader from "./_components/Header";
import CategorySidebar from "./_components/Sidebar";
import { getLatestBreakingNews } from "../lib/getBreakingNews";
import NewsletterSignup from "../components/NewsletterSignup";

interface PageProps {
  params: {
    category: string;
  };
}

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
  const { category: categorySlug } = await params;

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

  // Fetch trending and latest articles for sidebar
  const trendingArticles: Story[] = await getLatestBreakingNews();
  const latestArticles: Story[] = await getLatestBreakingNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={currentCategory.title}
        description={currentCategory.description}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: `/category/${categorySlug}`, label: currentCategory.title },
        ]}
        count={articles.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Articles Grid */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categoryLabel={currentCategory.title}
                    href={`/article/${article.slug}`}
                    variant={index === 0 ? "featured" : "default"}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No articles yet"
                message={`We haven't published any articles in ${currentCategory.title} yet.`}
              />
            )}

            {/* Newsletter Signup */}

            <div className="mt-12">
              <NewsletterSignup />
            </div>

            {/* Subcategory Navigation */}
            {currentCategory.subcategories &&
              currentCategory.subcategories.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Explore {currentCategory.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCategory.subcategories.map((sub) => (
                      <a
                        key={sub._id}
                        href={`/${currentCategory.slug}/${sub.slug}`}
                        className="group block bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">
                          {sub.title}
                        </h3>
                        {sub.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {sub.description}
                          </p>
                        )}
                        <div className="flex items-center text-blue-600 text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform">
                          Browse articles
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
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
